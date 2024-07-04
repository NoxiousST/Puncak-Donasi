import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"

interface VolcanoReport {
    no: string
    gunung_api: string
    visual: string
    kegempaan: string[]
    rekomendasi: string[]
}

export default function LaporanHarian() {
    const [item, setItem] = useState<VolcanoReport[]>([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/laporan-harian")
            console.log(response)
            setItem(response.data.data)
        }

        fetchData()
    }, [])

    return (
        <div className={"grid gap-8 bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)] px-8 py-28"}>
            <Table className={"table-auto"}>
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
                        <TableRow key={it.no} className={"content-start "}>
                            <TableCell className={"w-1/12 align-top"}>{it.gunung_api}</TableCell>
                            <TableCell className={"w-3/12 align-top"}>{it.visual}</TableCell>
                            <TableCell className={"w-2/12 align-top"}>
                                <ul className={"list-disc grid gap-2"}>
                                    {it.kegempaan.map((item) => (
                                        <li>{item}</li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell className={"w-6/12 align-top" }>
                                <ul className={"list-decimal grid gap-2"}>
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
    )
}
