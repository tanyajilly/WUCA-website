import { type BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import { StrapiImage } from '@/app/lib/definitions';
import Image from 'next/image';
import clsx from 'clsx';

type Props = {
    text: BlocksContent,
    image: StrapiImage,
    imagePosition: string
}
export default function TextSection({ text, imagePosition, image }: Props) {
    const { width, height, url,  } = image?.data?.attributes?.formats?.medium || {};
    return(
        <div
            className={clsx(
            'flex gap-x-6 mb-4',
                {
                    'flex-row-reverse': imagePosition === 'right',
                }
            )}
        >
            {
                url && <div className="w-1/4">
                    <Image 
                        src={url}
                        alt={image.data.attributes.alternativeText}
                        width={width}
                        height={height}
                    />
                </div>
            }
            <div className="flex-1 text-justify">
               <BlocksRenderer content={text} /> 
            </div>
            
        </div>
    )
}