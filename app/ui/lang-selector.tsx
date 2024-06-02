'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18n-config';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language || Cookies.get('NEXT_LOCALE');
  const router = useRouter();
  const currentPathname = usePathname();
  const en = i18nConfig.locales[0];
  const uk = i18nConfig.locales[1];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLocale;
    if (e.target.checked) {
      newLocale = uk
    } else newLocale = en;
    // const newLocale = e.target.value;

    const days = 30;
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    Cookies.set('NEXT_LOCALE', newLocale, { expires, path: '/' });

    if (currentLocale === i18nConfig.defaultLocale) {
      router.replace('/' + newLocale + currentPathname);
    } else {
      router.replace(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }
  };

  return (
    // use select if more than 2 locales
    // <select onChange={handleChange} value={currentLocale}>
    //   {i18nConfig.locales.map((locale) => (
    //     <option key={locale} value={locale}>{locale}</option>
    //   ))}
    // </select>
    <label className="inline-flex items-center cursor-pointer ml-10">
      <input type="checkbox" checked={currentLocale === uk} className="sr-only peer" onChange={handleChange} />
      <span className="me-2 font-medium uppercase text-blue-700 peer-checked:text-gray-900">{en}</span>
      <div className="relative w-11 h-6 bg-blue-600 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      <span className="ms-2 font-medium uppercase text-gray-900 peer-checked:text-blue-700">{uk}</span>
    </label>
  );
}