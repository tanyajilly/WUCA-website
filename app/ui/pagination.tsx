import clsx from 'clsx';
import React from 'react';

type PaginationProps = {
    pageIndex: number,
    pageCount: number,
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ 
        pageIndex,
        pageCount,
        setPageIndex
    }: PaginationProps) {
    return (
        <div className="space-x-2 space-y-2">
            <button className={clsx(
                'p-2 rounded text-white bg-blue-400',
                pageIndex === 1 && 'bg-gray-300'
            )}
                disabled={pageIndex === 1}
                onClick = {() => setPageIndex(pageIndex - 1)}
            >
                Previous
            </button>
            <button className={clsx(
                'p-2 rounded text-white bg-blue-400',
                pageIndex === pageCount && 'bg-gray-300'
            )}
                disabled={pageIndex === pageCount}
                onClick = {() => setPageIndex(pageIndex + 1)}
            >
                Next
            </button>
            <span>{`${pageIndex} of ${pageCount}`}</span>
        </div>
    )
}