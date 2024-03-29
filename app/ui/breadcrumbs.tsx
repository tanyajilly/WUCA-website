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
        <nav aria-label="breadcrumb" className="mb-5">
            <ol>
                <li className="inline-block">
                    <Link href="/">{t('home')}</Link>
                </li>
                {breadcrumbs.map(
                    ({ href, label, isLast }, index) =>
                        (index === 0 || !sectionsList.includes(section)) && (
                            <li
                                key={index}
                                className="inline-block capitalize before:content-['/'] before:mx-1"
                            >
                                {!isLast ? (
                                    <Link href={href} prefetch={false}>
                                        {label}
                                    </Link>
                                ) : (
                                    <span aria-current="page">{label}</span>
                                )}
                            </li>
                        )
                )}
            </ol>
        </nav>
    );
}
