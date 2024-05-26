"use client";
import { usePathname } from "next/navigation";
import { useTranslation } from 'react-i18next';
import Link from "next/link";

export default function Breadcrumbs() {
    const { t } = useTranslation(['breadcrumbs']);
    const pathname = usePathname();
    const breadcrumbSegments = pathname
        .split("/")
        .filter(segment => segment && segment !== "uk");
    const breadcrumbs = breadcrumbSegments.map((segment, index) => {
        const href = "/" + breadcrumbSegments.slice(0, index + 1).join("/");
        const isLast = index === breadcrumbSegments.length - 1;
        return { href, label: t(segment), isLast };
    });

    if (!breadcrumbs.length) return null;

    // don't show article name as a breadcrumb
    const section = breadcrumbSegments[0];
    const sectionsList = ["news", "events", "facts"];

    return (
        <nav aria-label="breadcrumb" className="mb-12">
            <ol className="flex flex-wrap justify-center">
                <li>
                    <Link className="text-slate-700 hover:text-blue-700" href="/">{t('home')}</Link>
                </li>
                {breadcrumbs.map(
                    ({ href, label, isLast }, index) =>
                        (index === 0 || !sectionsList.includes(section)) && (
                            <li
                                key={index}
                                className="inline-flex items-center capitalize before:h-4 before:w-px before:bg-slate-300 before:mx-3 before:content-['']"
                            >
                                {!isLast ? (
                                    <Link className="text-slate-700 hover:text-blue-700" href={href} prefetch={false}>
                                        {label}
                                    </Link>
                                ) : (
                                    <span className="text-gray-500" aria-current="page">{label}</span>
                                )}
                            </li>
                        )
                )}
            </ol>
        </nav>
    );
}
