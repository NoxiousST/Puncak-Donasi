import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { Payment } from "@/lib/type.ts"
import LoadingScreen from "@/pages/LoadingScreen.tsx"
import { SERVER } from "@/lib/utils.ts"

export const DonationContext = createContext(null)

export const DonationProvider = ({ children }) => {
    const [payment, setPayment] = useState<Payment>()

    useEffect(() => {
        async function getPayment() {
            const response = await axios.get(`https://apipuncak.vercel.app/payments`)
            setPayment(response.data.paymentList)
        }

        getPayment()
    }, [])

    if (!payment) {
        return <LoadingScreen />
    }

    const searchDonations = (username, sorting, order) => {
        let filteredIntents = payment.intents
        filteredIntents = filteredIntents.filter((it) => it.display.toLowerCase().trim().includes(username.toLowerCase().trim()))
        if (sorting === "date") filteredIntents.sort((a, b) => b.created - a.created)
        if (sorting === "amount") filteredIntents.sort((a, b) => b.amount - a.amount)
        if (sorting === "name") filteredIntents.sort((a, b) => a.display.localeCompare(b.display))
        if (order === "ascend") filteredIntents.reverse()
        return filteredIntents
    }

    return <DonationContext.Provider value={{ payment, searchDonations }}>{children}</DonationContext.Provider>
}
