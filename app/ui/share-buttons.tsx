"use client";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
} from "next-share";
import { usePathname } from 'next/navigation'
import { useTranslation } from "react-i18next";

type ShareButtonsProps = {
    title: string;
    text: string
}

export default function ShareButtons({title, text}: ShareButtonsProps) {
    const { t } = useTranslation(["default"]);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const pathname = usePathname();
    const url: string = siteUrl + pathname;

    return (
        <>
            <strong>{t("share")}:</strong>
            <div className="flex space-x-2 mt-2">
                <FacebookShareButton
                    url={url}
                    quote={text}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <WhatsappShareButton
                    url={url}
                    title={text}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <EmailShareButton
                    url={url}
                    subject={title}
                    body={text}
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
        </>
    );
}
