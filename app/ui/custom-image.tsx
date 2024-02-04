import Image from 'next/image';
import { DEFAULT_IMAGE } from '@/app/lib/constants';

export default function CustomImage({
    url = DEFAULT_IMAGE,
    title = "no image",
    width = 300,
    height = 300,
    className="object-cover h-full"
}) {
    return (
        <Image
            src={url}
            alt={title}
            width={width}
            height={height}
            className={className}
        />
    );
}
