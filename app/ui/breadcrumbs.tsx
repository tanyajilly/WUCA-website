"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const breadcrumbSegments = pathname.split("/").filter(Boolean);

    const breadcrumbs = breadcrumbSegments.map((segment, index) => {
        const href = "/" + breadcrumbSegments.slice(0, index + 1).join("/");
        const isLast = index === breadcrumbSegments.length - 1;
        return { href, label: segment, isLast };
    });

    if (!breadcrumbs.length) return null;

    // don't show article name as a breadcrumb
    const section = breadcrumbSegments[0];
    const sectionsList = ["blog", "events", "facts"];

    return (
        <nav aria-label="breadcrumb" className="mb-5">
            <ol>
                <li className="inline-block">
                    <Link href="/">Home</Link>
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
