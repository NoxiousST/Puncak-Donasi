import { Link } from "react-router-dom"
import { CircleCheckBig } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"

export default function Thank() {
    return (
        <div className={"grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)]"}>
            <div className={"flex w-[40rem] flex-col items-center justify-center place-self-center py-24 h-screen font-cera"}>
                <div className={"w-fit rounded-full p-4 text-emerald-500"}>
                    <CircleCheckBig size={128} strokeWidth={2.7} />
                </div>
                <text className={"text-center text-4xl font-bold text-emerald-500"}>Pembayaran Berhasil</text>
                <text className={"py-8 text-center text-gray-300"}>
                    Donasi Anda telah berhasil diproses. Terima kasih telah berdonasi melalui Puncak. Kami sangat berterima kasih atas dukungan Anda dalam membantu masyarakat yang terkena dampak
                    letusan gunung berapi di Indonesia.
                </text>
                <Button size={"lg"} className={"!bg-emerald-500 !text-white font-medium text-lg"}>
                    <Link to={"/"}>Kembali ke Beranda</Link>

                </Button>
            </div>
        </div>
    )
}
