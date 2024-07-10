import { Input } from "@/components/ui/input.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Payment } from "@/lib/type.ts"
import { DonorSearch } from "@/components/Donor.tsx"

export default function DonateSearch() {
    const [payment, setPayment] = useState<Payment>({ count: 0, total: 0, intents: undefined })

    useEffect(() => {
        async function getPayment() {
            const response = await axios.get("http://localhost:3000/payments")
            console.log(response)
            setPayment(response.data.paymentList)
        }

        getPayment().finally()
    }, [])

    return (
        <div className={"px flex items-center justify-center bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] py-36"}>
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
                    <p className={"text-gray-300"}>
                        Cari donasi yang diberikan untuk mendukung masyarakat yang terkena dampak letusan gunung berapi di Indonesia. Masukkan detail di bawah untuk menemukan donasi tertentu:
                    </p>
                </div>
                <div className={"flex gap-3"}>
                    <Input placeholder={"Cari donor..."} className={"h-14 rounded-xl bg-[#262933] font-varela text-xl focus-visible:shadow-xl focus-visible:shadow-emerald-500/25"} />
                    <Button size={"icon"} className={"h-14 w-14 shrink-0 rounded-xl bg-emerald-500"}>
                        <Search size={36} strokeWidth={2.8} />
                    </Button>
                </div>
                <div className={"grid gap-6 px-8"}>
                    {payment.intents &&
                        payment.intents.map((it) => (
                            <div>
                                <DonorSearch intent={it} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
