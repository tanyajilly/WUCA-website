'use client';
import { StrapiImage } from '@/app/lib/definitions';
import Image from 'next/image';
import Gallery from '@/app/ui/page-sections/gallery-tiles';
import Slider from '@/app/ui/page-sections/slider';

interface Photo {
    id: number;
    description: string;
    link: string;
    image: StrapiImage,
}

type Props = {
    title: string,
    description: string,
    view: 'slider' | 'tiles',
    photo: [Photo]
}

type SlideProps = {
    key: number;
    photo: Photo
}

export default function PhotoGallery({
    title,
    description,
    view,
    photo
}: Props) {
    return(
        <section className="mb-4">
            <h2 className="text-3xl mb-2">{title}</h2>
            <p className="text-xl mb-2">{description}</p>
            {
                view === 'slider'
                ? <Slider content={photo} />
                : <Gallery content={photo} />
            }
        </section>
        
    )
}

function Slide({photo}: SlideProps) {
    const { width, height, url } = photo.image.data.attributes?.formats?.medium || {};
    console.log(photo.image.data.attributes);
    if (!url) 
        return;
    return (
        <div>
            <Image
                src={url}
                alt={photo.image.data.attributes.alternativeText}
                width={width}
                height={height}
                className="w-full"
            />
        </div>
    )
}