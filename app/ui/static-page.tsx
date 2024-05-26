import type { Page } from '@/app/lib/definitions';
import { getContentComponent } from '@/app/lib/renderDynamicZone';

export default function Page({ page }: { page: Page }) {
    const { name, pageContent } = page.attributes;
    return (
        <article className="container px-0 max-w-screen-md">
            <h1 className="text-4xl font-semibold mb-4 text-center">{name}</h1>
            <div className="prose max-w-none lg:prose-p:text-xl prose-p:leading-7 prose-p:mt-0">{pageContent.map(getContentComponent)}</div>
        </article>
    )
}