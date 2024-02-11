import Link from "next/link";
import Image from "next/image";
import initTranslations from "@/app/i18n";
export default async function Footer({locale}: {locale: string}) {
    const { t } = await initTranslations(locale, ['default']);
    return (
        <footer className="w-full bg-gray-600 text-white py-4">
            <div className="container max-w-screen-xl flex">
                <div className="flex-1">
                    <Link className="mb-3" href="/">
                        <Image
                            className="max-w-20"
                            src="/logo.jpg"
                            alt="WUCA"
                            width="200"
                            height="100"
                        />
                    </Link>
                    <p>Winchester Ukrainian Cultural Association</p>
                    <p>&copy; 2024</p>
                </div>
                <div className="flex-1">
                    <h3>{t('contact_us')}:</h3>
                    <p>Email</p>
                    <p>Address</p>
                </div>
                <div className="flex-none">
                    <h3>{t('follow_us')}:</h3>
                    <a className="flex gap-2" href="https://www.facebook.com/wuca.official" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                        </svg>
                        Facebook
                    </a>
                </div>
            </div>
        </footer>   
    );
}
