import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { BadgeDollarSign, CheckCheck, Pencil } from "lucide-react"
import { useState } from "react"
import AnimateHeight, { Height } from "react-animate-height"
import { Separator } from "@/components/ui/separator.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { NumericFormat } from "react-number-format"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import mountVector from "@/assets/MountVector.svg"
import { LazyLoadImage } from "react-lazy-load-image-component"

const FormSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({
        message: "Email tidak valid!",
    }),
    amount: z.number().gt(7000, {
        message: "Nominal donasi harus lebih dari Rp 7.000",
    }),
    note: z.string(),
})

export default function DonateCheck() {
    const { state } = useLocation()
    const { email, amount } = state

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email,
            amount,
            note: "",
        },
    })

    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState(email)
    const [newAmount, setNewAmount] = useState(amount)

    const navigate = useNavigate()

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!data.name) data.name = newName
        navigate("/donasi/checkout", { state: data })
    }

    function handleReset() {
        setNewName("")
        setNewEmail(email)
        setNewAmount(amount)
    }

    const [height, setHeight] = useState<Height>("auto")

    return (
        <div className={"relative flex h-screen w-full items-center justify-evenly bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)]"}>
            <div className={"z-10"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className={"z-10 w-[32rem] rounded-xl bg-[#414550]/45 font-cera shadow-lg drop-shadow-lg backdrop-blur-2xl backdrop-saturate-100"}>
                            <CardHeader>
                                <CardTitle className={"flex items-center"}>
                                    <div className={"flex-grow"}>Ringkasan Donasi</div>
                                    <Button
                                        type={"button"}
                                        className={"rof h-8 w-8 !bg-emerald-500 bg-transparent text-white ring-emerald-500/40 transition-all hover:ring-4"}
                                        size={"icon"}
                                        onClick={() => {
                                            if (newName.trim().length === 0) setNewName("Anonymous")
                                            setHeight(height === 0 ? "auto" : 0)
                                        }}>
                                        {height === 0 ? <Pencil size={20} /> : <CheckCheck size={20} />}
                                    </Button>
                                </CardTitle>
                                <CardDescription>Periksa kembali donasi anda sebelum melanjutkan.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className={"grid gap-4"}>
                                    <div className={"flex items-center gap-2"}>
                                        {height !== 0 ? (
                                            <Skeleton className="size-11 rounded-full bg-gray-700" />
                                        ) : (
                                            <div className={"rounded-full bg-green-500 p-1"}>
                                                <BadgeDollarSign size={36} strokeWidth={2} />
                                            </div>
                                        )}
                                        <div className={"grid flex-grow gap-1"}>
                                            {height !== 0 ? <Skeleton className="my-0.5 h-4 w-28 bg-gray-700" /> : <div className={"font-medium"}>{newName}</div>}
                                            {height !== 0 ? <Skeleton className="my-0.5 h-4 w-48 bg-gray-700" /> : <div className={"text-sm text-gray-400"}>{newEmail}</div>}
                                        </div>
                                        {height !== 0 ? (
                                            <Skeleton className="h-6 w-36 bg-gray-700" />
                                        ) : (
                                            <NumericFormat
                                                className={"font-semibold"}
                                                displayType="text"
                                                value={newAmount}
                                                decimalSeparator={","}
                                                thousandSeparator={"."}
                                                prefix={"Rp "}
                                                decimalScale={2}
                                                fixedDecimalScale
                                            />
                                        )}
                                    </div>
                                    <AnimateHeight className={"gap-4 ease-in-out"} duration={400} height={height}>
                                        <div className={"my-2 flex flex-col gap-2"}>
                                            <div className={"grid grid-cols-2 gap-4"}>
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={"font-medium capitalize text-zinc-400"}>Nama</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Anonymous"
                                                                    name={field.name}
                                                                    value={field.value}
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.value)
                                                                        setNewName(e.target.value)
                                                                    }}
                                                                    className={"bg-[#1e1f25]/60"}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={"font-medium capitalize text-zinc-400"}>Email</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="example@gmail.com"
                                                                    name={field.name}
                                                                    value={field.value}
                                                                    className={"bg-[#1e1f25]/60"}
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.value)
                                                                        setNewEmail(e.target.value)
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                name={"amount"}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={"font-medium capitalize text-zinc-400"}>Jumlah</FormLabel>
                                                        <FormControl>
                                                            <NumericFormat
                                                                placeholder="0,00"
                                                                defaultValue={newAmount}
                                                                name={field.name}
                                                                value={field.value}
                                                                onValueChange={(v) => {
                                                                    field.onChange(Number(v.value))
                                                                    setNewAmount(v.value)
                                                                }}
                                                                decimalSeparator={","}
                                                                thousandSeparator={"."}
                                                                prefix={"Rp "}
                                                                className={
                                                                    "flex h-12 w-full rounded-xl border bg-[#1e1f25]/60 px-3 py-2 text-sm font-semibold ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Separator className={"mt-4 w-full bg-gray-600"} />
                                        </div>
                                    </AnimateHeight>
                                    <FormField
                                        control={form.control}
                                        name="note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={"font-medium capitalize text-zinc-400"}>Tambahkan pesan (opsional)</FormLabel>
                                                <FormControl>
                                                    <Textarea className={"max-h-48 bg-[#1e1f25]/60 focus-visible:ring-emerald-500"} placeholder="Ketik pesanmu disini." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type={"button"} className={"!bg-rose-500 font-semibold ring-rose-500/40 transition-all hover:ring-4"} onClick={handleReset}>
                                    Reset
                                </Button>
                                <Button type="submit" disabled={height !== 0} className={"flex gap-2 bg-blue-500 font-semibold transition-all hover:bg-blue-500 hover:ring-4 disabled:bg-gray-500"}>
                                    Lanjutkan
                                    <NumericFormat className={"font-semibold"} displayType="text" value={newAmount} decimalSeparator={","} thousandSeparator={"."} prefix={"Rp "} fixedDecimalScale />
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
            <LazyLoadImage className={"absolute bottom-0 z-0 -scale-x-100 p-24 opacity-10 blur contrast-200 saturate-0"} src={mountVector} />
        </div>
    )
}
