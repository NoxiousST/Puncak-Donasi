export enum Size {
    Small,
    Medium,
    Large,
}

export interface Intent {
    created: number
    amount: number
    email: string
    name: string
    note: string
    display: string
}

export interface Payment {
    count: number
    total: number
    intents: Intent[]
}

export type Mount = {
    name: string
    status: string
    location: string
    latitude: number
    longitude: number
    link: string
    laporan: {
        image: string
        visual: string
        gempa: string
        rekomendasi: string
    }
}

export interface LaporanLetusan {
    image: string,
    title: string,
    date: string,
    author: string,
    description: string,
    rekomendasi: string[],
    latitude?: number,
    longitude?: number
}
