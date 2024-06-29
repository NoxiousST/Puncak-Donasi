import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import "./index.css"
import Error from "@/error.tsx"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster.tsx"
import Donate from "@/pages/Donate.tsx"
import News from "@/pages/News.tsx"
import NewsDetail from "@/pages/NewsDetail.tsx"
import Layout from "@/Layout.tsx"
import supabase from "@/lib/supabase.ts"
import Index from "@/pages/Index"
import InputForm from "@/pages/Test.tsx"
import DonateCheck from "@/pages/DonateCheck.tsx"

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<Layout />}>
            <Route index element={<Index />} errorElement={<Error />} />,
            <Route path="news" element={<News />}/>
            <Route
                path="news/:newsId"
                element={<NewsDetail />}
                loader={async ({ params }) => {
                    return supabase.from("news").select(`*, site(id, name, logo)`).eq("id", params.newsId)
                }}
            />

        </Route>,
        <Route path="donasi" element={<DonateCheck />} />,
        <Route path="donasi/checkout" element={<Donate />} />,
        <Route path="test" element={<InputForm />} />,
    ]),
)

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    </React.StrictMode>,
)
