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
}

export interface Payment {
    count: number
    total: number
    intents: Intent[]
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
