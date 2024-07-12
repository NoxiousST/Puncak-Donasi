import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { CornerUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx"
import { SERVER } from "@/lib/utils.ts"

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
            const response = await axios.get(`https://apipuncak.vercel.app/tingkat-aktivitas`)
            console.log(response)
            setItem(response.data.data)
        }

        fetchData()
    }, [])

    return (
        <div className={"grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)]"}>
            <section className={"grid items-center justify-center gap-4 bg-[#1b1d25] pb-16 pt-28 text-center"}>
                <Breadcrumb className={"place-self-center"}>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={"/"}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={"/analitik"}>Analitik</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Tingkat Aktivitas</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Tingkat Aktivitas</h1>
                <p className={"text-gray-400"}>Informasi terstruktur mengenai tingkat aktivitas gunung api</p>
            </section>
            <section className="flex gap-6 p-12">
                {item.map((data) => {
                    return (
                        <div className={"flex basis-1/4 flex-col gap-6"}>
                            <div className={"grid gap-4 rounded-lg bg-[#2d303b] p-8 text-center shadow-xl transition-all"}>
                                <div className={"text-3xl font-bold"}>{data.status}</div>
                                <div className={"text-sm text-gray-400 transition-all group-hover:text-gray-100"}>{data.description}</div>
                            </div>
                            <div>
                                <div className={"transition-all0 grid gap-2 rounded-lg border-4 bg-[#2d303b] px-4 py-8 shadow-xl"}>
                                    {data.mounts.length === 0 ? (
                                        <div className={"text-gray-300"}>Tidak ada gunung api {data.status}</div>
                                    ) : (
                                        data.mounts.map((mount) => {
                                            return (
                                                <Link to={`/laporan?url=${mount.link}&point=true`}>
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
            </section>
        </div>
    )
}
