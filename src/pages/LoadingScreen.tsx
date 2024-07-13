import Lottie from "lottie-react"
import loading from "@/assets/lotties/loading.json"

const LoadingScreen = () => {
    return (
        <section id="error-page" className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1b1d25] px-16 py-20">
            <div className="relative flex flex-col items-center text-center w-full justify-center pt-24">
                <Lottie className={"absolute mb-64 h-64 w-fit"} animationData={loading} />
                <p
                    className="text-center font-cera text-5xl tracking-wide font-bold text-rose-500 drop-shadow-[0_7px_5px_rgba(244,63,94,0.95)]">Loading...
                </p>
            </div>
        </section>
    )
}

export default LoadingScreen
