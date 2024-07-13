import { NumericFormat } from "react-number-format"
import date from "date-and-time"
import { ICDonate } from "@/components/Icons.tsx"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx"
import { useCallback, useEffect, useRef, useState } from "react"
import { Intent, Payment, Size } from "@/lib/type.ts"
import { cn } from "@/lib/utils.ts"
import classNames from "classnames"
import en from "date-and-time/locale/en"
import { Skeleton } from "@/components/ui/skeleton.tsx"


export default function Donor({ intent, className, size }: { intent: Intent; className?: string; size?: Size }) {
    let sz = size
    if (!size) sz = Size.Medium

    date.locale(en)
    const d = new Date(intent.created * 1000)
    const created = date.format(d, "DD/MM/YYYY, HH:mm:ss A")
    return (
        <div className={cn("flex items-center gap-2 rounded-lg bg-[#414550]/15 p-3 shadow-md backdrop-blur-sm backdrop-saturate-100", className)}>
            <ICDonate amount={intent.amount / 100} className={"w-11"} />
            <div className={classNames("font-semibold text-gray-300 w-full line-clamp-1", {
                    "text-sm": sz === Size.Small,
                    "text-base": sz === Size.Medium,
                    "text-lg": sz === Size.Large,
                })}>
                {intent.display}
            </div>
            <div className={"w-full text-end"}>
                <NumericFormat
                    displayType="text"
                    value={intent.amount / 100}
                    prefix={"Rp. "}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    className={classNames("w-full text-end font-montserrat font-bold tracking-wide text-emerald-400", {
                        "text-base": size === Size.Small,
                        "text-lg": size === Size.Medium,
                        "text-xl": size === Size.Large,
                    })}
                />
                <div className={"text-[10px] text-gray-400"}>{created}</div>
            </div>
        </div>
    )
}

export function DonorSearch({ intent, className }: { intent: Intent; className?: string}) {
    const d = new Date(intent.created * 1000)
    const created = date.format(d, "DD/MM/YYYY, HH:mm:ss A")
    return (
        <div className={cn("flex items-center gap-2 rounded-xl bg-[#414550]/25 p-3 shadow-md backdrop-blur-sm backdrop-saturate-100", className)}>
            <ICDonate amount={intent.amount / 100} className={"w-16"} />
            <div className={"flex w-full flex-col justify-center"}>
                <p className={"line-clamp-1 w-full text-xl font-semibold text-gray-300"}>{intent.display}</p>
                {intent.note && <article className={"line-clamp-2 prose prose-sm p-0 text-left text-gray-400"}>{intent.note.trim()}</article>}
            </div>

            <div className={"w-full text-end"}>
                <NumericFormat
                    displayType="text"
                    value={intent.amount / 100}
                    prefix={"Rp. "}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    className={"w-full text-end font-cera text-2xl font-bold tracking-wide text-emerald-400"}
                />
                <div className={"text-[11px] text-gray-400"}>{created}</div>
            </div>
        </div>
    )
}

export function DonorCarousel({ payment, className }: { payment: Payment; className?: string }) {
    const TWEEN_FACTOR_BASE = 0.28
    const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)

    const [emblaApi, setApi] = useState<CarouselApi>()
    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])

    const setTweenNodes = useCallback((api: CarouselApi): void => {
        tweenNodes.current = api.slideNodes().map((slideNode) => {
            return slideNode.querySelector(".embla__slide__number") as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((api: CarouselApi) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
    }, [])

    const tweenScale = useCallback((api: CarouselApi, eventName?: string) => {
        const engine = api.internalEngine()
        const scrollProgress = api.scrollProgress()
        const slidesInView = api.slidesInView()
        const isScrollEvent = eventName === "scroll"

        api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress
            const slidesInSnap = engine.slideRegistry[snapIndex]

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target()

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target)

                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress)
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress)
                            }
                        }
                    })
                }

                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
                const scale = numberWithinRange(tweenValue, 0, 1).toString()
                const opacity = numberWithinRange(tweenValue, 0, 1).toString()
                const tweenNode = tweenNodes.current[slideIndex]
                tweenNode.style.transform = `scale(${scale})`
                api.slideNodes()[slideIndex].style.opacity = opacity
            })
        })
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenScale(emblaApi)

        emblaApi.on("reInit", setTweenNodes).on("reInit", setTweenFactor).on("reInit", tweenScale).on("scroll", tweenScale).on("slideFocus", tweenScale)
    }, [emblaApi, tweenScale])

    return (
        <Carousel
            opts={{
                loop: true,
            }}
            className={cn("embla embla__viewport w-full max-w-[24rem] ease-in-out select-none", className)}
            plugins={[
                Autoplay({
                    delay: 2400,
                    stopOnInteraction: false,
                }),
            ]}
            setApi={setApi}
            orientation={"vertical"}>
            <CarouselContent className={"h-[600px] embla__container"}>
                {
                    payment ? (
                    duplicateArray(payment.intents).map((it: Intent, index) => (
                    <CarouselItem key={index} className={"h-fit basis-[14%] !p-0 opacity-75 data-[state=is-snapped]:opacity-100"}>
                        <Donor intent={it} className={"embla__slide__number"} size={Size.Large} />
                    </CarouselItem>
                ))): (
                        Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem key={index} className={"h-fit basis-[14%] !p-0 opacity-75 data-[state=is-snapped]:opacity-100"}>
                                <Skeleton className={"embla__slide__number flex h-14 items-center gap-2 px-3"}>
                                    <Skeleton className={"h-11 w-11 shrink-0 rounded-full bg-[#3c4154]"} />
                                    <Skeleton className={"h-6 w-28 shrink-0 bg-[#3c4154]"} />
                                    <div className={"flex w-full flex-col items-end gap-2"}>
                                        <Skeleton className={"h-5 w-28 bg-[#3c4154]"} />
                                        <Skeleton className={"h-2 w-28 bg-[#3c4154]"} />
                                    </div>
                                </Skeleton>
                            </CarouselItem>
                        ))
                    )
                }
            </CarouselContent>
        </Carousel>
    )
}

function duplicateArray(array: object[]) {
    const resultArray = [...array]

    while (resultArray.length <= 10) {
        resultArray.push(...array)
    }

    return resultArray
}
