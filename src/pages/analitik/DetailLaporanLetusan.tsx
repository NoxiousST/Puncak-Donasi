import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Text, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Map, { MapRef, Marker, Popup } from "react-map-gl"
import volcano from "@/assets/orange.png"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb.tsx"
import { EruptionInformationDetail } from "@/lib/type.ts"
import classNames from "classnames"

export default function DetailLaporanLetsuan() {
    const [item, setItem] = useState<EruptionInformationDetail>()
    const { url } = useQueryParams()

    const [popupInfo, setPopupInfo] = useState<EruptionInformationDetail>(null)
    const mapRef = useRef<MapRef>()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://apipuncak.vercel.app/data-laporan-letusan?url=${url}`)
                console.log(response.request)
                setItem(response.data.data)
                setPopupInfo(response.data.data)
            } catch (error) {
                console.error(error.response.data)
            }
        }

        fetchData().finally()
    }, [url])

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
                            <BreadcrumbLink asChild>
                                <Link to={"/analitik/informasi-letusan"}>Informasi Letusan</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#">Laporan</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className={"font-cera text-5xl font-bold"}>Detail Laporan Letusan</h1>
                <p className={"text-gray-400"}>Informasi dan rekomendasi mengenai erupsi gunung api</p>
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
                                    <Card className={"border-none !bg-transparent font-varela"}>
                                        <CardHeader className={"p-2"}>
                                            <CardTitle className={"text-xl"}>Gunung {popupInfo.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className={"max-w-72 p-2"}>
                                            <div>
                                                <LazyLoadImage src={popupInfo.image} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Popup>
                            )}
                        </Map>
                    </div>
                )}
                <div className="grid gap-6 font-inter">
                    <div className={"grid"}>
                        <div className={"text-xl font-bold"}>Gunung Api {item.title}</div>
                        <div className={"grid gap-1 py-1"}>
                            <p className={"text-sm text-gray-300"}>Laporan {item.date}</p>
                            <p className={"text-sm text-gray-400"}>
                                dibuat oleh <span className={"text-blue-500"}>{item.author}</span>
                            </p>
                        </div>
                    </div>
                    <Card className={"w-[32rem] bg-[#2d303b] font-varela"}>
                        {item.image && (
                            <CardHeader>
                                <CardDescription className={"py-1"}>
                                    <LazyLoadImage src={item.image} className={"rounded-lg"} />
                                </CardDescription>
                            </CardHeader>
                        )}
                        <CardContent
                            className={classNames("flex gap-3", {
                                "pb-0 pt-6": !item.image,
                            })}>
                            <div>
                                <Text size={48} />
                            </div>
                            <div>
                                <h1 className={"text-xl font-semibold"}>Deskripsi</h1>
                                <div className={"text-sm text-gray-300"}>{item.description}</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"w-[32rem] bg-[#2d303b] font-varela"}>
                        <CardContent className={"flex gap-3 pt-6"}>
                            <div>
                                <ShieldAlert size={48} />
                            </div>
                            <div>
                                <h1 className={"text-xl font-semibold"}>Rekomendasi</h1>
                                <ul className={"grid list-decimal gap-2 ps-5 text-sm text-gray-300"}>
                                    {item.rekomendasi.map((it) => (
                                        <li>{it}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
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
