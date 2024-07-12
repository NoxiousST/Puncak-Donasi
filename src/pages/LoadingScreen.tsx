import Lottie from "lottie-react"
import loading from "@/lotties/loading.json"

const LoadingScreen = () => {
    return (
        <section id="error-page"
                 className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#1b1d25] px-16 py-20">
            <div className="flex flex-col items-center text-center">
                <text className="text-center text-7xl font-bold font-varela text-rose-500 drop-shadow-[0_7px_5px_rgba(244,63,94,0.95)]">Loading...</text>
                <Lottie animationData={loading} style={{height: "16rem"}} />
            </div>
        </section>
    );
};

export default LoadingScreen;
