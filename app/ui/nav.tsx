"use client";
import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/app/lib/definitions";

export default function Nav({ items }: { items: NavigationItem[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const pathname = usePathname();
    useEffect(() => {
        setIsOpen(false)
    }, [pathname]);
    return (
        <>
            <button onClick={toggleMenu} className="md:hidden block">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </button>
            <ul
                className={clsx(
                    "absolute w-full top-full left-0 px-8 overflow-hidden",
                    "md:static md:w-auto md:flex md:justify-between md:px-0 md:space-x-2 md:!max-h-none md:visible",
                    "text-base bg-white",
                    "transition-all duration-100 ease-in",
                    { "max-h-80": isOpen },
                    { "invisible max-h-0": !isOpen }
                )}
            >
                {items.map((el) => {
                    const { id, title, path, external, type, items } = el;
                    const isWrapper = type === "WRAPPER";
                    const hasSubMenu = items.length > 0;
                    const isActive = pathname.includes(path);
                    return (
                        <li key={id} className="group relative">
                            {isWrapper ? (
                                <span className="md:p-2 py-2 block text-link hover:text-purple-400 cursor-pointer">
                                    {title}
                                </span>
                            ) : (
                                <Link
                                    href={path}
                                    target={external ? "_blank" : ""}
                                    className={clsx(
                                        "md:p-2 py-2 block hover:text-purple-400",
                                        { "text-purple-600": isActive }
                                    )}
                                >
                                    {title}
                                </Link>
                            )}
                            {hasSubMenu && (
                                <ul className="absolute hidden group-hover:block left-0 top-full bg-white shadow-sm">
                                    {items.map((subItem) => {
                                        const {
                                            id: subId,
                                            title: subTitle,
                                            path: subPath,
                                            external: subExternal,
                                        } = subItem;
                                        return (
                                            <li key={subId}>
                                                <Link
                                                    href={subPath}
                                                    target={
                                                        subExternal
                                                            ? "_blank"
                                                            : ""
                                                    }
                                                    className="md:p-2 py-2 block hover:text-purple-400"
                                                >
                                                    {subTitle}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
