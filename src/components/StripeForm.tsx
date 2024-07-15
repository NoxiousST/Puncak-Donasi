import React, { useEffect, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { StripePaymentElementOptions } from "@stripe/stripe-js"
import { Label } from "@/components/ui/label.tsx"

export default function StripeForm({ email }:  { email: string }) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")
        if (!clientSecret) return
        if (!stripe) return

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent, error }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break
                default:
                    setMessage(`Something went wrong. ${error?.message}`)
                    break
            }
        })
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!stripe || !elements) return
        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `https://puncakdonasi.vercel.app/donasi/success`,
            },
        })

        if (error.type === "card_error" || error.type === "validation_error") setMessage(error.message!)
        else setMessage("An unexpected error occurred.")

        setIsLoading(false)
    }

    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs",
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className={"py-8"}>
            <Label className={"text-base font-normal capitalize text-gray-400"}>Email</Label>
            <Input
                disabled
                id="email"
                type="text"
                value={email}
                placeholder="Enter email address"
                className={"border-2 border-gray-700 bg-gray-600 ring-offset-0 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"}
            />
            <div className={"box-border"}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
            </div>

            <div className={"my-2 grid gap-2"}>
                <p className={"pt-4 text-sm text-gray-400"}>Dengan mengklik Checkout, Anda menyetujui Ketentuan Penggunaan dan Kebijakan Privasi Puncak.</p>
                <Button disabled={isLoading || !stripe || !elements} id="submit" size={"lg"} className={"w-full bg-emerald-500 text-lg hover:bg-emerald-600 disabled:bg-gray-400 disabled:text-white"}>
                    Checkout
                </Button>
            </div>

            {/* Show any error or success messages */}
            {message && (
                <div id="payment-message" className={"text-sm text-rose-400"}>
                    {message}
                </div>
            )}
        </form>
    )
}
