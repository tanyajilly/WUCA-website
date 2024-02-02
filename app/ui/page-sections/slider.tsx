"use client";
import { StrapiMedia } from "@/app/lib/definitions";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import Image from "next/image";
import { isValidUrl } from "@/app/lib/utils";

interface Photo {
    id: number;
    description: string;
    link: string;
    image: StrapiMedia;
}

type Props = {
    content: [Photo];
};

type SlideProps = {
    key: number;
    photo: Photo;
};

type LinkWrapperProps = {
    url?: string;
    children: React.ReactNode;
};

export default function Slider({ content }: Props) {
    return (
        <Glider
            draggable
            hasArrows
            hasDots
            slidesToShow={1}
            iconLeft={
                <svg
                    className="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            }
            iconRight={
                <svg
                    className="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            }
        >
            {content.map((photo) => {
                return <Slide key={photo.id} photo={photo} />;
            })}
        </Glider>
    );
}

const LinkWrapper: React.FC<LinkWrapperProps> = ({ url, children }) => {
    return url && isValidUrl(url) ? <a href={url}>{children}</a> : children;
};

function Slide({ photo }: SlideProps) {
    const { image, link, description } = photo;
    const { width, height, url } = image.data.attributes?.formats?.medium || {};
    if (!url) return;
    return (
        <div className="relative">
            <LinkWrapper url={link}>
                <Image
                    src={url}
                    alt={image.data.attributes.alternativeText}
                    width={width}
                    height={height}
                    className="w-full"
                />
                {description && (
                    <p className="absolute bottom-0 left-0 w-1/2 bg-black-overlay text-white p-4">
                        {description}
                    </p>
                )}
            </LinkWrapper>
        </div>
    );
}
