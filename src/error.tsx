import { Link, useRouteError } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Separator } from "@/components/ui/separator.tsx"
import { SerializedError } from "@reduxjs/toolkit"

export default function Error() {
    const error = useRouteError() as Error
    return (
        <section id="error-page" className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1b1d25] px-16 py-20 text-gray-100">
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="mb-8 text-center text-8xl font-extrabold text-rose-600">{error && error.name}</p>
                <p className="text-2xl font-semibold md:text-3xl">{error && error.message}</p>
                <Separator className={"h-1 w-64 rounded-full bg-rose-600"} />
                <pre className="mb-8 mt-4 text-start text-gray-400">{error && error.stack}</pre>
                <Button className="w-fit !bg-rose-600 font-semibold ring-rose-600/50 transition-all hover:ring-4">
                    <Link to={`/`}>Back to homepage</Link>
                </Button>
            </div>
        </section>
    )
}

export function ReduxError({ error }: { error: SerializedError }) {
    return (
        <section id="error-page" className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1b1d25] px-16 py-20 text-gray-100">
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-center font-semibold bg-rose-600 py-1 px-3 rounded-full text-gray-100">
                    {error.code}
                </p>
                <p className="mb-8 text-center text-8xl font-extrabold text-rose-600">
                    {error.name}
                </p>
                <p className="text-2xl font-semibold md:text-3xl">{error.message}</p>
                <Separator className={"h-1 w-64 rounded-full bg-rose-600"} />
                <pre className="mb-8 mt-4 text-start text-gray-400">{error.stack}</pre>
                <Button size={"lg"} className="w-fit !bg-rose-600 text-lg font-semibold ring-rose-600/50 transition-all hover:ring-4">
                    <Link to={`/`}>Back to homepage</Link>
                </Button>
            </div>
        </section>
    )
}
