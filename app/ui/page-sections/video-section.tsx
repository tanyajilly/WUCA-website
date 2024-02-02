import { StrapiMedia } from '@/app/lib/definitions';
import { Video } from '@/app/ui/video';

function extractYouTubeID(url: string) {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|v\/|embed\/)|(?:youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

type Props = {
    title: string,
    description: string,
    youTubeLink: string,
    video: StrapiMedia
}

export default function VideoSection({ title, description, video, youTubeLink }: Props) {
    const youTubeID = extractYouTubeID(youTubeLink);
    return(
        <section className="mb-4">
            {title && <h2 className="text-3xl mb-2">{title}</h2>}
            {description && <p className="text-xl mb-2">{description}</p>}
            {
                youTubeID
                    ? <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${youTubeID}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                    : <Video video={video} />
            }
        </section>
    )
}