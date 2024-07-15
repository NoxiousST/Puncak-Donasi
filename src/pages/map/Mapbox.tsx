import React, { useEffect, useMemo, useRef, useState } from "react"
import Map, { FullscreenControl, GeolocateControl, MapRef, Marker, NavigationControl, Popup, ScaleControl, Source } from "react-map-gl"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { CircleAlert } from "lucide-react"
import { fetchLaporan } from "@/redux/laporanSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import outdoors from "@/assets/outdoors.png"
import satelite from "@/assets/satelite.png"
import red from "@/assets/red.png"
import orange from "@/assets/orange.png"
import yellow from "@/assets/yellow.png"
import green from "@/assets/green.png"
import { Mount } from "@/lib/type.ts"
import Error, { ReduxError } from "@/error.tsx"
import LoadingScreen from "@/pages/LoadingScreen.tsx"
import { SerializedError } from "@reduxjs/toolkit"

const Mapbox: React.FC = () => {
    const mapRef = useRef<MapRef | null>(null)
    const [mapStyle, setMapStyle] = useState("outdoors-v12")
    const [popupInfo, setPopupInfo] = useState<Mount | null>(null)
    const [hoverInfo, setHoverInfo] = useState<Mount | null>(null)

    const dispatch = useDispatch<AppDispatch>()
    const laporanState = useSelector((state: RootState) => state.laporan)

    useEffect(() => {
        dispatch(fetchLaporan())
    }, [dispatch])

    const handleMarkerClick = (mount: Mount) => (e: unknown) => {
        // @ts-expect-error MarkerEvent
        e.originalEvent?.stopPropagation()
        setPopupInfo(mount)
        mapRef.current?.flyTo({
            center: [mount.longitude, mount.latitude + 0.455],
            duration: 3000,
            zoom: 8,
        })
    }

    const handleMarkerEnter = (mount: Mount) => (e: unknown) => {
        // @ts-expect-error MarkerEvent
        e.originalEvent?.stopPropagation()
        setHoverInfo(mount)
    }

    const handlePopupClose = () => setPopupInfo(null)

    const markers = useMemo(
        () =>
            laporanState.data?.flatMap((item) => {
                const statusMap = {
                    "Level IV (Awas)": { color: red, zIndex: 10 },
                    "Level III (Siaga)": { color: orange, zIndex: 8 },
                    "Level II (Waspada)": { color: yellow, zIndex: 4 },
                }
                const defaultStatus = { color: green, zIndex: 0 }
                const { color: volcanos, zIndex: z } = statusMap[item.status] || defaultStatus
                return item.mounts.map(
                    (mount) =>
                        mount.latitude && (
                            <Marker
                                key={mount.name}
                                longitude={mount.longitude}
                                latitude={mount.latitude}
                                onClick={handleMarkerClick(mount)}
                                style={{ cursor: "pointer", zIndex: z }}>
                                <LazyLoadImage
                                    onMouseEnter={handleMarkerEnter(mount)}
                                    onMouseLeave={handleMarkerEnter(null)}
                                    src={volcanos}
                                    className="h-12 w-12" />
                            </Marker>
                        ),
                )
            }) || [],
        [laporanState.data],
    )

    if (!laporanState.data) {
        if (laporanState.loading) {
            return <LoadingScreen/>
        }

        if (laporanState.error) {
            return  <ReduxError error={laporanState.error}/>
        }
    }

    return (
        <div className="flex h-screen pt-[74px]">
            <div className="h-full max-w-80 overflow-y-auto bg-[#0F1014]/75 px-8 py-4 font-varela backdrop-blur-2xl backdrop-contrast-50">
                {laporanState.data?.map((item) => (
                    <div key={item.status} className="w-full max-w-80">
                        <div className="flex items-center gap-2 py-1 text-lg font-bold">
                            {item.status}
                            <CircleAlert size={20} />
                        </div>
                        <div>
                            {item.mounts.length === 0 ? (
                                <div className="p-2 text-sm text-gray-500">Tidak ada gunung api</div>
                            ) : (
                                item.mounts.map((mount) => (
                                    <div
                                        key={mount.name}
                                        className="cursor-pointer rounded bg-transparent p-2 text-sm font-medium text-gray-300 hover:bg-[#2d303b]"
                                        onClick={() => {
                                            setPopupInfo(mount)
                                            mapRef.current?.flyTo({
                                                center: [mount.longitude, mount.latitude + 0.125],
                                                duration: 3000,
                                                zoom: 10,
                                            })
                                        }}>
                                        {mount.name} <span className="font-normal text-gray-500"> - {mount.location}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-grow">
                <Map
                    ref={mapRef}
                    reuseMaps
                    styleDiffing
                    mapboxAccessToken={"pk.eyJ1Ijoibm94aW91c3N0IiwiYSI6ImNsY3VsbmFnYTA2amczdW83cDEyNW10a3MifQ.MyxSDj1DbhKZ7IvDm76G8w"}
                    initialViewState={{
                        latitude: -3,
                        longitude: 117,
                        zoom: 5,
                    }}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
                    minZoom={1}
                    maxZoom={16}
                    maxBounds={[
                        [85.02360264078544, -15.026506873645772],
                        [145.01631002070235, 10.04864857868158],
                    ]}
                    maxPitch={75}
                    terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}>
                    <GeolocateControl />
                    <FullscreenControl />
                    <NavigationControl />
                    <ScaleControl />
                    <Source id="mapbox-dem" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={512} maxzoom={14} />
                    {markers.map((marker) => marker)}

                    {popupInfo && (
                        <Popup
                            anchor="bottom"
                            style={{ maxWidth: "390px", width: "fit-content", minWidth: "280px", zIndex: 10 }}
                            longitude={popupInfo.longitude}
                            latitude={popupInfo.latitude}
                            onClose={handlePopupClose}>
                            <Card className="border-none !bg-transparent font-varela">
                                <CardHeader className="p-2">
                                    <CardTitle className="text-xl">Gunung {popupInfo.name}</CardTitle>
                                    <CardDescription>{popupInfo.status}</CardDescription>
                                </CardHeader>
                                <CardContent className="max-w-72 p-2">
                                    <LazyLoadImage src={popupInfo.laporan.image} />
                                    <div className="grid">
                                        <div className="flex flex-col py-1">
                                            <p className="font-semibold uppercase text-gray-400">Visual</p>
                                            <p>{popupInfo.laporan.visual}</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end p-2">
                                    <Button
                                        type="button"
                                        className="!bg-blue-500 font-semibold transition-all hover:ring-4 focus-visible:!border-none focus-visible:!outline-none focus-visible:!ring-0"
                                        asChild>
                                        <Link to={`laporan-aktivitas/laporan?url=${popupInfo.link}`} relative="path">
                                            Lihat Detail
                                        </Link>
                                    </Button>
                                    <input type="hidden" autoFocus />
                                </CardFooter>
                            </Card>
                        </Popup>
                    )}

                    {hoverInfo && !popupInfo && (
                        <Popup
                            anchor="bottom"
                            style={{ maxWidth: "390px", width: "fit-content", minWidth: "200px", zIndex: 10 }}
                            longitude={hoverInfo.longitude}
                            latitude={hoverInfo.latitude}
                            onClose={handlePopupClose}>
                            <Card className="border-none !bg-transparent font-varela">
                                <CardHeader className="!p-0">
                                    <CardTitle className="text-center text-sm">Gunung {hoverInfo.name}</CardTitle>
                                </CardHeader>
                                <input type="hidden" autoFocus />
                            </Card>
                        </Popup>
                    )}
                    <div className={"absolute top-0 z-50 m-3 aspect-square rounded-lg bg-gray-200 p-1"}>
                        <LazyLoadImage
                            onClick={() => (mapStyle === "outdoors-v12" ? setMapStyle("satellite-v9") : setMapStyle("outdoors-v12"))}
                            className={"h-full w-24 cursor-pointer rounded-lg object-cover"}
                            src={mapStyle === "outdoors-v12" ? satelite : outdoors}
                        />
                    </div>
                </Map>
            </div>
        </div>
    )
}

export default Mapbox
