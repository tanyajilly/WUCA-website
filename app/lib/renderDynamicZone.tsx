import TextSection from "../ui/page-sections/text-section";
import PhotoGallery from "../ui/page-sections/photo-gallery";
import Video from "../ui/page-sections/video-section"; 
import DonateButton from "../ui/page-sections/donate-button"; 

export const getContentComponent = ({ id, __component, ...rest }: any) => {
    let ContentComponent;

    const DefaultComponent = () => <h1>Component doesn`t exist</h1>;
    DefaultComponent.displayName = 'DefaultComponent';

    switch (__component) {
        case "content.text-section":
            ContentComponent = TextSection;
            break;
        case "content.slider":
            ContentComponent = PhotoGallery;
            break;
        case "content.video":
            ContentComponent = Video;
            break;
        case "content.donate-button":
            ContentComponent = DonateButton;
            break;
        default:
            ContentComponent = DefaultComponent;
    }

    return ContentComponent ? <ContentComponent key={`index-${__component}-${id}`} {...rest} /> : null;
  };