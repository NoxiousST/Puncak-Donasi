import { createContext, useEffect } from "react"
import { Intent } from "@/lib/type.ts"
import LoadingScreen from "@/pages/LoadingScreen.tsx"
import { SERVER } from "@/lib/utils.ts"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store.ts"

import { fetchPayments } from "@/redux/searchSlice.ts"
import { ReduxError } from "@/error.tsx"

export const DonationContext = createContext(null)

export const DonationProvider = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()
    const searchState = useSelector((state: RootState) => state.payments)

    useEffect(() => {
        dispatch(fetchPayments())
    }, [dispatch])

    if (searchState.loading) return <LoadingScreen />
    if (searchState.error) return <ReduxError error={searchState.error} />

    const searchDonations = (username: string, sorting: string, order: string) => {
        if (!searchState.data) return
        const trimmedUsername = username.toLowerCase().trim()
        const filteredIntents = searchState.data.intents.filter((it) => it.display.toLowerCase().trim().includes(trimmedUsername))
        const sortFunctions = {
            date: (a: Intent, b: Intent) => b.created - a.created,
            amount: (a: Intent, b: Intent) => b.amount - a.amount,
            name: (a: Intent, b: Intent) => a.display.localeCompare(b.display),
        }
        if (sortFunctions[sorting]) filteredIntents.sort(sortFunctions[sorting])
        if (order === "ascend") filteredIntents.reverse()
        return filteredIntents
    }

    return <DonationContext.Provider value={{ payment: searchState.data, searchDonations }}>{children}</DonationContext.Provider>
}
