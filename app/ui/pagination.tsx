import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type PaginationProps = {
    pageIndex: number,
    pageCount: number,
    setPageIndex: (index: number) => void;
}

export default function Pagination({ 
        pageIndex,
        pageCount,
        setPageIndex
    }: PaginationProps) {

    const { t } = useTranslation();
    const handlePreviousClick = useCallback(() => {
        setPageIndex(pageIndex - 1);
    }, [pageIndex, setPageIndex]);

    const handleNextClick = useCallback(() => {
        setPageIndex(pageIndex + 1);
    }, [pageIndex, setPageIndex]);

    if (pageCount === 1) return null;

    return (
        <div className="space-x-2 space-y-2">
            <button className={clsx(
                'p-2 rounded text-white bg-blue-400',
                pageIndex === 1 && 'bg-gray-300'
            )}
                disabled={pageIndex === 1}
                onClick={handlePreviousClick}
            >
                {t('prev')}
            </button>
            <button className={clsx(
                'p-2 rounded text-white bg-blue-400',
                pageIndex === pageCount && 'bg-gray-300'
            )}
                disabled={pageIndex === pageCount}
                onClick={handleNextClick}
            >
                {t('next')}
            </button>
            <span>{`${pageIndex} of ${pageCount}`}</span>
        </div>
    )
}