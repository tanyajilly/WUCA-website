'use client';
import Link from 'next/link'
import { useTranslation } from 'react-i18next';
 
export default function NotFound() {
  const { t } = useTranslation(['error', 'default']);
  return (
    <div>
      <h2>{t('page_not_found')}</h2>
      <p>{t('collection_page_not_found')}</p>
      <p>
        {t('view')} <Link href="/facts">{t('all_posts')}</Link>
      </p>
    </div>
  )
}