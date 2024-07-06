import Map, { FullscreenControl, GeolocateControl, MapRef, Marker, NavigationControl, Popup, ScaleControl } from "react-map-gl"
import { useEffect, useMemo, useRef, useState } from "react"
import volcano from "@/assets/volcano.png"
import { LazyLoadImage } from "react-lazy-load-image-component"
import axios from "axios"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Link } from "react-router-dom"
import { CircleAlert } from "lucide-react"

type Mount = {
    name: string
    status: string
    location: string
    latitude: number
    longitude: number
    link: string
    laporan: {
        image: string,
        visual: string
        gempa: string
        rekomendasi: string,
    }
}

type AktivitasResponse = {
    status: string
    description: string
    count: number
    mounts: Mount[]
}

export default function Mapbox() {
    const [items, setItems] = useState<AktivitasResponse[]>([])
    const [popupInfo, setPopupInfo] = useState<Mount>(null)
    const mapRef = useRef<MapRef>()

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/mapbox")
            console.log(response.data.aktivitas)
            setItems(response.data.aktivitas)
        }

        fetchData().finally()
    }, [])

    const markers = useMemo(
        () =>
            items.map((item) =>
                item.mounts.map((mount) => {
                    if (mount.latitude)
                        return (
                            <div>
                                <Marker
                                    key={mount.name}
                                    longitude={mount.longitude}
                                    latitude={mount.latitude}
                                    onClick={(e) => {
                                        e.originalEvent.stopPropagation()
                                        setPopupInfo(mount)
                                        mapRef.current?.flyTo({
                                            center: [mount.longitude, mount.latitude + 0.455],
                                            duration: 3000,
                                            zoom: 8,
                                        })
                                    }}
                                    style={{ cursor: "pointer" }}>
                                    <LazyLoadImage src={volcano} className={"h-12 w-12"} />
                                </Marker>
                            </div>
                        )
                }),
            ),
        [items],
    )

    return (
        <div className={"flex h-screen pt-[74px]"}>
            <div className={"font-varela h-full max-w-80 overflow-y-auto bg-[#0F1014]/75 px-8 py-4 backdrop-blur-2xl backdrop-contrast-50"}>
                {items.map((item) => (
                    <div className={"w-full max-w-80"}>
                        <div className={"flex items-center gap-2 py-1 text-lg font-bold"}>
                            {item.status}
                            <CircleAlert size={20} />
                        </div>
                        <div className={""}>
                            {item.mounts.length === 0 ? (
                                <div className={"p-2 text-gray-500 text-sm"}>Tidak ada gunung api</div>
                            ) : (
                                item.mounts.map((mount) => (
                                    <div
                                        className={"text-sm cursor-pointer rounded bg-transparent p-2 font-medium text-gray-300 hover:bg-[#2d303b]"}
                                        onClick={() => {
                                            setPopupInfo(mount)
                                            mapRef.current?.flyTo({
                                                center: [mount.longitude, mount.latitude + 0.125],
                                                duration: 3000,
                                                zoom: 10,
                                            })
                                        }}>
                                        {mount.name} <span className={" font-normal text-gray-500"}> - {mount.location}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className={"flex-grow"}>
                <Map
                    ref={mapRef}
                    reuseMaps
                    mapboxAccessToken={"pk.eyJ1Ijoibm94aW91c3N0IiwiYSI6ImNseTh1eWk3YjBrMDAybXNhMTQ0eHUxZW0ifQ.MKCw5WqM0SnV9TeU97jYDQ"}
                    initialViewState={{
                        latitude: -3,
                        longitude: 117,
                        zoom: 5,
                    }}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
                    minZoom={1}
                    maxZoom={16}
                    maxBounds={[
                        [90.0, -10.0],
                        [140.0, 10.0],
                    ]}>
                    <GeolocateControl />
                    <FullscreenControl />
                    <NavigationControl />
                    <ScaleControl />

                    {markers.map((mark) => mark)}

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
                                    <CardDescription>{popupInfo.status}</CardDescription>
                                </CardHeader>
                                <CardContent className={"max-w-72 p-2"}>
                                    <div>
                                        <LazyLoadImage src={popupInfo.laporan.image} />
                                        <div className={"grid"}>
                                            <div className={"flex flex-col py-1"}>
                                                <p className={"font-semibold uppercase text-gray-400"}>Visual</p>
                                                <p className={""}>{popupInfo.laporan.visual}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className={"flex justify-end p-2"}>
                                    <Button
                                        type={"button"}
                                        className={"!bg-blue-500 font-semibold transition-all hover:ring-4 focus-visible:!border-none focus-visible:!outline-none focus-visible:!ring-0"}
                                        asChild>
                                        <Link to={`/laporan?url=${popupInfo.link}&point=true`} relative={"path"}>
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                    <input type="hidden" autoFocus={true} />
                                </CardFooter>
                            </Card>
                        </Popup>
                    )}
                </Map>
            </div>
        </div>
    )
}
