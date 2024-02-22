import { StrapiMedia } from "@/app/lib/definitions";
import Image from "next/image";
import clsx from "clsx";

type Props = {
    text: string;
    image: StrapiMedia;
    imagePosition: string;
    sectionClassName: string;
    imageClassName: string;
    Button: {
        buttonText: string;
        url: string;
        className: string
    }
};
export default function TextSection({
    text,
    imagePosition,
    image,
    sectionClassName,
    imageClassName,
    Button
}: Props) {
    const { width, height, url } =
        image?.data?.attributes?.formats?.medium || {};
    return (
        <div
            className={clsx("sm:flex sm:flex-row gap-x-6 mb-4", sectionClassName, {
                "sm:flex-row-reverse": imagePosition === "right",
            })}
        >
            {url && (
                <div className={clsx("w-full sm:w-1/2 md:w-1/4", imageClassName)}>
                    <Image
                        src={url}
                        alt={image.data.attributes.alternativeText}
                        width={width}
                        height={height}
                    />
                </div>
            )}
            <div className="sm:flex-1 text-justify">
                <div dangerouslySetInnerHTML={{ __html: text }} />
                {Button && (
                    <a
                        className={`btn-primary ${Button.className}`}
                        href={Button.url}
                        target="_blank"
                    >{Button.buttonText}</a>
                )}
            </div>
        </div>
    );
}
