import { StrapiMedia } from '@/app/lib/definitions';

const getPreviewUrl = (url: string) => {
    const parts = url.split('.');
    parts.pop();
    parts.push('jpg');
    return parts.join('.');
}

export function Video({video}: {video: StrapiMedia}) {
    const { url, mime } = video.data.attributes;
    if (!url) return null;
    const previewUrl = getPreviewUrl(url);
    return (
      <video width="560" height="315" controls preload="none" poster={previewUrl}>
        <source src={url} type={mime} />
        Your browser does not support the video tag.
      </video>
    )
  }