import TextSection from "../ui/page-sections/text-section";
import Slider from "../ui/page-sections/photo-gallery";

export const getContentComponent = ({ id, __component, ...rest }: any) => {
    let ContentComponent;

    if (__component === "content.text-section"){
            ContentComponent = TextSection;
    }
    else if (__component === "content.slider"){
            ContentComponent = Slider;
    }

    return ContentComponent ? <ContentComponent key={`index-${__component}-${id}`} {...rest} /> : null;
  };