import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "@/app/lib/api";
import { cookies } from 'next/headers';


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('inputFile') as File;
    const user_id = formData.get('user_id');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    try {
        const response: cloudinary.UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream({
                resource_type: "image",
                tags: ['wuca-user-image'],
                public_id: "wuca_user_" + user_id,

            }, function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            })
            .end(buffer);
          });
        const { public_id } = response;
        const jwt = cookies().get('jwt')?.value;
        console.log(jwt);
        const userResponse = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${user_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    avatar: public_id,
                }),
            }
        );
        console.log(userResponse);
        return NextResponse.json({ message: 'success'});
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}
