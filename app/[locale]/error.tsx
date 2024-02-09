'use client';
import { useTranslation } from 'react-i18next';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation(['error']);
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">{t('something_went_wrong')}</h2>
      <p>{error.message}</p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        {t('try_again')}
      </button>
    </main>
  );
}