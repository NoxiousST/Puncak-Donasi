import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { ICCheck, ICPlus, ICSearch } from "@/components/Icons.tsx"

import { LazyLoadImage } from "react-lazy-load-image-component"

import mountVector from "@/assets/MountVector.svg"
import aids from "@/assets/aids.jpg"
import mountIllust from "@/assets/mountIllust.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator.tsx"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast.ts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import { NumericFormat } from "react-number-format"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabase.ts"
import { Berita } from "@/pages/News.tsx"
import date from "date-and-time"

const FormSchema = z.object({
    fName: z.string(),
    lName: z.string(),
    email: z.string().email({
        message: "Email tidak valid!",
    }),
    amount: z.number().gt(7000, {
        message: "Nominal donasi harus lebih dari Rp 7.000",
    }),
})

function Index() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fName: "",
            lName: "",
            email: "",
            amount: undefined,
        },
    })

    const { toast } = useToast()
    const navigate = useNavigate()

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-gray-800 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        navigate("/donasi", { state: data })
    }

    const [news, setNews] = useState<Berita[]>([])

    useEffect(() => {
        getNews()
    }, [])

    async function getNews() {
        const { data: udata } = await supabase.from("news").select(`id, title, description, short_description, date, type, image, site(id, name, logo)`).order("date", { ascending: false }).limit(3)
        setNews(udata)
    }

    return (
        <div className={"overflow-x-hidden"}>
            {/* Section 1 | Hero */}
            <section className="grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] py-36 md:py-48">
                <div className={"grid gap-6 px-2"}>
                    <h1 className="w-full justify-evenly text-center font-cera text-3xl font-bold md:text-6xl">
                        Solusi Donasi Korban Erupsi
                        <br />
                        <span className={"bg-gradient-to-r from-rose-400 to-rose-500 bg-clip-text text-left text-transparent md:text-center"}>Gunung Berapi</span>
                        &nbsp;di Indonesia
                        <span className={"text-rose-500"}>.</span>
                    </h1>
                    <h2 className="mx-auto w-full text-center font-cera text-sm leading-relaxed text-gray-400 md:w-8/12 md:text-xl">
                        Puncak adalah pusat informasi dan donasi yang didedikasikan untuk memberikan bantuan dan upaya mitigasi kepada korban letusan gunung di Indonesia.
                    </h2>
                </div>
                <div className={"flex justify-center gap-12 font-cera md:mt-4"}>
                    <Button className="group flex rounded-xl border-2 border-gray-500 !bg-transparent p-6 text-lg font-bold uppercase tracking-wider text-white transition-all hover:border-gray-200">
                        <Link to={"start"}>Get Started</Link>
                    </Button>
                    <Button className="group flex rounded-xl border-2 border-sky-500/75 bg-transparent from-sky-400 to-sky-500 p-6 text-lg font-bold tracking-wider text-white shadow-lg transition-all hover:border-sky-500 hover:border-transparent hover:bg-gradient-to-r hover:shadow-sky-500/60">
                        DONATE
                        <ArrowRight strokeWidth={3} className={"ml-2 transition-all group-hover:ml-4"} />
                    </Button>
                </div>
                <div className={"flex w-full flex-col justify-center gap-12 px-8 md:flex-row md:gap-20"}>
                    <Card
                        className={
                            "relative order-2 flex h-fit rounded-xl border-zinc-700 bg-[radial-gradient(circle_at_top_left,_#373b46,_#1b1d25)] ring-white/80 transition-all hover:shadow-xl hover:shadow-white/50 hover:ring-4 md:w-80"
                        }>
                        <LazyLoadImage className={"absolute bottom-0 p-2"} src={mountVector} alt={undefined} />
                        <div className={"z-10 w-full rounded-xl bg-gradient-to-r from-[#1b1d2566] to-[#1b1d25] p-4"}>
                            <div className={"flex justify-between"}>
                                <span className={"w-fit rounded-full bg-rose-600 px-2 py-0.5 text-sm font-semibold"}>Level IV (Awas)</span>
                                <Info className={"stroke-gray-500"} />
                            </div>
                            <div className={"w-fit font-cera text-2xl font-medium"}>Gunung Merapi</div>
                            <div className={"w-fit text-left text-xs text-gray-400"}>25 April 2024</div>
                            <ul className={"ml-auto w-fit rounded-lg bg-[#414550]/15 px-2 py-1 text-right text-gray-300 shadow-lg drop-shadow-lg backdrop-blur-sm backdrop-saturate-100"}>
                                <li>Tewas (23)</li>
                                <li>Terluka (12)</li>
                                <li>Dievakuasi (40)</li>
                            </ul>
                        </div>
                    </Card>
                    <Card className={"order-1 mt-24 hidden rounded-xl border-zinc-700 md:order-4 lg:flex"}>
                        <div className={"relative"}>
                            <div className={"absolute left-1/2 top-8 h-60 w-11/12 -translate-x-1/2 rounded-xl bg-zinc-800/75"}></div>
                            <LazyLoadImage src={aids} alt={aids} className={"relative h-64 w-96 rounded-xl"} />
                            <div className={"absolute bottom-0 flex h-64 flex-col justify-end rounded-xl bg-gradient-to-b from-[#0F1014]/20 via-[#0F1014bb] to-[#0F1014] p-2"}>
                                <h1 className={"text-start font-cera text-xl font-medium"}>Bersatu Untuk Bantu</h1>
                                <p className={"line-clamp-2 flex-wrap text-wrap text-start text-sm text-gray-400"}>
                                    Setiap sumbangan membawa harapan bagi mereka yang terkena dampak bencana. Bersama, kita bisa membuat perbedaan yang besar.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className={"order-5 grid h-fit rounded-xl border-zinc-700 bg-[radial-gradient(circle_at_top_right,_#262933,_#1b1d25)] p-4 md:w-80"}>
                        <h1 className={"w-fit font-cera text-xl text-gray-400"}>Donasi Terkumpul</h1>
                        <p className={"w-fit bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text font-montserrat text-3xl font-semibold tracking-wide text-transparent"}>Rp. 17.345.000</p>
                        <p className={"w-fit py-1 font-montserrat text-sm text-white/60"}>
                            + Rp. 100.000 <span className={"text-xs text-white/50"}>• 3 menit yang lalu</span>
                        </p>
                        <p className={"mt-4 text-right text-sm text-gray-400"}>
                            Erupsi <span className={"text-rose-400"}>Gunung Merapi</span>
                            <br />
                            <span className={"text-xs text-gray-400/75"}>Magelang, Jawa Tengah</span>
                        </p>
                    </Card>
                </div>
            </section>

            {/* Section 2 | Donasi */}
            <section className={"flex w-full bg-[radial-gradient(circle_at_right,_#262933,_#0F1014)] py-24"}>
                <div className={"flex basis-full px-8 md:basis-1/2 md:px-24"}>
                    <div className={"my-auto min-h-[44rem] font-montserrat text-white"}>
                        <div className={"mb-12 grid font-cera font-bold"}>
                            <p className="mb-6 block text-sm font-bold uppercase tracking-wide text-gray-400">Donasi</p>
                            <h1 className={"text-4xl"}>
                                Bersama mengangkat harapan<span className={"text-indigo-500"}>.</span>
                            </h1>
                            <p className={"py-1 text-sm text-gray-400"}>
                                Kebaikan Anda <span className={"font-semibold uppercase tracking-wide text-indigo-500"}>sangat berarti</span> untuk mereka semua.
                            </p>
                        </div>
                        <Form {...form}>
                            <form className={"grid w-[34rem] gap-6"} onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="fName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-gray-500"}>Nama Depan</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} className={"rounded-xl bg-[#262933] !ring-indigo-500"} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"text-gray-500"}>Nama Belakang</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} className={"rounded-xl bg-[#262933] !ring-indigo-500"} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={"text-gray-500"}>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="example@gmail.com" {...field} className={"rounded-xl bg-[#262933] !ring-indigo-500"} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Separator className={"mx-auto my-2 h-0.5 w-11/12 rounded bg-gray-800"} />
                                <Tabs defaultValue={"opsi"}>
                                    <TabsList className="grid grid-cols-2 bg-[#262933]">
                                        <TabsTrigger className="data-[state=active]:bg-indigo-600" value="opsi">
                                            Opsi
                                        </TabsTrigger>
                                        <TabsTrigger className="data-[state=active]:bg-indigo-600" value="ketik">
                                            Ketik Jumlah
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
                                                        <ToggleGroup onValueChange={field.onChange} value={field.value} type="single" className={"flex-wrap gap-2"}>
                                                            {donateGroup.map((data) => (
                                                                <FormItem key={data.nominal} className="flex items-center">
                                                                    <FormControl>
                                                                        <ToggleGroupItem
                                                                            value={data.nominal}
                                                                            className={
                                                                                "bg-[#262933] p-5 font-cera font-medium tracking-wider ring-indigo-600 hover:ring-2 data-[state=on]:bg-indigo-600"
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
                                                                "flex h-12 w-full rounded-xl border bg-[#262933] px-3 py-2 text-sm font-semibold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TabsContent>
                                </Tabs>

                                <Button size={"lg"} type="submit" className="flex gap-2 place-self-end rounded-full border-2 border-indigo-600 bg-transparent font-semibold hover:bg-indigo-600">
                                    Lanjutkan
                                    <ArrowRight size={20} strokeWidth={3} />
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className={"flex basis-0 items-center md:basis-1/2"}>
                    <img src={mountIllust} alt={"back"} className={"mx-auto h-[36rem]"} />
                </div>
            </section>
            {/* Section 3 | Features */}
            <section>
                <div className={"grid items-center justify-center gap-24 bg-[radial-gradient(circle_at_top,_#1b1d25,_#0F1014)] py-20"}>
                    <div className={"text-center"}>
                        <h1 className={"font-cera text-5xl font-bold leading-tight"}>
                            Real people, real solutions, <br />
                            <span className={"capitalize text-cyan-400"}>real change</span>.
                        </h1>
                        <p className={"mt-6 text-lg text-gray-300"}>
                            Semua donasi ditujukan untuk membantu masyarakat yang terkena dampak letusan <br /> gunung berapi dan membantu pemulihan mereka.
                        </p>
                    </div>
                    <div className={"grid justify-center gap-16 px-8 md:flex md:px-36"}>
                        <Card className={"h-fit basis-1/3 rounded-xl bg-gradient-to-br from-white via-indigo-400 to-transparent p-0.5"}>
                            <div className={"grid rounded-xl bg-[#0F1014]"}>
                                <CardHeader className={"pb-0"}>
                                    <div className={"flex justify-between"}>
                                        <ICCheck />
                                        <p className={"font-montserrat text-5xl font-bold text-slate-800"}>01</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h1 className={"mb-4 font-cera text-4xl font-medium"}>Bantuan Darurat</h1>
                                    <p className={"font-montserrat text-gray-400"}>
                                        Sumbangan dapat membantu menyediakan makanan, air, tempat berlindung, dan bantuan medis kepada masyarakat yang terkena dampak.
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                        <Card className={"h-fit basis-1/3 rounded-xl bg-gradient-to-br from-white via-sky-400 to-transparent p-0.5"}>
                            <div className={"grid rounded-xl bg-[#0F1014]"}>
                                <CardHeader className={"pb-0"}>
                                    <div className={"flex justify-between"}>
                                        <ICSearch />
                                        <p className={"font-montserrat text-5xl font-bold text-slate-800"}>02</p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h1 className={"mb-4 font-cera text-4xl font-medium"}>Operasi Evakuasi</h1>
                                    <p className={"font-montserrat text-gray-400"}>
                                        Donasi dapat mendukung upaya evakuasi dengan menyediakan transportasi, operasi pencarian dan penyelamatan, dan pusat evakuasi.
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                        <Card className={"h-fit basis-1/3 rounded-xl bg-gradient-to-br from-white via-teal-400 to-transparent p-0.5"}>
                            <div className={"grid rounded-xl bg-[#0F1014]"}>
                                <CardHeader className={"pb-0"}>
                                    <div className={"flex justify-between"}>
                                        <ICPlus />
                                        <CardTitle className={"font-montserrat text-5xl font-bold text-gray-800"}>03</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <h1 className={"mb-4 font-cera text-4xl font-medium"}>Bantuan Medis</h1>
                                    <p className={"font-montserrat text-gray-400"}>
                                        Sumbangan dapat berupa persediaan medis, peralatan, dan personel untuk merawat dan memberikan layanan kesehatan kepada masyarakat.
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Section 4 | News */}
            <section className={"h-[110vh] text-white"}>
                <div className={"bg-erupt h-full bg-cover bg-left bg-no-repeat"}>
                    <div className={"h-full bg-[radial-gradient(circle_80rem_at_left,_#00000066,_#000000aa,_#0F1014f5,_#0F1014)]"}>
                        <div className={"flex h-full w-full"}>
                            <div className={"h-fit w-1/2 px-20 py-28"}>
                                <p className="mb-6 block text-sm font-bold uppercase tracking-wide text-gray-300">Berita</p>
                                <h1 className={"pr-16 font-cera text-3xl font-bold"}>Berita dan Informasi Gunung berapi Terkini dan Terbaru.</h1>
                            </div>
                            <div className={"flex h-full w-1/2 items-center"}>
                                <div className={"flex h-fit flex-col gap-4 rounded-2xl bg-[#1b1d25]/75 px-4 py-4 backdrop-blur-lg backdrop-contrast-75"}>
                                    <Button variant={"ghost"} size={"sm"} className={"w-fit place-self-end font-semibold text-rose-500 hover:bg-rose-600 hover:text-white"} asChild>
                                        <Link to={"/news"}>Lihat semua</Link>
                                    </Button>
                                    {news.map((item) => (
                                        <div key={item.id} className={"rounded p-2 hover:cursor-pointer hover:bg-[#2d303b] transition-all"} onClick={() => navigate(`/news/${item.site.id}`)}>
                                            <div className={"flex h-48 w-[40rem] gap-2 rounded-md"}>
                                                <LazyLoadImage className={"aspect-[3/2] rounded-md"} src={item.image} alt={"news"} />
                                                <div className={"flex flex-col justify-between px-2 py-1"}>
                                                    <div>
                                                        <div className={"w-fit rounded-full bg-rose-600 px-2 py-[1px] font-cera text-sm font-medium"}>{item.site.name}</div>
                                                        <h1 className={"line-clamp-2 font-cera text-xl font-bold"}>{item.title}</h1>
                                                        <p className={"line-clamp-3 text-sm text-gray-300"}>{item.short_description}</p>
                                                    </div>
                                                    <p className={"text-right text-sm text-gray-400"}>{date.format(date.parse(item.date, "YYYY-MM-DDThh:mm:ss"), "dddd, DD MMMM YYYY")}</p>
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
    )
}

export default Index

const donateGroup: { nominal: number; nString: string; formatted: string }[] = [
    { nominal: 10000, nString: "10000", formatted: "Rp. 10.000" },
    { nominal: 20000, nString: "20000", formatted: "Rp. 20.000" },
    { nominal: 50000, nString: "50000", formatted: "Rp. 50.000" },
    { nominal: 75000, nString: "75000", formatted: "Rp. 75.000" },
    { nominal: 100000, nString: "100000", formatted: "Rp. 100.000" },
    { nominal: 150000, nString: "150000", formatted: "Rp. 150.000" },
    { nominal: 200000, nString: "200000", formatted: "Rp. 200.000" },
]
