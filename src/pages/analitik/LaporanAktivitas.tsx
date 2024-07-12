import axios from "axios"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx"
import classNames from "classnames"
import { SERVER } from "@/lib/utils.ts"

interface TimelineItem {
    type: string
    time: string
    author: string
    date: string
    status: string
    title: string
    text: string
    url: string
}

interface Timeline {
    type: string
    date: string
    children: TimelineItem[]
}

export default function LaporanAktivitas() {
    const [item, setItem] = useState<Timeline[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${SERVER}/laporan?page=${page}`)
            console.log(response)
            setItem(response.data.data)
        }

        fetchData()
    }, [page])

    function handlePrev() {
        if (page > 1) setPage(page - 1)
    }

    function handleNext() {
        setPage(page + 1)
    }

    return (
        <div className={"grid bg-[radial-gradient(circle_at_top,#2d303bcc,#0F1014)]"}>
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
                            <BreadcrumbLink href="#">Laporan Aktivitas</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Laporan Aktivitas</h1>
                <p className={"text-gray-400"}>Laporan terbaru mengenai status dan aktivitas terkini dari berbagai gunung api di Indonesia.</p>
            </section>
            <section className={"grid gap-8 py-12"}>
                <Pagination className={"mb-4"}>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className={"cursor-pointer bg-[#333746] !text-white hover:bg-[#414550]"} onClick={handlePrev} />
                        </PaginationItem>
                        <PaginationItem className={"px-6"}>{page}</PaginationItem>
                        <PaginationItem>
                            <PaginationNext className={"cursor-pointer bg-[#333746] !text-white hover:bg-[#414550]"} onClick={handleNext} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                <div className={"grid"}>
                    {item.map((data) => (
                        <div>
                            <div className={"table w-full border-spacing-x-5 px-24"}>
                                <div className={"table-row"}>
                                    <div className={"table-cell w-3/12"}>
                                        <div
                                            className={
                                                "z-10 ms-auto w-fit rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 p-2 text-lg font-semibold text-gray-200 shadow-xl shadow-rose-500/70 ring-4 ring-rose-500/40"
                                            }>
                                            {data.date}
                                        </div>
                                    </div>
                                    <Separator orientation={"vertical"} className={"relative table-cell !w-[3px] rounded-full bg-gray-700/60"}>
                                        <span className={"absolute start-1/2 top-1/2 inline-flex h-4 w-4 -translate-x-1/2 rounded-full bg-rose-500"}>
                                            <span className={"inline-flex h-4 w-4 animate-ping rounded-full bg-rose-500"}></span>
                                        </span>
                                    </Separator>
                                    <div className={"flex w-[36rem] p-0"}></div>
                                </div>
                                {data.children.map((it) => (
                                    <div className={"table-row space-y-5"}>
                                        <div className={"table-cell justify-end text-end"}>
                                            <div className={"ms-auto w-fit text-nowrap rounded-full px-3 py-2 font-semibold text-gray-300 ring-2 ring-rose-500"}>{it.time}</div>
                                        </div>
                                        <Separator orientation={"vertical"} className={"relative table-cell !w-[3px] rounded-full bg-gray-700/60"}>
                                            <span className={"absolute start-1/2 top-[34px] inline-flex h-4 w-4 -translate-x-1/2 rounded-full border-2 border-rose-500 bg-[#2d303b]"}>
                                                <span className={"inline-flex h-4 w-4 animate-ping rounded-full bg-rose-500"}></span>
                                            </span>
                                        </Separator>
                                        <div className={"grid w-[36rem] gap-3 py-2"}>
                                            <div className={"flex items-center gap-4"}>
                                                <span className={"text-lg font-bold"}>{it.title}</span>
                                                <span
                                                    className={classNames("text-lg font-semibold", {
                                                        "text-green-500": it.status === "Level IV (Awas)",
                                                        "text-rose-500": it.status === "Level III (Siaga)",
                                                        "text-orange-500": it.status === "Level II (Waspada)",
                                                        "text-emerald-500": it.status === "Level I (Normal)",
                                                    })}>
                                                    {it.status}
                                                </span>
                                            </div>
                                            <div className={"backdrop-saturate-125 grid gap-2 rounded-lg border-2 border-gray-700/60 bg-[#2d303b]/75 p-3 backdrop-blur-2xl"}>
                                                <div className={"flex gap-1 text-gray-400"}>
                                                    oleh <span className={"flex-grow text-blue-500"}>{it.author}</span>
                                                    <span className={"text-gray-500"}>{it.date.slice(3, it.date.length)}</span>
                                                </div>
                                                <div className={"text-gray-200"}>{it.text}</div>
                                                <Button className={"mt-4 w-fit place-self-end bg-[#333746] font-semibold text-blue-500 hover:bg-[#414550]"} asChild>
                                                    <Link to={`/analitik/laporan-aktivitas/laporan?url=${it.url}&point=true`}>Lihat Detail</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination className={""}>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className={"cursor-pointer bg-[#333746] !text-white hover:bg-[#414550]"} onClick={handlePrev} />
                        </PaginationItem>
                        <PaginationItem className={"px-6"}>{page}</PaginationItem>
                        <PaginationItem>
                            <PaginationNext className={"cursor-pointer bg-[#333746] !text-white hover:bg-[#414550]"} onClick={handleNext} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </div>
    )
}
