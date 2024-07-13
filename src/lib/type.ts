import { SerializedError } from "@reduxjs/toolkit"

export enum Size {
    Small,
    Medium,
    Large,
}

export interface Intent {
    created: number
    amount: number
    email: string
    note: string
    display: string
}

export interface Payment {
    count: number
    total: number
    intents: Intent[]
}

/* <-- Map Interface --> */
export interface ResponseActivity {
    status: string;
    description: string;
    count: number;
    mounts: Mount[];
}

export interface Mount {
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

/* <-- Tingkat Aktivitas --> */
export interface ActivityLevel {
    status: string
    description: string
    count: number
    mounts: ActivityLevelMounts[]
}

interface ActivityLevelMounts {
    name: string,
    location: string,
    link: string
}

/* <-- Laporan Aktivitas --> */
export interface ActivityReport {
    type: string
    date: string
    children: ActivityReportItem[]
}

interface ActivityReportItem {
    type: string
    time: string
    author: string
    date: string
    status: string
    title: string
    text: string
    url: string
}

export interface ActivityReportDetail {
    level: string
    name: string
    date: string
    time: string
    author: string
    geo: string
    code: string
    laporan: {
        image: string
        visual: string
        klimatologi: string
        gempa: string[]
        rekomendasi: string[]
    }
    latitude?: number
    longitude?: number
}

/* <-- Laporan Harian (Tabel) --> */
export interface DailyReport {
    no: string
    gunung_api: string
    visual: string[]
    kegempaan: string[]
    rekomendasi: string[]
}


/* <-- Informasi Letusan  --> */
export interface EruptionInformation {
    date: string
    children: EruptionInformationItem[]
}

export interface EruptionInformationItem {
    time: string
    author: string
    title: string
    text: string
    image: string
    url: string
}

export interface EruptionInformationDetail {
    image: string,
    title: string,
    date: string,
    author: string,
    description: string,
    rekomendasi: string[],
    latitude?: number,
    longitude?: number
}


