import { Link, Outlet } from "react-router-dom"
import { Menu, Terminal, Map } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"

import { LazyLoadImage } from "react-lazy-load-image-component"

import logon from "@/assets/logon.png"

function App() {
    return (
        <div className={"overflow-x-clip"}>
            {/* Navigation */}
            <nav className="fixed z-50 flex w-full flex-wrap items-center justify-around bg-[#0F1014]/75 px-6 backdrop-blur-2xl backdrop-contrast-50 sm:py-4 lg:px-40">
                <Link to={"/"}>
                    <div className="flex items-center gap-2 pe-8 text-white">
                        <div className={"flex rounded-full bg-slate-100 p-1"}>
                            <LazyLoadImage className={"w-5"} src={logon} />
                        </div>
                        <span className="font-logo text-2xl font-bold">Puncak</span>
                    </div>
                </Link>
                <div className="hidden w-auto px-24 md:flex md:items-center">
                    <NavigationMenuDemo />
                </div>
                <div>
                    <Button
                        variant={"outline"}
                        size={"lg"}
                        className={
                            "hidden rounded-full border-2 border-rose-500 bg-transparent font-cera text-lg !text-white shadow-lg transition-all hover:bg-rose-500 hover:shadow-rose-500/50 md:block"
                        }>
                        Join Us
                    </Button>
                </div>
                <div className="flex grow justify-end md:hidden">
                    <Button variant={"ghost"} className="flex bg-transparent p-2.5 hover:bg-transparent">
                        <Menu size={24} className={"text-white"} />
                    </Button>
                </div>
            </nav>

            <Outlet />

            <section className={"flex bg-[radial-gradient(circle_at_top,_#1b1d25,_#0F1014)] text-white"}>
                <div className={"mx-auto w-10/12"}>
                    <div className={"mt-12 flex w-full flex-col items-center justify-center gap-4 border-b-2 border-gray-800 py-12"}>
                        <div className={"flex rounded-full bg-slate-100 p-1.5"}>
                            <img className={"w-10"} src={logon} />
                        </div>
                        <h1 className={"font-logo text-4xl font-bold"}>Puncak</h1>
                    </div>
                    <footer className={"items-center"}>
                        <div className={"flex justify-center gap-4 px-8 py-16"}>
                            <div>
                                <h1 className={"mb-7 font-montserrat text-2xl font-semibold"}>Platform</h1>
                                <div className={"font-montserratont-display flex w-48 flex-col gap-1 text-gray-400"}>
                                    <a>Cara Kerja</a>
                                    <a>Platform</a>
                                    <a>Integrasi</a>
                                    <a>Fitur</a>
                                </div>
                            </div>
                            <div>
                                <h1 className={"mb-7 font-montserrat text-2xl font-semibold"}>Support</h1>
                                <div className={"font-montserratont-display flex w-48 flex-col gap-1 text-gray-400"}>
                                    <a>Pusat Bantuan</a>
                                    <a>Komunitas</a>
                                    <a>Portal</a>
                                    <a>Protokol</a>
                                    <a>Legal</a>
                                </div>
                            </div>
                            <div>
                                <h1 className={"mb-7 font-montserrat text-2xl font-semibold"}>Resources</h1>
                                <div className={"font-montserratont-display flex w-48 flex-col gap-1 text-gray-400"}>
                                    <a>Blog</a>
                                    <a>Laporan</a>
                                    <a>FAQ</a>
                                    <a>Galeri</a>
                                    <a>Pusat Bantuan</a>
                                </div>
                            </div>
                            <div>
                                <h1 className={"mb-7 font-montserrat text-2xl font-semibold"}>Company</h1>
                                <div className={"font-montserratont-display flex w-56 flex-col gap-1 text-gray-400"}>
                                    <a>Tentang Kami</a>
                                    <a>Pelanggan</a>
                                    <a>Karir</a>
                                    <a>Hubungi Kami</a>
                                </div>
                            </div>
                            <div className={"ml-12"}>
                                <h1 className={"mb-7 font-montserrat text-2xl font-semibold"}>Join Our Newsletter</h1>
                                <div className={"relative"}>
                                    <input
                                        type="email"
                                        name="email"
                                        className="block w-full rounded-full border-0 bg-white px-4 py-3 font-medium text-black outline-none ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                                        placeholder="Masukkan email Anda"
                                    />
                                    <button type="button" className="group absolute right-0.5 top-1/2 flex -translate-y-1/2 rounded-full bg-indigo-600 p-2.5 text-sm font-semibold text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
                                            <path
                                                stroke="#fff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19.75 11.726h-15M13.7 5.7l6.05 6.024-6.05 6.025"
                                                className="colorStroke200E32 svgStroke"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className={"text-wrap p-2 text-sm text-gray-500"}>* Kami akan mengirimkan Anda pembaruan mingguan melalui email.</div>
                            </div>
                        </div>
                        <div className={"mx-auto mt-8 flex items-center justify-between py-6"}>
                            <div className={"text-lg text-gray-500"}>2024. All Rights Reserved</div>
                            <div className={"flex gap-8"}>
                                <svg className={"fill-white"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={24} height={24} id="twitter">
                                    <path d="M16 3.539a6.839 6.839 0 0 1-1.89.518 3.262 3.262 0 0 0 1.443-1.813 6.555 6.555 0 0 1-2.08.794 3.28 3.28 0 0 0-5.674 2.243c0 .26.022.51.076.748a9.284 9.284 0 0 1-6.761-3.431 3.285 3.285 0 0 0 1.008 4.384A3.24 3.24 0 0 1 .64 6.578v.036a3.295 3.295 0 0 0 2.628 3.223 3.274 3.274 0 0 1-.86.108 2.9 2.9 0 0 1-.621-.056 3.311 3.311 0 0 0 3.065 2.285 6.59 6.59 0 0 1-4.067 1.399c-.269 0-.527-.012-.785-.045A9.234 9.234 0 0 0 5.032 15c6.036 0 9.336-5 9.336-9.334 0-.145-.005-.285-.012-.424A6.544 6.544 0 0 0 16 3.539z"></path>
                                </svg>
                                <svg className={"fill-white"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width={24} height={24} id="facebook">
                                    <path fillRule="evenodd" d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z" clipRule="evenodd"></path>
                                </svg>
                                <svg className={"fill-white"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 2476 2476" id="instagram">
                                    <path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"></path>
                                </svg>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>
        </div>
    )
}

import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import React from "react"

function NavigationMenuDemo() {
    return (
        <NavigationMenu className={"font-cera"}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={"bg-transparent hover:border-gray-500"}>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/">
                                        <Terminal className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href="/docs/installation" title="Installation">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/news">
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:border-gray-500")}>Berita & Informasi</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={"bg-transparent hover:border-gray-500"}>Analitik</NavigationMenuTrigger>
                    <NavigationMenuContent className={"bg-[#1b1d25]"}>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                            <li className="row-span-2">
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={"map"}
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#2d303b]/30 to-[#2d303b]/75 p-6 no-underline outline-none focus:shadow-md">
                                        <Map className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium">Peta Interaktif</div>
                                        <p className="text-sm leading-tight text-muted-foreground">Representasi data geografis berbasis web yang dinamis tentang gunung berapi di Indonesia.</p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/tingkat-aktivitas" title="Tingkat Aktivitas">
                                Daftar Tingkat Aktivitas Gunung Api
                            </ListItem>
                            <ListItem href="/laporan-aktivitas" title="Laporan Aktivitas">
                                Laporan Aktivitas Gunung Api (Volcanic Activity Report)
                            </ListItem>
                            <ListItem href="laporan-harian" title="Laporan Harian">
                                Laporan Harian - Kamis, 04 Juli 2024
                            </ListItem>
                            <ListItem href="informasi-letusan" title="Informasi Letusan ">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={props.href}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2d303bcc] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default App
