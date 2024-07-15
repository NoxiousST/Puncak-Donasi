import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx"
import { Link } from "react-router-dom"
import date from "date-and-time"
import id from 'date-and-time/locale/id';
import { DailyReport } from "@/lib/type.ts"


export default function LaporanHarian() {
    const [item, setItem] = useState<DailyReport[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://apipuncak.vercel.app/laporan-harian`)
            console.log(response)
            setItem(response.data.data)
        }

        fetchData()
    }, [])

    const today = new Date()
    date.locale(id)
    const formatToday = date.format(today, "dddd,DD  MMMM YYYY")

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
                            <BreadcrumbLink href="#">Laporan Harian</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Laporan Harian</h1>
                <p className={"text-gray-400"}>Laporan harian tentang informasi terkini mengenai aktivitas gunung api di Indonesia.</p>
            </section>
            <div className={"px-8 py-12"}>
                <Table className={"table-auto"}>
                    <TableCaption className={"-order-1"}>{formatToday}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Gunung Api</TableHead>
                            <TableHead>Visual</TableHead>
                            <TableHead>Kegempaan</TableHead>
                            <TableHead>Rekomendasi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {item.map((it) => (
                            <TableRow key={it.no} className={"content-start"}>
                                <TableCell className={"w-1/12 align-top"}>{it.gunung_api}</TableCell>
                                <TableCell className={"w-3/12 align-top"}>
                                    <ul className={"grid gap-3"}>
                                        {it.visual.map((item) => (
                                            <li>{item}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell className={"w-2/12 align-top"}>
                                    <ul className={"grid list-disc gap-2"}>
                                        {it.kegempaan.map((item) => (
                                            <li>{item}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell className={"w-6/12 align-top"}>
                                    <ul className={"grid list-decimal gap-2"}>
                                        {it.rekomendasi.map((item) => (
                                            <li>{item}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
