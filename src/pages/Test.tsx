"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

export default function Test() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [scale, setScale] = useState([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const snap = emblaApi.scrollSnapList();
        const selectedIndex = emblaApi.selectedScrollSnap();
        const newScale = snap.map((_, index) => {
            return index === selectedIndex ? 1.2 : 1;
        });
        setScale(newScale);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("scroll", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {["Item 1", "Item 2", "Item 3", "Item 4"].map((item, index) => (
                    <div
                        className="embla__slide"
                        key={index}
                        style={{ transform: `scale(${scale[index]})` }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
