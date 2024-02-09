import Link from "next/link";
import Image from "next/image";
import MainNav from "@/app/ui/nav";
import LanguageSelector from "@/app/ui/lang-selector";

export default async function Header({locale}: {locale: string}) {
    
    return (
        <header className="w-full bg-white text-black mb-2 h-[100px]">
            <div className="container mx-auto flex p-4 items-center min-h-full">
                <Link className="mr-auto" href="/">
                    <Image
                        className="max-w-20"
                        src="/logo.jpg"
                        alt="WUCA"
                        width="200"
                        height="100"
                    />
                </Link>
                <MainNav locale={locale} />
                <LanguageSelector />
            </div>
        </header>  
    );
}
