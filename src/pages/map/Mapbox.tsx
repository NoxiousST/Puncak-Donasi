import Map, { FullscreenControl, GeolocateControl, MapRef, Marker, NavigationControl, Popup, ScaleControl, Source } from "react-map-gl"
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
    visual: string,
    gempa: string,
    rekomendasi: string
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

        fetchData()
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
            <div className={"h-full max-w-80 overflow-y-auto bg-[#0F1014]/75 px-8 py-4 font-cera backdrop-blur-2xl backdrop-contrast-50"}>
                {items.map((item) => (
                    <div className={"w-full max-w-80"}>
                        <div className={"flex items-center gap-2 py-1 text-xl font-bold"}>
                            {item.status}
                            <CircleAlert />
                        </div>
                        <div className={""}>
                            {item.mounts.length === 0 ? (
                                <div className={"p-2 text-gray-500"}>Tidak ada gunung api</div>
                            ) : (
                                item.mounts.map((mount) => (
                                    <div
                                        className={"cursor-pointer rounded bg-transparent p-2 font-medium text-gray-300 hover:bg-[#2d303b]"}
                                        onClick={() =>
                                            mapRef.current?.flyTo({
                                                center: [mount.longitude, mount.latitude],
                                                duration: 3000,
                                                zoom: 10,
                                            })
                                        }>
                                        {mount.name} <span className={"font-normal text-gray-500"}> - {mount.location}</span>
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
                        [90.0000000, -10.0000000],
                        [140.0000000, 10.0000000],
                    ]}
                    terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}>
                    <GeolocateControl />
                    <FullscreenControl />
                    <NavigationControl />
                    <ScaleControl />

                    <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />

                    {markers.map((mark) => mark)}

                    {popupInfo && (
                        <Popup style={{ maxWidth: "320px", width: "fit-content" }} longitude={Number(popupInfo.longitude)} latitude={Number(popupInfo.latitude)} onClose={() => setPopupInfo(null)}>
                            <Card className={"border-none !bg-transparent"}>
                                <CardHeader className={"p-2"}>
                                    <CardTitle className={"text-xl"}>Gunung {popupInfo.name}</CardTitle>
                                    <CardDescription>{popupInfo.status}</CardDescription>
                                </CardHeader>
                                <CardContent className={"max-w-72 p-2"}>
                                    {popupInfo.visual}
                                </CardContent>
                                <CardFooter className={"p-2"}>
                                    <Button type={"button"}>
                                        <Link to={popupInfo.link} target="_blank" rel="noopener noreferrer">
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Popup>
                    )}
                </Map>
            </div>
        </div>
    )
}
