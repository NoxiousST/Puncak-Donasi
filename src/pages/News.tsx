"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label.tsx"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useEffect, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { ArrowRight } from "lucide-react"
import date from "date-and-time"
import { useReadingTime } from "react-hook-reading-time"
import supabase from "@/lib/supabase.ts"
import { useNavigate } from "react-router-dom"

export default function News() {
    const [news, setNews] = useState([])

    useEffect(() => {
        getNews()
    }, [])

    async function getNews() {
        const { data: udata } = await supabase.from("news").select(`id, title, description, short_description, date, type, image, site(id, name, logo)`).order("date", { ascending: false })
        setNews(udata)
    }


    return (
        <div className={"grid gap-12 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] px-24 py-8 font-cera"}>
            <div className={"grid gap-4 rounded-lg bg-[#414550]/25 py-4 text-center shadow-lg drop-shadow-lg backdrop-blur-sm backdrop-saturate-100"}>
                <Label className={"text-lg font-medium tracking-widest text-gray-400"}>Jelajahi Berita</Label>
                <div className={"pb-2 text-4xl font-bold"}>
                    📰 Kumpulan Berita dan Informasi <br />
                    <span className={"bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-left text-transparent md:text-center"}> Gunung Berapi </span>
                    🌋 Terkini dan Terbaru
                </div>
            </div>

            <div className={"flex gap-12"}>
                <div className={"basis-1/2 px-4"}>
                    <LazyLoadImage
                        className={"aspect-[16/10] w-full rounded-xl"}
                        src={"https://pict.sindonews.net/webp/732/pena/news/2024/06/26/174/1403417/gunung-lewotobi-lakilaki-kembali-erupsi-semburkan-abu-tebal-700-meter-xuo.webp"}
                    />
                </div>
                <div className={"flex basis-1/2 flex-col gap-4 py-4"}>
                    <div className={"flex items-center gap-4"}>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <p className={"text-lg font-medium"}>
                            Detik News <span className={"text-base font-normal text-gray-400"}>• 12 menit yang lalu</span>
                        </p>
                    </div>

                    <h1 className={"text-4xl font-bold"}>Gunung Lewotobi Laki-laki Kembali Erupsi, Semburkan Abu Tebal 700 Meter</h1>
                    <p className={"text-gray-300"}>
                        Gunung Lewotobi Laki-laki di Flores Timur, Nusa Tenggara Timur (NTT) kembali menunjukkan aktivitas vulkaniknya pada hari Rabu (26/6/2024) dini hari. Letusan gunung yang terjadi
                        pada pukul 05:04 WITA ini menyemburkan abu tebal setinggi 700 meter ke arah barat laut.
                    </p>
                    <div className={"flex gap-3 py-2"}>
                        <p className={"font-medium text-rose-400"}>Berita</p>
                        <p className={"text-gray-400"}>•</p>
                        <p className={"text-gray-400"}>4 menit baca</p>
                    </div>
                </div>
            </div>

            <div className={"grid gap-4"}>
                <div className={"flex"}>
                    <h1 className={"flex-grow text-4xl font-medium"}>Berita Terbaru</h1>
                    <Button onClick={() => console.debug("Hello World")} variant={"ghost"} className={"flex items-center gap-2 rounded-full text-rose-500 hover:bg-rose-500 hover:text-white"}>
                        Lihat semua
                        <ArrowRight size={20} />
                    </Button>
                </div>
                <div className={"grid grid-cols-4 gap-6"}>
                    {news.map((berita) => (
                        <NewsList berita={berita} key={berita.id}></NewsList>
                    ))}
                </div>
            </div>

            <div></div>
        </div>
    )
}

function NewsList({ berita }) {
    const navigate = useNavigate()
    const now = new Date()
    const added = date.parse(berita.date, "YYYY-MM-DDThh:mm:ss")

    const tanggal = () => {
        const difference = date.subtract(now, added);

        if (difference.toDays() > 7) return date.format(added, "DD MMMM YYYY");
        if (!date.isSameDay(now, added)) return `${difference.toDays().toFixed()} hari yang lalu`;
        return difference.toHours() < 1 ? `${difference.toMinutes().toFixed()} menit yang lalu` : `${difference.toHours().toFixed()} jam yang lalu`;
    };

    const { minutes } = useReadingTime(berita.description)

    return (
        <Card onClick={() => {
            navigate(`/news/${berita.id}`)
        }}
            className={
                "grid basis-1/4 cursor-pointer bg-[#414550]/15 shadow-lg ring-white ring-offset-1 drop-shadow-lg backdrop-blur-sm backdrop-saturate-100 transition-all hover:scale-[.97] hover:ring"
            }>
            <LazyLoadImage
                className={"aspect-[6/5] w-full rounded-xl"}
                src={berita.image}
            />
            <div className={"mt-6 flex items-center gap-3 px-4"}>
                <Avatar className={"h-6 w-6"}>
                    <AvatarImage src={berita.site.logo} />
                    <AvatarFallback>DN</AvatarFallback>
                </Avatar>
                <p className={"text-sm font-medium"}>
                    {berita.site.name} <span className={"text-sm font-normal text-gray-400"}>• {tanggal()}</span>
                </p>
            </div>
            <CardHeader className={"gap-2 px-4"}>
                <CardTitle className={"line-clamp-3"}>{berita.title}</CardTitle>
                <CardDescription className={"line-clamp-5"}>{berita.short_description}</CardDescription>
            </CardHeader>
            <div className={"mb-6 flex gap-3 px-4 py-2 text-sm text-gray-400"}>
                <p className={"font-medium text-rose-400"}>{berita.type}</p>
                <span>•</span>
                <p>{minutes} menit baca</p>
            </div>
        </Card>
    )
}
