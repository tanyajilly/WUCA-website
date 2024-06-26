"use client";
import { StrapiMedia } from "@/app/lib/definitions";
import Image from "next/image";
import { useState } from "react";

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
    onClick: (photoID: number) => void;
};

type ImageModalProps = {
    photo: Photo;
    onClose: () => void;
};

export default function PhotoTiles({ content }: Props) {
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

    const selectedPhoto = content.find((el) => el.id === modalImageID);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {content.map((photo) => {
                return (
                    <Slide key={photo.id} photo={photo} onClick={openModal} />
                );
            })}
            {isModalOpen && selectedPhoto && (
                <ImageModal photo={selectedPhoto} onClose={closeModal} />
            )}
        </div>
    );
}

function Slide({ photo, onClick }: SlideProps) {
    const { width, height, url } =
        photo.image.data.attributes?.formats?.thumbnail || {};
    if (!url) return;
    return (
        <div
            className="p-1 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-500 hover:scale-105 transition-transform"
            onClick={() => onClick(photo.id)}
        >
            <Image
                src={url}
                alt={photo.image.data.attributes.alternativeText}
                width={width}
                height={height}
                className="w-full aspect-4/3 object-cover rounded-md"
            />
        </div>
    );
}

// components/ImageModal.js
function ImageModal({ photo, onClose }: ImageModalProps) {
    const { image, description } = photo;
    const { width, height, url } = image.data.attributes || {};
    if (!url) return null;

    return (
        <div
            className="fixed z-10 top-0 left-0 w-full h-full bg-black-overlay flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative p-5 bg-white rounded-xl scale-50 animate-scale-up z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={url}
                    alt={image.data.attributes.alternativeText}
                    width={width}
                    height={height}
                    className="rounded"
                />
                <p className="mt-3">{description}</p>
                <button className="absolute top-0 right-0" onClick={onClose}>
                    <svg
                        className="h-6 w-6 text-slate-700"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="18" y1="6" x2="6" y2="18" />{" "}
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
