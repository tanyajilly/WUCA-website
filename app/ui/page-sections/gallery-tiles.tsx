'use client';
import { StrapiMedia } from '@/app/lib/definitions';
import Image from 'next/image';
import { useState } from 'react';

interface Photo {
    id: number;
    description: string;
    link: string;
    image: StrapiMedia,
}

type Props = {
    content: [Photo]
}

type SlideProps = {
    key: number,
    photo: Photo,
    onClick: (photoID: number) => void
}

type ImageModalProps = {
    photo: Photo,
    onClose: () => void
}

export default function PhotoTiles({content}: Props) {
    const [modalImageID, setModalImageID] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (photoID: number) => {
        setModalImageID(photoID);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setModalImageID(null);
      };

      const selectedPhoto = content.find(el => el.id === modalImageID);

    return(
        <div className="grid grid-cols-4 gap-3">
            {
                content.map((photo) => {
                    return <Slide key={photo.id} photo={photo} onClick={openModal} />
                })
            }
            {isModalOpen && selectedPhoto && (
                <ImageModal photo={selectedPhoto} onClose={closeModal} />
            )}
        </div>
    )
}

function Slide({photo, onClick}: SlideProps) {
    const { width, height, url } = photo.image.data.attributes?.formats?.thumbnail || {};
    if (!url) 
        return;
    return (
        <div
            className="border-2 border-black p-2"
            onClick={() => onClick(photo.id)}
        >
            <Image
                src={url}
                alt={photo.image.data.attributes.alternativeText}
                width={width}
                height={height}
                className="w-full aspect-4/3 object-cover"
            />
        </div>
    )
}

// components/ImageModal.js
function ImageModal({ photo, onClose }: ImageModalProps) {
    const { image, description } = photo;
    const { width, height, url } = image.data.attributes || {};
    if (!url) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black-overlay flex items-center justify-center" onClick={onClose}>
        <div className="relative p-5 bg-white rounded scale-50 animate-scale-up z-10" onClick={e => e.stopPropagation()}>
            <Image
                src={url}
                alt={image.data.attributes.alternativeText}
                width={width}
                height={height}
                className=""
            />
            <p>{description}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  