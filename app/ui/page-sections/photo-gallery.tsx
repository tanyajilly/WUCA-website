import { StrapiMedia } from '@/app/lib/definitions';
import Gallery from '@/app/ui/page-sections/gallery-tiles';
import Slider from '@/app/ui/page-sections/slider';

interface Photo {
    id: number;
    description: string;
    link: string;
    image: StrapiMedia,
}

type Props = {
    title: string,
    description: string,
    view: 'slider' | 'tiles',
    photo: [Photo]
}

export default function PhotoGallery({
    title,
    description,
    view,
    photo
}: Props) {
    return (
        <section className="mb-8 not-prose">
            {title && <h2 className="text-3xl mb-2 font-medium">{title}</h2>}
            {description && <p className="text-xl mb-2">{description}</p>}

            {
                view === 'slider'
                    ? <Slider content={photo} />
                    : <Gallery content={photo} />
            }
        </section>

    )
}
