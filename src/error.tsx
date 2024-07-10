import { Link, useRouteError } from "react-router-dom"
import { Button } from "./components/ui/button"
import { Separator } from "@/components/ui/separator.tsx"

export default function Error() {
    const error = useRouteError() as Error
    return (
        <section id="error-page" className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1b1d25] px-16 py-20 text-gray-100">
            <div className="flex flex-col items-center gap-2 text-center">
                <text className="mb-8 text-center text-8xl font-extrabold text-rose-600">{error.name}</text>
                <text className="text-2xl font-semibold md:text-3xl">{error.message}</text>
                <Separator className={"bg-rose-600 w-64 h-1 rounded-full"}/>
                <pre className="mb-8 mt-4 text-gray-400 text-start">{error.stack}</pre>
                <Button className="!bg-rose-600 font-semibold w-fit hover:ring-4 ring-rose-600/50 transition-all">
                    <Link to={`/`}>
                        Back to homepage
                    </Link>
                </Button>
            </div>
        </section>
    )
}
