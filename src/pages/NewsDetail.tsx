import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { Button } from "@/components/ui/button"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link, useLoaderData } from "react-router-dom"
import parse from 'html-react-parser';
import JsxParser from "react-jsx-parser"
import date from "date-and-time"
import { useReadingTime } from "react-hook-reading-time"
import { ArrowUpRight, Share2 } from "lucide-react"

export default function NewsDetail() {
    const datas = useLoaderData();
    const news = datas.data[0]

    const now = new Date()
    const added = date.parse(news.date, "YYYY-MM-DDThh:mm:ss")

    const tanggal = () => {
        if (!date.isSameDay(now, added)) return date.format(added, "dddd, DD MMMM YYYY")
        const difference = date.subtract(now, added)
        return difference.toHours() < 1 ? `${difference.toMinutes().toFixed()} menit` : `${difference.toHours().toFixed()} jam`
    }

    const { minutes } = useReadingTime(news.description)

    return (
        <div className={"grid bg-[radial-gradient(circle_at_right,_#2d303bcc,_#0F1014),_radial-gradient(circle_at_left,_#2d303bcc,_#0F1014)] pt-32"}>
            <div className={"mx-auto grid justify-center gap-4 font-cera"}>
                <div id={"header"} className={"mx-auto grid w-7/12 gap-6"}>
                    <h1 className={"text-4xl font-bold"}>{news.title}</h1>
                    <div className={"flex items-center"}>
                        <div className={"grid flex-grow gap-2"}>
                            <p className={"text-sm text-gray-300"}>{tanggal()}</p>
                            <div className={"flex items-center gap-3"}>
                                <Avatar className={"h-8 w-8"}>
                                    <AvatarImage src={news.site.logo} />
                                    <AvatarFallback>DN</AvatarFallback>
                                </Avatar>
                                <p className={"flex items-center gap-3 text-sm font-medium text-gray-400"}>
                                    <p className={"text-lg text-white"}>{news.site.name}</p>
                                    <span>•</span>
                                    <p>{minutes} menit baca</p>
                                </p>
                            </div>
                        </div>
                        <div className={"flex gap-2"}>
                            <Button variant={"ghost"} size={"icon"} className={"hover:bg-blue-500 hover:text-white"}>
                                <Share2/>
                            </Button>
                            <Button variant={"ghost"} size={"icon"} className={"hover:bg-blue-500 hover:text-white"} asChild>
                                <Link to={news.link}>
                                    <ArrowUpRight strokeWidth={2.5}/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <LazyLoadImage className={"mx-auto my-4 aspect-video w-8/12"} src={news.image} />
                <article id={"content"} className={"prose prose-lg prose-invert prose-blue w-7/12 mx-auto grid gap-6 !text-white"}>
                    {(news.site.id === 1 || news.site.id === 4) && <JsxParser jsx={news.description_html} />}
                    {(news.site.id === 2 || news.site.id === 3 || news.site.id === 5) && parse(news.description_html)}
                </article >
            </div>
        </div>
    )
}
