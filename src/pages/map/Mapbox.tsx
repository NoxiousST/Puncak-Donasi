import * as React from "react"
import Map, { Marker } from "react-map-gl"
import supabase from "@/lib/supabase.ts"
import { useEffect, useMemo, useState } from "react"
import { Pin } from "lucide-react"

export default function Mapbox() {
    const [marker, setMarker] = useState([])

    useEffect(() => {
        getNews()
        window.scrollTo(0, 0);
    }, [])

    async function getNews() {
        const { data: udata } = await supabase.from("mountains").select('id, type, name, latitude, longitude, region')
        console.log(udata)
        setMarker(udata)
    }

    const markers = useMemo(() => marker.map(it => (
        <Marker key={it.id}
                longitude={it.longitude}
                latitude={it.latitude}>
            <Pin/>
        </Marker>)
    ), [marker]);

    return (
        <div className={"flex justify-center py-24 aspect-video"}>
            <Map
                mapboxAccessToken="pk.eyJ1Ijoibm94aW91c3N0IiwiYSI6ImNsY3VsbmFnYTA2amczdW83cDEyNW10a3MifQ.MyxSDj1DbhKZ7IvDm76G8w"
                initialViewState={{
                    latitude: -3,
                    longitude: 117,
                    zoom: 5,
                }}
                style={{ width: 1200,aspectRatio:16/9 }}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
            >
                {markers}
            </Map>
        </div>
    )
}
