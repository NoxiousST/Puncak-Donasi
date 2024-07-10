import axios from "axios"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination.tsx"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx"

interface TimelineLetusanItem {
    type: "timeline-item"
    time: string
    author: string
    title: string
    text: string
    image: string
    url: string
}

export interface TimelineLetusan {
    type: "timeline-day"
    date: string
    children: TimelineLetusanItem[]
}

export default function InformasiLetusan() {
    const [item, setItem] = useState<TimelineLetusan[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3000/informasi-letusan?page=${page}`)
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
                            <BreadcrumbLink href="#">Informasi Letusan</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Informasi Letusan</h1>
                <p className={"text-gray-400"}>Daftar letusan gunung api yang terbaru, lengkap dengan tanggal dan waktu kejadian.</p>
            </section>
            <div className={"grid gap-8"}>
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
                <div className={"grid"}>
                    {item.map((data) => (
                        <div className={"table w-full border-spacing-x-5 px-24"}>
                            <div className={"table-row"}>
                                <div className={"table-cell w-3/12 justify-end text-end"}>
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
                                        <div className={"shadow-lgtext-gray-300 ms-auto w-fit text-nowrap rounded-full px-3 py-2 font-semibold ring-2 ring-rose-500"}>{it.time}</div>
                                    </div>
                                    <Separator orientation={"vertical"} className={"relative table-cell w-[3px] rounded-full bg-gray-700/60"}>
                                        <span className={"absolute start-1/2 top-[34px] inline-flex h-4 w-4 -translate-x-1/2 rounded-full bg-rose-500"}>
                                            <span className={"inline-flex h-4 w-4 animate-ping rounded-full bg-rose-500"}></span>
                                        </span>
                                    </Separator>
                                    <div className={"grid w-[36rem] gap-3 py-2"}>
                                        <div className={"flex items-center gap-4"}>
                                            <span className={"text-lg font-bold"}>{it.title}</span>
                                        </div>
                                        <div className={"grid gap-2 rounded-lg bg-[#2d303b]/75 border-2 border-gray-700/60 p-3 backdrop-blur-2xl backdrop-saturate-125  "}>
                                            <div className={"flex gap-1 text-gray-400"}>
                                                oleh <span className={"flex-grow text-blue-500"}>{it.author}</span>
                                            </div>
                                            <div className={"text-gray-200"}>{it.text}</div>
                                            <LazyLoadImage src={it.image} className={"rounded"} />
                                            <Button className={"mt-4 w-fit place-self-end bg-[#333746] font-semibold text-blue-500 hover:bg-[#414550]"} asChild>
                                                <Link to={`/analitik/informasi-letusan/laporan?url=${it.url}&point=true`}>Lihat Detail</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Pagination className={"mb-8"}>
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
            </div>
        </div>
    )
}
