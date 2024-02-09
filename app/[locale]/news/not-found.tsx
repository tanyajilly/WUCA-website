'use client';
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
 
export default function NotFound() {
  const { t } = useTranslation(['error']);
  return (
    <div>
      <h1>{t('no_articles')}</h1>
      <p>
        <Link href="/">{t('back_main_page')}</Link>
      </p>
    </div>
  )
}