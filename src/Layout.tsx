import { Link, Outlet } from "react-router-dom"
import { Menu, Map, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { HashLink } from "react-router-hash-link"

import { LazyLoadImage } from "react-lazy-load-image-component"

import logon from "@/assets/logon.png"

function App() {


    return (
        <div className={"overflow-x-clip"}>
            <ScrollToTop />
            {/* Navigation */}
            <nav
                className="fixed z-[99999] flex w-full items-center justify-between bg-[#1b1d25]/75 px-6 backdrop-blur-2xl sm:py-4 lg:px-40">
                <Link to={"/"}>
                    <div className="flex items-center gap-2 pe-8 text-white">
                        <div className={"flex rounded-full bg-slate-100 p-1"}>
                            <LazyLoadImage className={"w-5"} src={logon} />
                        </div>
                        <span className="font-logo text-2xl font-bold">Puncak</span>
                    </div>
                </Link>
                <div className="hidden w-auto md:flex md:items-center">
                    <Navigation />
                </div>
                <Button
                    variant={"outline"}
                    size={"lg"}
                    className={
                        "hidden rounded-full border-2 border-rose-500 bg-transparent font-cera text-lg !text-white shadow-lg transition-all hover:bg-rose-500 hover:shadow-rose-500/50 md:block"
                    }>
                    Join Us
                </Button>

                <div className="flex grow justify-end md:hidden">
                    <MobileNavbar />
                </div>
            </nav>

            <Outlet />

            <section className={"flex bg-[radial-gradient(circle_at_top,_#1b1d25,_#0F1014)] text-white"}>
                <div className={"mx-auto w-10/12"}>
                    <div
                        className={"mt-12 flex w-full flex-col items-center justify-center gap-4 border-b-2 border-gray-800 py-12"}>
                        <div className={"flex rounded-full bg-slate-100 p-1.5"}>
                            <LazyLoadImage className={"w-10"} src={logon} />
                        </div>
                        <h1 className={"font-logo text-4xl font-bold"}>Puncak</h1>
                    </div>
                    <footer className={"items-center"}>
                        <div className={"flex justify-center gap-4 px-8 py-16"}>
                            <FooterItem footer={footerData.at(0)} />
                            <FooterItem footer={footerData.at(1)} />
                            <FooterItem footer={footerData.at(2)} />
                            <FooterItem footer={footerData.at(3)} target="_blank" rel="noopener noreferrer" />
                            <div className={"w-96"}>
                                <h1 className={"mb-7 font-montserrat text-2xl font-semibold"}> Join Our Newsletter</h1>
                                <div className={"relative"}>
                                    <Input type="email" name="email" className="rounded-full bg-white !ring-rose-500"
                                           placeholder="Masukkan email Anda" />
                                    <Button type="button" size={"icon"}
                                            className="group absolute right-0.5 top-1/2 flex -translate-y-1/2 rounded-full bg-rose-500 hover:bg-rose-600">
                                        <ArrowRight />
                                    </Button>
                                </div>
                                <div className={"text-wrap p-2 text-sm text-gray-500"}>* Kami akan mengirimkan Anda
                                    pembaruan mingguan melalui email.
                                </div>
                            </div>
                        </div>
                        <div className={"mx-auto mt-8 flex items-center justify-between py-6"}>
                            <div className={"text-lg text-gray-500"}>2024. All Rights Reserved</div>
                            <div className={"flex gap-8"}>
                                <ICTwitter />
                                <ICFacebook />
                                <ICInstagram />
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
        </div>
    )
}

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"
import ScrollToTop from "@/lib/scrollToTop.tsx"
import { Input } from "@/components/ui/input.tsx"
import { ICFacebook, ICInstagram, ICTwitter } from "@/components/Icons.tsx"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx"
import { Accordion, AccordionContent, AccordionTrigger } from "./components/ui/accordion"
import { AccordionItem } from "@/components/ui/accordion.tsx"

function Navigation() {
    return (
        <NavigationMenu className={"font-cera"}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={"bg-transparent hover:border-gray-500"}>Paltform</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[linear-gradient(to_bottom,#2d303b,#0000,#2d303b)] hover:bg-[bottom_center] bg-[auto_200%] transition-all duration-500  p-6 no-underline outline-none focus:shadow-md"
                                        href="/">
                                        <Home className="h-6 w-6 stroke-rose-500" />
                                        <div className="mb-2 mt-4 text-lg font-medium">home/beranda</div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Pusat informasi dan donasi untuk memberikan bantuan kepada korban letusan gunung di Indonesia.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="tentang-kami" title="Tentang Kami">
                                Pelajari bagaimana kami mendukung masyarakat Indonesia yang terkena dampak letusan
                                gunung berapi.
                            </ListItem>
                            <LinkSection href="/#donate-section" title="Donasi">
                                Bergabunglah dengan Kami dalam Membuat Perbedaan!
                            </LinkSection>
                            <ListItem href="pencarian" title="Pencarian">
                                Temukan dan jelajahi donasi bencana letusan gunung berapi di Indonesia.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={"bg-transparent"}>Analitik</NavigationMenuTrigger>
                    <NavigationMenuContent className={""}>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                            <li className="row-span-2">
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={"analitik"}
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-[linear-gradient(to_bottom,#2d303b,#0000,#2d303b)] hover:bg-[bottom_center] bg-[auto_200%] transition-all duration-500 p-6 outline-none focus:shadow-md">
                                        <Map className="h-6 w-6 stroke-rose-500" />
                                        <div className="mb-2 mt-3 text-lg font-medium">Peta Interaktif</div>
                                        <p className="text-sm leading-tight text-muted-foreground">Representasi data
                                            geografis berbasis web yang dinamis tentang gunung berapi di Indonesia.</p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="analitik/tingkat-aktivitas" title="Tingkat Aktivitas">
                                Informasi terstruktur mengenai tingkat aktivitas gunung api
                            </ListItem>
                            <ListItem href="analitik/laporan-aktivitas" title="Laporan Aktivitas">
                                Laporan terbaru mengenai status dan aktivitas terkini dari berbagai gunung api di
                                Indonesia.
                            </ListItem>
                            <ListItem href="analitik/laporan-harian" title="Laporan Harian">
                                Laporan harian tentang informasi terkini mengenai aktivitas gunung api di Indonesia.
                            </ListItem>
                            <ListItem href="analitik/informasi-letusan" title="Informasi Letusan ">
                                Daftar letusan gunung api yang terbaru, lengkap dengan tanggal dan waktu kejadian.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="news">
                        <NavigationMenuLink
                            className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-[#2d303b]")}>Berita &
                            Informasi</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({
                                                                                                   className,
                                                                                                   title,
                                                                                                   children,
                                                                                                   ...props
                                                                                               }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={props.href}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2d303bcc] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})

const LinkSection = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({
                                                                                                      className,
                                                                                                      title,
                                                                                                      children,
                                                                                                      ...props
                                                                                                  }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <HashLink
                    to={props.href}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2d303bcc] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </HashLink>
            </NavigationMenuLink>
        </li>
    )
})

ListItem.displayName = "ListItem"

function MobileNavbar() {
    const [isOpen, setOpen] = useState(false)

    const handleSheet = () => {
        setOpen(!isOpen)
    }

    return (
        <Sheet onOpenChange={handleSheet} open={isOpen}>
            <SheetTrigger asChild>
                <Button variant={"ghost"} onClick={handleSheet}
                        className="flex bg-transparent p-2.5 hover:bg-transparent">
                    <Menu size={24} className={"text-white"} />
                </Button>
            </SheetTrigger>
            <SheetContent side={"top"} className={"bg-[#1b1d25] h-full py-24 md:!hidden"}>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is it accessible?</AccordionTrigger>
                        <AccordionContent className={"grid"}>
                            <Button variant={"link"} className={"text-left justify-start"} onClick={handleSheet} asChild>
                                <Link to="tentang-kami">
                                    Tentang Kami
                                </Link>
                            </Button>
                            <Button variant={"link"}  className={"text-left justify-start"} asChild>
                                <HashLink to="/#donate-section">
                                    Donasi
                                </HashLink>
                            </Button>
                            <Button variant={"link"}  className={"text-left justify-start"} asChild>
                                <Link to="pencarian">
                                    Pencarian
                                </Link>
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it styled?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It comes with default styles that matches the other
                            components&apos; aesthetic.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is it animated?</AccordionTrigger>
                        <AccordionContent>
                            Yes. It&apos;s animated by default, but you can disable it if you
                            prefer.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </SheetContent>
        </Sheet>
    )
}

interface FooterGroupProps {
    footer: FooterGroup

    [key: string]: any
}

interface FooterGroup {
    title: string
    list: FooterItem[]
}

interface FooterItem {
    item: string
    link: string
}

function FooterItem({ footer, ...props }: FooterGroupProps) {
    return (
        <div className={"flex flex-col gap-6 font-montserrat"}>
            <h1 className={"text-2xl font-semibold"}>{footer.title}</h1>
            <div className={"flex w-56 flex-col"}>
                {footer.list.map((foot) => (
                    <Button variant={"link"} className={"h-fit w-fit px-0 text-gray-400 hover:text-gray-100"}>
                        <Link to={foot.link} {...props}>
                            {foot.item}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}

const footerData: FooterGroup[] = [
    {
        title: "Platform",
        list: [
            {
                item: "Landing",
                link: "/"
            },
            {
                item: "Donasi",
                link: "donasi"
            },
            {
                item: "Berita & Informasi",
                link: "news"
            },
            {
                item: "Laporan Harian",
                link: "laporan-harian"
            },
            {
                item: "Informasi Letusan",
                link: "informasi-letusan"
            }
        ]
    },
    {
        title: "Analitik",
        list: [
            {
                item: "Peta Interaktif",
                link: "map"
            },
            {
                item: "Tingkat Aktivitas",
                link: "tingkat-aktivitas"
            },
            {
                item: "Laporan Aktivitas",
                link: "laporan-aktivitas"
            },
            {
                item: "Laporan Harian",
                link: "laporan-harian"
            },
            {
                item: "Informasi Letusan",
                link: "informasi-letusan"
            }
        ]
    },
    {
        title: "Dukungan",
        list: [
            {
                item: "Hubungi Kami?",
                link: "#"
            },
            {
                item: "FAQs???",
                link: "#"
            },
            {
                item: "Tentang Kami",
                link: "tentang-kami"
            },
            {
                item: "Kebijakan Pribadi?",
                link: "#"
            },
            {
                item: "Persyaratan Layanan?",
                link: "#"
            }
        ]
    },
    {
        title: "Komunitas",
        list: [
            {
                item: "Github",
                link: "https://github.com/NoxiousST/Puncak-Donasi"
            },
            {
                item: "Discord",
                link: "https://discord.com/download"
            },
            {
                item: "Twitter",
                link: "https://x.com/home"
            },
            {
                item: "YouTube",
                link: "https://www.youtube.com/"
            }
        ]
    }
]

export default App
