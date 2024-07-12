import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Error from "@/error.tsx"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster.tsx"
import Donate from "@/pages/donate/Donate.tsx"
import News from "@/pages/News.tsx"
import NewsDetail from "@/pages/NewsDetail.tsx"
import Layout from "@/Layout.tsx"
import supabase from "@/lib/supabase.ts"
import App from "@/pages/index/App.tsx"
import DonateCheck from "@/pages/donate/DonateCheck.tsx"
import TingkatAktivitas from "@/pages/analitik/TingkatAktivitas.tsx"
import LaporanAktivitas from "@/pages/analitik/LaporanAktivitas.tsx"
import LaporanHarian from "@/pages/analitik/LaporanHarian.tsx"
import InformasiLetusan from "@/pages/analitik/InformasiLetusan.tsx"
import Mapbox from "@/pages/map/Mapbox.tsx"
import "mapbox-gl/dist/mapbox-gl.css"
import DetailLaporanAktivitas from "@/pages/analitik/DetailLaporanAktivitas.tsx"
import AboutUs from "@/pages/AboutUs.tsx"
import { Provider } from "react-redux"
import store from "@/redux/store.ts"
import Test from "@/pages/Test.tsx"
import Thank from "@/pages/donate/Thank.tsx"
import DetailLaporanLetsuan from "@/pages/analitik/DetailLaporanLetusan.tsx"
import DonateSearch from "@/pages/donate/DonateSearch.tsx"
import { DonationProvider } from "./pages/donate/DonationProvider"

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<Layout />} errorElement={<Error />}>
            <Route index element={<App />} errorElement={<Error />} />,
            <Route path="news" element={<News />} />
            <Route
                path="news/:newsId"
                element={<NewsDetail />}
                loader={async ({ params }) => {
                    return supabase.from("news").select(`*, site(id, name, logo)`).eq("id", params.newsId)
                }}
            />
            <Route path="analitik/tingkat-aktivitas" element={<TingkatAktivitas />} />
            <Route path="analitik/laporan-aktivitas" element={<LaporanAktivitas />} />
            <Route path="analitik/laporan-harian" element={<LaporanHarian />} />
            <Route path="analitik/informasi-letusan" element={<InformasiLetusan />} />
            <Route path="analitik/laporan-aktivitas/laporan" element={<DetailLaporanAktivitas />} />
            <Route path="analitik/informasi-letusan/laporan" element={<DetailLaporanLetsuan />} />
            <Route path="analitik" element={<Mapbox />} />
            <Route path="tentang-kami" element={<AboutUs />} />
            <Route path="donasi/success" element={<Thank />} />
            <Route
                path="pencarian"
                element={
                    <DonationProvider>
                        <DonateSearch />
                    </DonationProvider>
                }
            />
        </Route>,
        <Route path="donasi" element={<DonateCheck />} />,
        <Route path="donasi/checkout" element={<Donate />} />,
        <Route path="test" element={<Test />} />,
    ]),
)

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
                <Toaster />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
