import { Input } from "@/components/ui/input.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { Search } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"

import { DonorSearch } from "@/components/Donor.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { NumericFormat } from "react-number-format"
import { DonationContext } from "@/pages/donate/DonationProvider.tsx"
import { Intent } from "@/lib/type.ts"

const formSchema = z.object({
    username: z.string(),
    sorting: z.string(),
    order: z.string(),
})

export default function DonateSearch() {
    const searchRef = useRef(null);
    const { payment, searchDonations } = useContext(DonationContext);
    const [intents, setIntents] = useState<Intent[]>([]);

    useEffect(() => {
        setIntents(payment.intents); // Set initial data
    }, [payment]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            sorting: "date",
            order: "descend",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        searchRef.current.scrollIntoView({
            behavior: "smooth",
        });

        const results = searchDonations(values.username, values.sorting, values.order);
        setIntents(results);
    };

    return (
        <div className={"relative flex items-center justify-center bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] py-36"}>
            <div className={"absolute top-64 -z-10 blur contrast-150 saturate-150"}>
                <NumericFormat
                    displayType="text"
                    value={payment.total / 100}
                    //prefix={"Rp. "}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    className={"w-full font-montserrat text-[10rem] font-bold tracking-wide text-gray-500"}
                />
            </div>
            <div className={"grid w-[38rem] gap-16"}>
                <div className={"grid gap-4 text-center"}>
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
                                    <Link to={"/pencarian"}>Pencarian</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className={"text-6xl font-bold"}>Cari Donor</h1>
                    <Separator className={"h-[5px] w-2/3 place-self-center rounded-full bg-emerald-500"} />
                    <p ref={searchRef} className={"text-gray-300"}>
                        Cari donasi yang diberikan untuk mendukung masyarakat yang terkena dampak letusan gunung berapi di Indonesia. Masukkan detail di bawah untuk menemukan donasi tertentu:
                    </p>
                </div>
                <div className={"w-full"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-3">
                            <div className={"flex gap-3"}>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className={"flex-grow"}>
                                            <FormControl>
                                                <Input
                                                    placeholder={"Cari donor..."}
                                                    {...field}
                                                    className={"h-14 rounded-xl bg-[#414550]/50 font-varela text-xl backdrop-blur-lg focus-visible:shadow-xl focus-visible:shadow-emerald-500/25"}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button size={"icon"} type={"submit"} className={"h-14 w-14 shrink-0 rounded-xl !bg-emerald-500 ring-emerald-500/40 transition-all hover:ring-4"}>
                                    <Search size={36} strokeWidth={2.8} />
                                </Button>
                            </div>

                            <div className={"ms-auto flex items-center gap-2 font-varela"}>
                                <text className={"text-sm text-gray-400"}>Urutkan :</text>
                                <FormField
                                    control={form.control}
                                    name="sorting"
                                    render={({ field }) => (
                                        <FormItem className={"flex items-center"}>
                                            <Select onValueChange={field.onChange} defaultValue={"date"}>
                                                <FormControl>
                                                    <SelectTrigger className={"min-w-28 bg-transparent"}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className={"bg-[#262933]"}>
                                                    <SelectItem value={"date"}>Tanggal</SelectItem>
                                                    <SelectItem value={"amount"}>Jumlah</SelectItem>
                                                    <SelectItem value={"name"}>Nama</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="order"
                                    render={({ field }) => (
                                        <FormItem className={"flex items-center"}>
                                            <Select onValueChange={field.onChange} defaultValue={"descend"}>
                                                <FormControl>
                                                    <SelectTrigger className={"min-w-28 bg-transparent"}>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className={"bg-[#262933]"}>
                                                    <SelectItem value={"descend"}>Menurun</SelectItem>
                                                    <SelectItem value={"ascend"}>Menaik</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
                <div className={"grid gap-6 px-8"}>
                    {intents &&
                        intents.map((it, index) => (
                            <div key={index}>
                                <DonorSearch intent={it} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
