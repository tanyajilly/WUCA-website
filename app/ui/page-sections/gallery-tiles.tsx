'use client';
import { StrapiImage } from '@/app/lib/definitions';
import Image from 'next/image';
import { useState } from 'react';

interface Photo {
    id: number;
    description: string;
    link: string;
    image: StrapiImage,
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
    const { width, height, url } = photo.image.data.attributes || {};
    if (!url) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Image
                src={url}
                alt={photo.image.data.attributes.alternativeText}
                width={width}
                height={height}
                className=""
            />
          <button onClick={onClose}>Close</button>
        </div>
        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            position: relative;
            padding: 20px;
            background: white;
            border-radius: 4px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      </div>
    );
  };
  