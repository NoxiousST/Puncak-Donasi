import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { BreadcrumbList } from "@/components/ui/breadcrumb.tsx"
import { Link } from "react-router-dom"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { BarChart3, HeartHandshake, Map, Rss } from "lucide-react"
import { LazyLoadImage } from "react-lazy-load-image-component"

export default function AboutUs() {
    return (
        <div className={"grid"}>
            <section className={"grid items-center justify-center gap-4 bg-[#1b1d25] pb-20 pt-28 text-center"}>
                <Breadcrumb className={"place-self-center"}>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={"/"}>Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Tentang Kami</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Tentang Kami</h1>
            </section>
            <section className={"grid gap-52 bg-[#262933]/80 p-20"}>
                <div className={"font-inter grid items-center justify-center gap-10 text-center"}>
                    <div className={"grid gap-4"}>
                        <text className={"text-4xl font-bold"}>Misi Kami</text>
                        <Separator className={"mx-auto h-1 w-64 rounded-full bg-rose-500"} />
                    </div>
                    <div className={"grid w-[40rem] gap-4 leading-loose"}>
                        <text className={""}>
                            Selamat datang di Puncak, sebuah platform yang didedikasikan untuk mendukung masyarakat yang terkena dampak letusan gunung berapi di Indonesia. Misi kami adalah memberikan
                            informasi secara real time, akurat, dan memfasilitasi donasi untuk membantu upaya pemulihan.
                        </text>
                        <text>Kami bertujuan untuk menghubungkan donasi dengan mereka yang membutuhkan, memanfaatkan teknologi untuk memberikan dampak yang berarti.</text>
                    </div>
                </div>
                <div className={"grid gap-12"}>
                    <div className={"font-inter grid items-center justify-center gap-2 text-center"}>
                        <Badge className={"mx-auto w-fit bg-rose-500 text-white hover:bg-rose-500/90"}>Fitur Platform</Badge>
                        <div className={"grid gap-10"}>
                            <text className={"text-4xl font-bold"}>Apa yang kami lakukan</text>
                            <text className={"w-[48rem] leading-loose"}>Di Puncak, kami menggabungkan data dan kasih sayang untuk menawarkan pendekatan komprehensif terhadap bantuan bencana.</text>
                        </div>
                    </div>
                    <div className={"mx-auto flex w-[64rem] justify-center gap-6"}>
                        <Card className={"bg-[#2d303b] ring-rose-500 transition-all hover:ring-4"}>
                            <CardHeader className={""}>
                                <BarChart3 size={36} className={"stroke-red-500"} strokeWidth={2.6} />

                                <CardTitle className={"py-2 text-3xl font-semibold"}>Informasi & Analitik</CardTitle>
                                <CardDescription className={"text-base text-gray-300"}>
                                    Tetap terinformasi dengan data real-time dan analisis rinci tentang gunung berapi aktif di Indonesia. Pakar kami memberikan wawasan untuk membantu Anda memahami
                                    ilmu di balik fenomena alam ini.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className={"bg-[#2d303b] ring-rose-500 transition-all hover:ring-4"}>
                            <CardHeader className={""}>
                                <Map size={36} className={"stroke-red-500"} strokeWidth={2.6} />
                                <CardTitle className={"py-2 text-3xl font-semibold"}>Peta Interaktif</CardTitle>
                                <CardDescription className={"text-base text-gray-300"}>
                                    Jelajahi peta dinamis kami untuk melihat area yang terkena dampak, zona evakuasi, dan laporan aktivitas terbaru. Peta kami dirancang untuk membantu warga dan donor
                                    dalam mengambil keputusan.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className={"bg-[#2d303b] ring-rose-500 transition-all hover:ring-4"}>
                            <CardHeader className={""}>
                                <Rss size={36} className={"stroke-red-500"} strokeWidth={3} />
                                <CardTitle className={"py-2 text-3xl font-semibold"}>Berita & Pembaruan</CardTitle>
                                <CardDescription className={"text-base text-gray-300"}>
                                    Dapatkan berita dan informasi terkini tentang letusan gunung berapi, upaya bantuan, dan cerita komunitas. Kami memberikan pembaruan dari sumber tepercaya agar Anda
                                    selalu mendapat informasi tentang situasinya.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
                <div className={"flex px-24 w-full justify-between"}>
                    <LazyLoadImage className={"h-80 rounded-lg shadow-xl shadow-gray-500/50"} src={"https://www.gulf-insider.com/wp-content/uploads/2022/04/istockphoto-1139776668-612x612-1.jpg"} />
                    <div className={"flex flex-col text-end w-[36rem] gap-4"}>
                        <HeartHandshake className={"place-self-end stroke-red-500"} size={56} strokeWidth={2.5} />
                        <text className={"text-4xl font-bold"}>Bagaimana Anda Dapat Membantu</text>
                        <text className={" leading-relaxed"}>
                            Sumbangan Anda membuat perbedaan. Setiap kontribusi, berapa pun besarnya, membantu mendukung tanggap darurat, menyediakan pasokan penting, dan membangun kembali masyarakat.
                            Melalui platform kami yang aman, Anda dapat memilih untuk berdonasi untuk tujuan tertentu atau membiarkan kami mengalokasikan dana Anda di tempat yang paling membutuhkan.
                        </text>
                    </div>
                </div>
            </section>
        </div>
    )
}
