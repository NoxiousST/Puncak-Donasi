import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { BarChart3, Cloudy, Fullscreen, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Map, { MapRef, Marker, Popup } from "react-map-gl"
import volcano from "@/assets/orange.png"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx"
import { SERVER } from "@/lib/utils.ts"

interface Laporan {
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

export default function DetailLaporanAktivitas() {
    const [item, setItem] = useState<Laporan>()
    const { url, point } = useQueryParams()

    const [popupInfo, setPopupInfo] = useState<Laporan>(null)
    const mapRef = useRef<MapRef>()

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://apipuncak.vercel.app/data-laporan-aktivitas?url=${url}&point=${point}`)
            console.log(response.data.data)
            setItem(response.data.data)
            setPopupInfo(response.data.data)
        }

        fetchData().catch(console.error)
    }, [url, point])

    if (!item) return

    return (
        <div className={"grid bg-[radial-gradient(circle_at_top,_#2d303bcc,_#0F1014)]"}>
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
                            <BreadcrumbLink href="#">Detail Laporan Aktivitas</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Detail Laporan Aktivitas</h1>
                <p className={"text-gray-400"}>Informasi terstruktur mengenai tingkat aktivitas gunung api</p>
            </section>
            <div className={"flex justify-center gap-20 px-48 py-20"}>
                {item.latitude && (
                    <div className={"sticky top-28 flex-grow self-start rounded-xl bg-transparent"}>
                        <Map
                            ref={mapRef}
                            mapboxAccessToken={"pk.eyJ1Ijoibm94aW91c3N0IiwiYSI6ImNseTh1eWk3YjBrMDAybXNhMTQ0eHUxZW0ifQ.MKCw5WqM0SnV9TeU97jYDQ"}
                            initialViewState={{
                                latitude: item.latitude + 0.0325,
                                longitude: item.longitude,
                                zoom: 12,
                            }}
                            style={{ width: "100%", height: "80vh", borderRadius: "12px" }}
                            mapStyle="mapbox://styles/mapbox/outdoors-v12"
                            minZoom={7}
                            maxZoom={16}
                            terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
                            maxBounds={[
                                [item.longitude - 2, item.latitude - 2],
                                [item.longitude + 2, item.latitude + 2],
                            ]}>
                            <Marker
                                longitude={item.longitude}
                                latitude={item.latitude}
                                onClick={(e) => {
                                    e.originalEvent.stopPropagation()
                                    setPopupInfo(item)
                                    mapRef.current?.flyTo({
                                        center: [item.longitude, item.latitude + 0.0325],
                                        duration: 3000,
                                        zoom: 12,
                                    })
                                }}
                                style={{ cursor: "pointer" }}>
                                <LazyLoadImage src={volcano} className={"h-12 w-12"} />
                            </Marker>

                            {popupInfo && (
                                <Popup
                                    anchor={"bottom"}
                                    style={{ maxWidth: "390px", width: "fit-content", minWidth: "280px" }}
                                    longitude={Number(popupInfo.longitude)}
                                    latitude={Number(popupInfo.latitude)}
                                    onClose={() => setPopupInfo(null)}>
                                    <Card className={"font-varela border-none !bg-transparent"}>
                                        <CardHeader className={"p-2"}>
                                            <CardTitle className={"text-xl"}>Gunung {popupInfo.name}</CardTitle>
                                            <CardDescription>{popupInfo.level}</CardDescription>
                                        </CardHeader>
                                        <CardContent className={"max-w-72 p-2"}>
                                            <div>
                                                <LazyLoadImage src={popupInfo.laporan.image} />
                                                <div className={"grid"}>
                                                    <div className={"flex flex-col py-1"}>
                                                        <p className={"font-semibold uppercase text-gray-400"}>Geografi</p>
                                                        <p className={"text-gray-200"}>{popupInfo.geo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Popup>
                            )}
                        </Map>
                    </div>
                )}
                <div className="font-inter grid gap-6">
                    <div className={"grid"}>
                        <div className={"text-xl font-bold"}>
                            Gunung {item.name}
                            <span className={"ms-2 rounded bg-rose-500 px-2 py-0.5 font-medium"}>{item.level}</span>
                        </div>
                        <div className={"grid gap-1 py-1"}>
                            <p className={"text-sm text-gray-300"}>
                                Laporan {item.date} {item.time}
                            </p>
                            <p className={"text-sm text-gray-400"}>
                                dibuat oleh <span className={"text-blue-500"}>{item.author}</span>
                            </p>
                        </div>
                    </div>
                    <Card className={"font-varela w-[32rem] bg-[#2d303b]"}>
                        <CardHeader>
                            <CardDescription className={"py-1"}>
                                <LazyLoadImage src={item.laporan.image} className={"rounded-lg"} />
                            </CardDescription>
                        </CardHeader>
                        <CardContent className={"flex gap-3"}>
                            <div>
                                <Fullscreen size={48} />
                            </div>
                            <div>
                                <h1 className={"text-xl font-semibold"}>Pengamatan Visual</h1>
                                <div className={"text-sm text-gray-300"}>{item.laporan.visual}</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"font-varela w-[32rem] bg-[#2d303b]"}>
                        <CardContent className={"flex gap-3 pt-6"}>
                            <div>
                                <Cloudy size={48} />
                            </div>
                            <div>
                                <h1 className={"text-xl font-semibold"}>Klimatologi</h1>
                                <div className={"text-sm text-gray-300"}>{item.laporan.klimatologi}</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"font-varela w-[32rem] bg-[#2d303b]"}>
                        <CardContent className={"flex gap-3 pt-6"}>
                            <div>
                                <BarChart3 size={48} />
                            </div>
                            <div>
                                <h1 className={"text-xl font-semibold"}>Pengamatan Kegempaan</h1>
                                <ul className={"grid list-disc gap-2 ps-5 text-sm text-gray-300"}>
                                    {item.laporan.gempa.map((it) => (
                                        <li>{it}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"font-varela w-[32rem] bg-[#2d303b]"}>
                        <CardContent className={"flex gap-3 pt-6"}>
                            <div>
                                <ShieldAlert size={48} />
                            </div>
                            <div>
                                <h1 className={"text-xl font-semibold"}>Rekomendasi</h1>
                                <ul className={"grid list-decimal gap-2 ps-5 text-sm text-gray-300"}>
                                    {item.laporan.rekomendasi.map((it) => (
                                        <li>{it}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className={"w-fit place-self-center mb-16 rounded-lg bg-[#2d303b]/75 p-4"}>
                <LazyLoadImage className={"rounded"}
                               src={`https://magma.vsi.esdm.go.id/img/eqhist/${item.code}.png`} />
            </div>
        </div>
    )
}


function useQueryParams() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const params = { url: "", point: "" }
    for (const param of searchParams) {
        params[param[0]] = param[1]
    }
    return params
}
