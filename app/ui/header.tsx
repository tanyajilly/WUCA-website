import Link from "next/link";
import Image from "next/image";
import MainNav from "@/app/ui/nav";
import LanguageSelector from "@/app/ui/lang-selector";
import { getMainNav } from '@/app/lib/data';
import { NavigationItem } from '@/app/lib/definitions';

export default async function Header({locale}: {locale: string}) {
    const navItems: NavigationItem[] = await getMainNav(locale);
    return (
        <header className="relative w-full bg-white text-black mb-2 h-[100px] z-10">
            <div className="container max-w-screen-xl flex items-center min-h-full">
                <Link className="mr-auto" href="/">
                    <Image
                        className="max-w-20"
                        src="/logo.jpg"
                        alt="WUCA"
                        width="200"
                        height="100"
                    />
                </Link>
                <MainNav items={navItems} />
                <LanguageSelector />
            </div>
        </header>  
    );
}
