import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Info, MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { ICCheck, ICPlus, ICSearch } from "@/components/Icons.tsx"

import { LazyLoadImage } from "react-lazy-load-image-component"

import mountVector from "@/assets/MountVector.svg"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator.tsx"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import { NumericFormat } from "react-number-format"
import { useEffect, useRef } from "react"

import date from "date-and-time"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card.tsx"
import Donor, { DonorCarousel } from "@/components/Donor.tsx"
import { newsDate } from "@/lib/utils.ts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { readingTime } from "reading-time-estimator"
import id from "date-and-time/locale/id"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store.ts"
import { fetchPayments, SearchRedux } from "@/redux/searchSlice.ts"
import { fetchMainAnalytic, MainAnalyticRedux } from "@/redux/mainAnalyticSlice.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { fetchMainNews, MainNewsRedux } from "@/redux/mainNewsSlice.ts"

const FormSchema = z.object({
    email: z.string().email({
        message: "Email tidak valid!"
    }),
    amount: z.number().gt(7000, {
        message: "Nominal donasi harus lebih dari Rp 7.000"
    })
})

function App() {
    const donateRef = useRef(null)

    const dispatch = useDispatch<AppDispatch>()
    const analyticState = useSelector((state: RootState) => state.mainAnalytic)
    const newsState = useSelector((state: RootState) => state.mainNews)
    const paymentsState = useSelector((state: RootState) => state.payments)

    useEffect(() => {
        dispatch(fetchMainAnalytic())
        dispatch(fetchMainNews())
        dispatch(fetchPayments())
    }, [dispatch])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            amount: undefined
        }
    })

    date.locale(id)
    const navigate = useNavigate()

    function onSubmit(data: z.infer<typeof FormSchema>) {
        navigate("/donasi", { state: data })
    }

    return (
        <>
            <div className={"overflow-x-hidden"}>
                {/* Section 1 | Hero */}
                <section className="grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] py-36 md:py-48">
                    <div className={"grid gap-6 px-2"}>
                        <h1 className="w-full justify-evenly text-center font-cera text-3xl font-bold md:text-6xl">
                            Solusi Donasi Korban Erupsi
                            <br />
                            <span
                                className={"bg-gradient-to-br from-rose-500 to-rose-600 bg-clip-text text-left text-transparent md:text-center"}>Gunung Berapi</span>
                            &nbsp;di Indonesia
                            <span className={"text-rose-500"}>.</span>
                        </h1>
                        <h2 className="mx-auto w-full text-center font-cera text-sm leading-relaxed text-gray-400 md:w-8/12 md:text-xl">
                            Puncak adalah pusat informasi dan donasi yang didedikasikan untuk memberikan bantuan dan
                            upaya mitigasi kepada korban letusan gunung di Indonesia.
                        </h2>
                    </div>
                    <div className={"flex justify-center gap-12 font-cera md:mt-4"}>
                        <Button
                            className="group flex rounded-xl border-2 border-gray-500 !bg-transparent p-6 text-lg font-bold uppercase tracking-wider text-white transition-all hover:border-gray-200">
                            <Link to={"tentang-kami"}>Tentang Kami</Link>
                        </Button>
                        <Button
                            onClick={() => donateRef.current.scrollIntoView({ behavior: "smooth" })}
                            className="group flex items-center rounded-xl border-2 border-emerald-500 bg-transparent from-emerald-400 to-emerald-500 p-6 text-lg font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:border-emerald-500 hover:border-transparent hover:bg-gradient-to-r hover:shadow-emerald-500/60">
                            Donasikan
                            <MoveRight strokeWidth={2.8} size={22} className={"ml-2 transition-all group-hover:ml-4"} />
                        </Button>
                    </div>
                    <div
                        className={"flex w-full flex-col items-center flex-wrap justify-center gap-12 px-8 xl:flex-row md:gap-20"}>
                        <AnlyticCard aState={analyticState} />
                        <NewsCard aState={newsState} />
                        <DonationCard aState={paymentsState} />
                    </div>
                </section>

                {/* Section 2 | Donasi */}
                <section id={"donate-section"}
                         ref={donateRef}
                         className={"relative flex gap-y-16 lg:flex-row flex-col w-full justify-evenly items-center bg-[radial-gradient(circle_at_right,_#262933,_#0F1014)] py-24"}>
                    <div className={"z-10 my-auto"}>
                        <div className={"my-auto min-h-[37rem] font-montserrat text-white"}>
                            <div className={"mb-12 grid font-cera font-bold"}>
                                <p className="mb-6 block text-sm font-bold uppercase tracking-wide text-gray-400">Donasi</p>
                                <h1 className={"text-4xl"}>
                                    Bersama mengangkat harapan<span className={"text-emerald-500"}>.</span>
                                </h1>
                                <p className={"py-1 text-sm text-gray-400"}>
                                    Kebaikan Anda <span
                                    className={"font-semibold uppercase tracking-wide text-emerald-500"}>sangat berarti</span> untuk
                                    mereka semua.
                                </p>
                            </div>
                            <Form {...form}>
                                <form className={"grid w-[34rem] gap-6"} onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-gray-500"}>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="example@gmail.com" {...field}
                                                           className={"h-12 rounded-xl bg-[#262933] font-varela text-lg !ring-emerald-500"} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Separator className={"mx-auto my-2 h-0.5 w-11/12 rounded bg-gray-800"} />
                                    <Tabs defaultValue={"opsi"}>
                                        <TabsList className="grid h-12 grid-cols-2 bg-[#262933]">
                                            <TabsTrigger
                                                className="h-full font-semibold data-[state=active]:bg-emerald-500"
                                                value="opsi">
                                                Opsi
                                            </TabsTrigger>
                                            <TabsTrigger
                                                className="h-full font-semibold data-[state=active]:bg-emerald-500"
                                                value="ketik">
                                                Jumlah Lain
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent className={"my-4"} value="opsi">
                                            <FormField
                                                control={form.control}
                                                name="amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={"text-gray-500"}>jumlah</FormLabel>
                                                        <FormControl>
                                                            <ToggleGroup
                                                                // @ts-expect-error ValueType
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                type="single"
                                                                className={"flex-wrap gap-3"}>
                                                                {donateGroup.map((data) => (
                                                                    <FormItem key={data.nominal}
                                                                              className="flex items-center">
                                                                        <FormControl>
                                                                            <ToggleGroupItem
                                                                                // @ts-expect-error ValueType
                                                                                value={data.nominal}
                                                                                className={
                                                                                    "h-12 bg-[#262933] p-5 font-cera text-[15px] font-medium tracking-wide ring-emerald-600 hover:ring-2 data-[state=on]:bg-emerald-500"
                                                                                }>
                                                                                {data.formatted}
                                                                            </ToggleGroupItem>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                ))}
                                                            </ToggleGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>
                                        <TabsContent className={"my-4"} value="ketik">
                                            <FormField
                                                name={"amount"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={"text-gray-500"}>Jumlah</FormLabel>
                                                        <FormControl>
                                                            <NumericFormat
                                                                placeholder="0,00"
                                                                name={field.name}
                                                                value={field.value}
                                                                onValueChange={(v) => field.onChange(Number(v.value))}
                                                                decimalSeparator={","}
                                                                thousandSeparator={"."}
                                                                prefix={"Rp "}
                                                                className={
                                                                    "flex h-12 w-full rounded-xl border bg-[#262933] px-3 py-2 text-sm font-semibold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>
                                    </Tabs>
                                    <Button size={"lg"} type="submit"
                                            className="flex gap-2 place-self-end rounded-full border-2 border-emerald-500 bg-transparent font-semibold hover:bg-emerald-500">
                                        Lanjutkan
                                        <ArrowRight size={20} strokeWidth={3} />
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                    <DonorCarousel className={"z-10 my-auto"} payment={paymentsState.data} />
                    <LazyLoadImage
                        className={"absolute bottom-0 z-0 -scale-x-100 p-24 opacity-5 blur contrast-200 saturate-0"}
                        src={mountVector} />
                </section>
                {/* Section 3 | Features */}
                <section>
                    <div
                        className={"grid items-center justify-center gap-24 bg-[radial-gradient(circle_at_top,_#1b1d25,_#0F1014)] py-20"}>
                        <div className={"text-center"}>
                            <h1 className={"font-cera text-5xl font-bold leading-tight"}>
                                Real people, real solutions, <br />
                                <span className={"capitalize text-cyan-400"}>real change</span>.
                            </h1>
                            <p className={"mt-6 text-lg text-gray-300"}>
                                Semua donasi ditujukan untuk membantu masyarakat yang terkena dampak
                                letusan <br /> gunung berapi dan membantu pemulihan mereka.
                            </p>
                        </div>
                        <div className={"grid justify-center gap-16 px-8 md:flex xl:px-36"}>
                            <Card
                                className={"h-fit basis-1/3 rounded-xl bg-gradient-to-br from-white via-indigo-400 to-transparent p-0.5"}>
                                <div className={"grid rounded-xl bg-[#0F1014]"}>
                                    <CardHeader className={"pb-0"}>
                                        <div className={"flex justify-between"}>
                                            <ICCheck />
                                            <p className={"font-montserrat text-5xl font-bold text-slate-800"}>01</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <h1 className={"mb-4 font-cera lg:text-4xl text-2xl font-medium"}>Bantuan Darurat</h1>
                                        <p className={"font-montserrat text-gray-400 lg:text-base text-sm"}>
                                            Sumbangan dapat membantu menyediakan makanan, air, tempat berlindung, dan
                                            bantuan medis kepada masyarakat yang terkena dampak.
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card
                                className={"h-fit basis-1/3 rounded-xl bg-gradient-to-br from-white via-sky-400 to-transparent p-0.5"}>
                                <div className={"grid rounded-xl bg-[#0F1014]"}>
                                    <CardHeader className={"pb-0"}>
                                        <div className={"flex justify-between"}>
                                            <ICSearch />
                                            <p className={"font-montserrat text-5xl font-bold text-slate-800"}>02</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <h1 className={"mb-4 font-cera lg:text-4xl text-2xl font-medium"}>Operasi Evakuasi</h1>
                                        <p className={"font-montserrat text-gray-400 lg:text-base text-sm"}>
                                            Donasi dapat mendukung upaya evakuasi dengan menyediakan transportasi,
                                            operasi pencarian dan penyelamatan, dan pusat evakuasi.
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                            <Card
                                className={"h-fit basis-1/3 rounded-xl bg-gradient-to-br from-white via-teal-400 to-transparent p-0.5"}>
                                <div className={"grid rounded-xl bg-[#0F1014]"}>
                                    <CardHeader className={"pb-0"}>
                                        <div className={"flex justify-between"}>
                                            <ICPlus />
                                            <CardTitle
                                                className={"font-montserrat text-5xl font-bold text-gray-800"}>03</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <h1 className={"mb-4 font-cera lg:text-4xl text-2xl font-medium"}>Bantuan Medis</h1>
                                        <p className={"font-montserrat text-gray-400 lg:text-base text-sm"}>
                                            Sumbangan dapat berupa persediaan medis, peralatan, dan personel untuk
                                            merawat dan memberikan layanan kesehatan kepada masyarakat.
                                        </p>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Section 4 | News */}
                <section className={"h-fit text-white"}>
                    <div className={"h-full bg-erupt bg-cover bg-left bg-no-repeat"}>
                        <div
                            className={"h-full bg-[radial-gradient(circle_80rem_at_left,_#00000066,_#000000aa,_#0F1014f5,_#0F1014)]"}>
                            <div className={"flex lg:flex-row flex-col h-full w-full py-12 gap-y-12"}>
                                <div className={"h-fit lg:w-1/2 w-full px-20 "}>
                                    <p className="mb-6 block text-sm font-bold uppercase tracking-wide text-gray-300">Berita</p>
                                    <h1 className={"pr-16 font-cera sm:text-3xl lg:text-2xl xl:text-3xl font-bold"}>Berita dan Informasi Gunung
                                        berapi Terkini dan Terbaru.</h1>
                                </div>
                                <div className={"flex h-full xl:w-1/2 w-full items-center justify-center"}>
                                    <div
                                        className={"flex h-fit flex-col gap-4 rounded-2xl bg-[#1b1d25]/25 px-4 py-4 backdrop-blur-md backdrop-contrast-75 backdrop-saturate-200"}>
                                        <div className={"flex items-center"}>
                                            <p className={"flex-grow font-cera text-lg font-medium"}>News Feed</p>
                                            <Button variant={"ghost"} size={"sm"}
                                                    className={"w-fit place-self-end font-semibold text-rose-500 hover:bg-rose-600 hover:text-white"}
                                                    asChild>
                                                <Link to={"/news"}>Lihat semua</Link>
                                            </Button>
                                        </div>

                                        {newsState.data &&
                                            newsState.data.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={"flex h-48 w-[36rem] gap-2 rounded-lg p-2 transition-all hover:cursor-pointer hover:bg-[#2d303b]"}
                                                    onClick={() => navigate(`/news/${item.site.id}`)}>
                                                    <LazyLoadImage className={"aspect-[4/3] rounded-md"}
                                                                   src={item.image} alt={"news"} />
                                                    <div className={"flex flex-col justify-between px-2 py-1"}>
                                                        <div className={"flex items-center gap-3"}>
                                                            <Avatar className={"h-5 w-5"}>
                                                                <AvatarImage src={item.site.logo} />
                                                                <AvatarFallback>DN</AvatarFallback>
                                                            </Avatar>
                                                            <p className={"text-sm font-medium"}>
                                                                {item.site.name}{" "}
                                                                <span
                                                                    className={"text-sm font-normal text-gray-400"}>• {newsDate(new Date(), date.parse(item.date, "YYYY-MM-DDThh:mm:ss"))}</span>
                                                            </p>
                                                        </div>
                                                        <p className={"line-clamp-2 font-cera text-xl font-bold"}>{item.title}</p>
                                                        <p className={"line-clamp-3 text-sm text-muted-foreground"}>{item.short_description}</p>
                                                        <div className={"flex gap-3 text-sm text-gray-400"}>
                                                            <p className={"font-medium text-rose-400"}>{item.type}</p>
                                                            <span>•</span>
                                                            <p>{readingTime(item.description).minutes} menit baca</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default App

function AnlyticCard({ aState }: { aState: MainAnalyticRedux }) {
    if (aState.loading || aState.error || !aState.data)
        return (
            <Card
                className={
                    "relative flex h-fit rounded-xl border-zinc-700 bg-[radial-gradient(circle_at_top_left,_#373b46,_#1b1d25)] ring-white/80 transition-all hover:shadow-xl hover:shadow-white/50 hover:ring-4 md:w-80"
                }>
                <LazyLoadImage className={"absolute bottom-0 p-2"} src={mountVector} />
                <div className={"z-10 grid w-full gap-2 rounded-xl bg-gradient-to-r from-[#1b1d2566] to-[#1b1d25] p-4"}>
                    <div className={"flex justify-between"}>
                        <span
                            className={"w-fit rounded-full bg-rose-600 px-2 py-0.5 text-sm font-semibold"}>Erupsi</span>
                        <Info className={"stroke-gray-500"} />
                    </div>
                    <Skeleton className={"h-7 w-64"} />
                    <Skeleton className={"h-3 w-24"} />
                    <Skeleton className={"h-3 w-24"} />
                    <div className={"mt-2 grid gap-1"}>
                        <Skeleton className={"h-3"} />
                        <Skeleton className={"h-3"} />
                        <Skeleton className={"h-3 w-36"} />
                    </div>
                </div>
            </Card>
        )

    const item = aState.data.children[0]
    return (
        <HoverCard>
            <HoverCardTrigger className={"h-fit shrink"} asChild>
                <Link to={`analitik/informasi-letusan/laporan?url=${item.url}`}>
                    <Card
                        className={
                            "md:w-full max-w-[44rem] relative flex h-fit shrink rounded-xl border-zinc-700 bg-[radial-gradient(circle_at_top_left,_#373b46,_#1b1d25)] ring-white/80 transition-all hover:shadow-xl hover:shadow-white/50 hover:ring-4 xl:w-[22rem]"
                        }>
                        <LazyLoadImage className={"absolute bottom-0 p-2"} src={mountVector} />
                        <div
                            className={"z-10 grid w-full rounded-xl bg-gradient-to-r from-[#1b1d2566] to-[#1b1d25] p-4"}>
                            <div className={"flex justify-between"}>
                                <span
                                    className={"w-fit rounded-full bg-rose-600 px-2 py-0.5 text-sm font-semibold"}>Erupsi</span>
                                <Info className={"stroke-gray-500"} />
                            </div>
                            <p className={"w-fit font-cera text-2xl font-medium"}>Gunung {item.title}</p>
                            <p className={"w-fit text-left text-xs text-gray-300"}>{aState.data.date}</p>
                            <p className={"w-fit text-left text-xs text-gray-400"}>Pukul {item.time}</p>
                            <p className={"line-clamp-4 pt-4 text-sm text-gray-300"}>{item.text}</p>
                        </div>
                    </Card>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className={"rounded-xl bg-[#2d303b]/30 backdrop-blur-lg backdrop-saturate-100 md:w-80"}>
                <LazyLoadImage src={item.image}
                               className={"w-full rounded-lg opacity-90 transition-all duration-500 ease-in-out"} />
            </HoverCardContent>
        </HoverCard>
    )
}

function NewsCard({ aState }: { aState: MainNewsRedux }) {
    if (aState.loading || aState.error || !aState.data)
        return (
            <Card className={"group mt-24 rounded-xl border-zinc-700 bg-[#2d303b] lg:flex"}>
                <div
                    className={"bottom-0 flex h-64 w-96 flex-col justify-end gap-2 rounded-xl bg-gradient-to-b from-[#0F1014]/10 via-[#0F1014]/40 to-[#0F1014]/80 p-2"}>
                    <div className={"flex items-center gap-3"}>
                        <Skeleton className={"h-6 w-6 rounded-full"} />
                        <Skeleton className={"h-6 w-36"} />
                    </div>
                    <Skeleton className={"h-7"} />
                    <div className={"grid gap-1"}>
                        <Skeleton className={"h-3"} />
                        <Skeleton className={"h-3"} />
                    </div>
                </div>
            </Card>
        )

    const item = aState.data[0]
    const added = date.parse(item.date, "YYYY-MM-DDThh:mm:ss")
    return (
        <Link className={"xl:mt-24"} to={`news/${item.site.id}`}>
            <Card
                className={"group relative rounded-xl border-zinc-700 ring-white/80 transition-all duration-500 ease-in-out hover:shadow-xl hover:shadow-white/50 hover:ring-4 md:order-4 lg:flex"}>
                <LazyLoadImage src={item.image} className={"h-64 lg:w-full xl:w-96 rounded-xl"} />
                <div
                    className={"absolute bottom-0 flex h-64 flex-col justify-end rounded-xl bg-gradient-to-b from-[#0F1014]/10 via-[#0F1014]/40 to-[#0F1014]/80 p-2"}>
                    <div className={"flex items-center gap-3"}>
                        <Avatar className={"h-5 w-5"}>
                            <AvatarImage src={item.site.logo} />
                            <AvatarFallback>DN</AvatarFallback>
                        </Avatar>
                        <p className={"text-xs font-medium"}>
                            {item.site.name} <span
                            className={"text-xs font-normal text-gray-400"}>• {newsDate(new Date(), added)}</span>
                        </p>
                    </div>
                    <h1 className={"line-clamp-1 text-start font-cera text-xl font-medium"}>{item.title}</h1>
                    <p className={"line-clamp-2 flex-wrap text-wrap text-start text-sm text-gray-400"}>{item.short_description}</p>
                </div>
            </Card>
        </Link>
    )
}

function DonationCard({ aState }: { aState: SearchRedux }) {
    if (aState.loading || aState.error || !aState.data)
        return (
            <Card
                className={"group grid h-fit rounded-xl border-zinc-700 bg-[radial-gradient(circle_at_top_right,_#262933,_#1b1d25)] p-4 md:w-[22rem]"}>
                <h1 className={"w-fit font-cera text-lg text-gray-400"}>Donasi Terkumpul</h1>
                <Skeleton className={"h-10 w-9/12"} />
                <div className={"mt-4 grid gap-2"}>
                    <Skeleton className={"flex h-14 items-center gap-2 px-3"}>
                        <Skeleton className={"h-11 w-11 shrink-0 rounded-full bg-[#3c4154]"} />
                        <Skeleton className={"h-6 w-28 shrink-0 bg-[#3c4154]"} />
                        <div className={"flex w-full flex-col items-end gap-2"}>
                            <Skeleton className={"h-5 w-28 bg-[#3c4154]"} />
                            <Skeleton className={"h-2 w-28 bg-[#3c4154]"} />
                        </div>
                    </Skeleton>
                    <Skeleton className={"flex h-14 items-center gap-2 px-3"}>
                        <Skeleton className={"h-11 w-11 shrink-0 rounded-full bg-[#3c4154]"} />
                        <Skeleton className={"h-6 w-28 shrink-0 bg-[#3c4154]"} />
                        <div className={"flex w-full flex-col items-end gap-2"}>
                            <Skeleton className={"h-5 w-28 bg-[#3c4154]"} />
                            <Skeleton className={"h-2 w-28 bg-[#3c4154]"} />
                        </div>
                    </Skeleton>
                    <Button size={"sm"}
                            className={"rounded-lg bg-[#414550]/25 font-varela text-gray-300 hover:bg-[#414550]/55"}
                            asChild>
                        <Link to={"pencarian"}>Cari donasi...</Link>
                    </Button>
                </div>
            </Card>
        )

    const item = aState.data
    return (
        <Card
            className={"shrink sm:w-full max-w-[44rem] grid rounded-xl border-zinc-700 bg-[radial-gradient(circle_at_top_right,_#262933,_#1b1d25)] p-4 xl:w-[22rem]"}>
            <h1 className={"font-cera text-lg text-gray-400"}>Donasi Terkumpul</h1>
            <NumericFormat
                displayType="text"
                value={item.total / 100}
                prefix={"Rp. "}
                thousandSeparator={"."}
                decimalSeparator={","}
                className={"bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text font-montserrat text-4xl font-bold tracking-wide text-transparent"}
            />
            <div className={"mt-4 grid gap-2 transition-all duration-500 ease-in-out"}>
                <Donor intent={item.intents[0]} />
                <Donor intent={item.intents[1]} />
                <Button size={"sm"}
                        className={"rounded-lg bg-[#414550]/25 font-varela text-gray-300 hover:bg-[#414550]/55"}
                        asChild>
                    <Link to={"pencarian"}>Cari donasi...</Link>
                </Button>
            </div>
        </Card>
    )

}

const donateGroup: { nominal: number; nString: string; formatted: string }[] = [
    { nominal: 10000, nString: "10000", formatted: "Rp. 10.000" },
    { nominal: 20000, nString: "20000", formatted: "Rp. 20.000" },
    { nominal: 50000, nString: "50000", formatted: "Rp. 50.000" },
    { nominal: 75000, nString: "75000", formatted: "Rp. 75.000" },
    { nominal: 100000, nString: "100000", formatted: "Rp. 100.000" },
    { nominal: 150000, nString: "150000", formatted: "Rp. 150.000" },
    { nominal: 200000, nString: "200000", formatted: "Rp. 200.000" }
]
