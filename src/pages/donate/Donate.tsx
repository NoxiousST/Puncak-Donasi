import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"
import { BadgeDollarSign, LoaderCircle } from "lucide-react"

import { useEffect, useState } from "react"
import axios from "axios"

import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import StripeForm from "@/components/StripeForm.tsx"
import logon from "@/assets/logon.png"
import { Link, useLocation } from "react-router-dom"
import { NumericFormat } from "react-number-format"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx"
import { SERVER } from "@/lib/utils.ts"

const initStripe = async () => {
    const res = await axios.get(`https://apipuncak.vercel.app/publishkey`)
    const publishableKey = await res.data.publishable_key
    console.log(publishableKey)
    return loadStripe(publishableKey)
}

export default function Donate() {
    const { state } = useLocation()
    const { name, email, note } = state
    let { amount } = state
    amount *= 100

    const stripePromise = initStripe()
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        console.log("Creating Payment Intent...")
        axios
            .post(`https://apipuncak.vercel.app/create-payment-intent`, { name, email, amount, note })
            .then((res) => setClientSecret(res.data.client_secret))
            .catch((error) => console.log(error.response))
    }, [])

    const appearance: Appearance = {
        theme: "night",
        labels: "above",
        variables: {
            colorPrimary: "#34d399",
            colorBackground: "#262933",
            colorText: "#fff",
            colorDanger: "#fb7185",
            fontFamily: "Inter, sans-serif",
        },
        rules: {
            ".Input": {
                borderWidth: `2px`,
                borderRadius: `.5rem`,
                borderColor: `#374151`,
                boxShadow: `none`,
                margin: `4px 0`,
            },
            ".Input:focus": {
                borderColor: `#10b981`,
                outline: `none`,
            },
            ".Label": {
                textTransform: `capitalize`,
                color: `#9ca3af`,
                fontFamily: `Cera Pro, sans-serif`,
            },
            ".CheckboxInput": {
                borderWidth: `2px`,
                borderRadius: `.3rem`,
                borderColor: `#374151`,
                boxShadow: `none`,
                margin: `4px 0`,
            },
            ".CheckboxLabel": {
                textTransform: `capitalize`,
                color: `#9ca3af`,
                fontFamily: `Cera Pro, sans-serif`,
            },
            ".Error": {
                fontSize: `14px`,
                color: `#fb7185`,
            },
        },
    }
    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
        locale: "id",
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { note },
    })

    return (
        <div className={"relative flex min-h-screen font-cera"}>
            <Link to={"/"} className={"absolute rounded-full m-6"}>
                <Avatar className={"h-9 w-9 bg-slate-100 p-1"}>
                    <AvatarImage src={logon} alt="@shadcn" />
                    <AvatarFallback>DN</AvatarFallback>
                </Avatar>
            </Link>
            <div className={"flex basis-7/12 justify-end bg-[radial-gradient(circle_at_top_left,_#373b46,_#1b1d25)] p-16"}>
                <div className={"flex w-9/12 flex-col"}>
                    <h1 className={"text-3xl font-medium"}>Detail Pembayaran</h1>
                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <StripeForm email={email} />
                        </Elements>
                    ) : (
                        <Button size={"lg"} className={"mx-auto my-12 text-lg"} variant={"ghost"} disabled>
                            <LoaderCircle className="mr-2 animate-spin" />
                            Mohon Tunggu
                        </Button>
                    )}
                </div>
            </div>
            <div className={"basis-6/12 bg-[radial-gradient(circle_at_bottom_right,_#2d303bcc,_#0F1014)] p-16"}>
                <div className={"flex w-2/3 flex-col"}>
                    <h1 className={"text-2xl font-medium"}>Ringkasan Donasi</h1>
                    <div className={"flex items-center gap-2 py-4"}>
                        <div className={"rounded-full bg-green-500 p-1"}>
                            <BadgeDollarSign size={36} strokeWidth={2} />
                        </div>
                        <div className={"grid"}>
                            <div className={"font-medium"}>{name}</div>
                            <div className={"text-sm text-gray-400"}>{email}</div>
                        </div>
                    </div>
                    <Separator className={"my-4 bg-zinc-600"} />
                    <div className={"flex py-2"}>
                        <div className={"flex-grow text-zinc-300"}>Jumlah</div>
                        <NumericFormat
                            className={"font-semibold"}
                            displayType="text"
                            value={amount / 100}
                            decimalSeparator={","}
                            thousandSeparator={"."}
                            prefix={"Rp "}
                            decimalScale={2}
                            fixedDecimalScale
                        />
                    </div>
                    <Form {...form}>
                        <form className={"my-6"}>
                            <FormField
                                control={form.control}
                                name="note"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={"font-medium capitalize text-zinc-400"}>Pesan / Catatan</FormLabel>
                                        <FormControl>
                                            <Textarea className={"max-h-64 bg-[#2d303bcc]"} placeholder="Ketik pesanmu disini." {...field} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const FormSchema = z.object({
    note: z.string(),
})
