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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

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
    <select onChange={handleChange} value={currentLocale}>
      {i18nConfig.locales.map((locale) => (
        <option key={locale} value={locale}>{locale}</option>
      ))}
    </select>
  );
}