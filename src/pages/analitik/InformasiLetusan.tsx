import axios from "axios"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

interface TimelineItem {
    type: "timeline-item";
    time: string;
    author: string;
    title: string;
    text: string;
    image: string;
    url: string;
}

interface Timeline {
    type: "timeline-day";
    date: string;
    children: TimelineItem[];
}


export default function InformasiLetusan() {
    const [item, setItem] = useState<Timeline[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/informasi-letusan")
            console.log(response)
            setItem(response.data.data)
        }

        fetchData()
    }, [])

    return (
        <div className={"grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] px-8 py-28"}>
            {item.map((data) => (
                <div className={"table w-full border-spacing-x-5 px-24"}>
                    {data.children.map((it) => (
                        <div className={"table-row space-y-5"}>
                            <div className={"table-cell w-1/12 justify-end text-end "}>
                                <div
                                    className={"ms-auto w-fit text-nowrap rounded-full bg-gradient-to-br from-rose-500 to-rose-600 px-3 py-2 font-semibold shadow-lg shadow-rose-500/70"}>{it.time}</div>
                            </div>
                            <Separator orientation={"vertical"}
                                       className={"relative table-cell w-[3px] rounded-full bg-gray-700/60"}>
                                <span
                                    className={"absolute start-1/2 top-[34px] inline-flex h-4 w-4 -translate-x-1/2 rounded-full bg-rose-500"}>
                                    <span
                                        className={"inline-flex h-4 w-4 animate-ping rounded-full bg-rose-500"}></span>
                                </span>
                            </Separator>
                            <div className={"grid w-[36rem] gap-3 py-2"}>
                                <div className={"flex items-center gap-4"}>
                                    <span className={"text-lg font-bold"}>{it.title}</span>
                                </div>
                                <div className={"grid gap-2 rounded-lg bg-[#2d303bcc] p-3"}>
                                    <div className={"flex gap-1 text-gray-400"}>
                                        oleh <span className={"flex-grow text-blue-500"}>{it.author}</span>
                                    </div>
                                    <div className={"text-gray-200"}>{it.text}</div>
                                    <LazyLoadImage src={it.image} className={"rounded"}/>
                                    <Button
                                        className={"mt-4 w-fit place-self-end bg-[#333746] font-semibold text-blue-500 hover:bg-[#414550]"} asChild>
                                        <Link to={`/laporan?url=${it.url}&point=true`}>Lihat Detail</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
