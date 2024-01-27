"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../lib/definitions";
import { getIdFromLocalCookie } from "../lib/auth";
import { fetcher } from "../lib/api";

export default function Profile({ userData }: { userData: User }) {
    const router = useRouter();
    const { username } = userData;
    const avatar = userData.avatar ?? 'default_avatar';
    const [image, setImage] = useState<File | null>(null);
    const altText = avatar === 'default_avatar' ? 'Profile' : username;

    const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const tmpImage = event.target.files[0];
            setImage(tmpImage);
        }
    };

    const uploadToServer = async () => {
        if (!image) {
            return;
        }
        const formData = new FormData();
        const file = image;
        formData.append("inputFile", file);
        formData.append("user_id", await getIdFromLocalCookie());
        try {
            const responseData = await fetcher("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (responseData.message === "success") {
                router.refresh();
            }
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    };

    return (
        <>
            <h1 className="text-5xl font-bold">
                Welcome back{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    {username}
                </span>
                <span>👋</span>
            </h1>
            {avatar === 'default_avatar' && (
                <div>
                    <label className="block" htmlFor="avatar">Select an image to upload</label>
                    <input id="avatar" type="file" onChange={uploadToClient} />
                    <button
                        className="md:p-2 rounded py-2 text-white bg-blue-600 hover:bg-blue-800 p-2"
                        type="submit"
                        disabled={!image}
                        onClick={uploadToServer}
                    >
                        Set Profile Image
                    </button>
                </div>
            )}
            {/* eslint-disable @next/next/no-img-element */}
            {avatar && (
                <img
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_150,h_150,g_face,c_thumb,r_max/${avatar}`}
                    alt={altText}
                />
            )}
        </>
    );
}
