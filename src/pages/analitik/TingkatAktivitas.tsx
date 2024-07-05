import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { CornerUpRight } from "lucide-react"
import { Link } from "react-router-dom"

type Mount = {
    name: string,
    location: string,
    link: string
}

type AktivitasResponse = {
    status: string
    description: string
    count: number
    mounts: Mount[]
}

export default function TingkatAktivitas() {
    const [item, setItem] = useState<AktivitasResponse[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/tingkat-aktivitas")
            console.log(response)
            setItem(response.data.data)
        }

        fetchData()
    }, [])

    return (
        <div className={"grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] px-8 py-28"}>
            <div className={"flex gap-4"}>
                <span className={"h-full w-3 rounded bg-rose-500"}></span>
                <span className={"flex items-center font-cera text-4xl font-bold capitalize"}>Tingkat Aktivitas Gunung Api</span>
            </div>
            <div className="flex gap-6">
                {item.map((data) => {
                    return (
                        <div className={"group flex basis-1/4 flex-col gap-6"}>
                            <div className={"grid gap-4 rounded-lg bg-[#2d303b] p-8 text-center shadow-xl transition-all group-hover:bg-rose-500 group-hover:shadow-rose-500/50"}>
                                <div className={"text-3xl font-bold"}>{data.status}</div>
                                <div className={"text-sm text-gray-400 transition-all group-hover:text-gray-100"}>{data.description}</div>
                            </div>
                            <div>
                                <div className={"grid gap-2 rounded-lg border-4 bg-[#2d303b] px-4 py-8 shadow-xl transition-all group-hover:border-rose-500 group-hover:shadow-rose-500/50"}>
                                    {data.mounts.length === 0 ? (
                                        <div className={"text-gray-300"}>Tidak ada gunung api {data.status}</div>
                                    ) : (
                                        data.mounts.map((mount) => {
                                            return (
                                                <Link to={mount.link}>
                                                    <div className={"group/mount flex items-center rounded-lg px-4 py-2 hover:bg-[#414550]/75"}>
                                                        <div className={"flex flex-grow flex-col"}>
                                                            <span>Gunung {mount.name}</span>
                                                            <span className={"text-sm text-gray-400"}>{mount.location}</span>
                                                        </div>
                                                        <Button size={"icon"} className={"hidden !bg-transparent text-rose-500 group-hover/mount:flex"}>
                                                            <CornerUpRight />
                                                        </Button>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
