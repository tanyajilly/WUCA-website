import Image from 'next/image'
import Link from 'next/link';
import { Page } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { getContentComponent } from '@/app/lib/renderDynamicZone';

export default function Page ({ page }: { page: Page }) {
    const { name, pageContent } = page.attributes;
    return (
        <article>
            <h1 className="text-2xl mb-4">{name}</h1>
            { pageContent.map(getContentComponent) }
        </article>
    )
}