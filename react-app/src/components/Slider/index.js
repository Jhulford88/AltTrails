import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from "../../assets/slider-2.avif"
import image2 from "../../assets/slider-3.avif"
import image3 from "../../assets/slider-5.avif"





const Slider = () => {

    return (
        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
            <div>
                <img src={image1} />

            </div>
            <div>
                <img src={image2} />

            </div>
            <div>
                <img src={image3} />

            </div>
        </Carousel>
    );

}

export default Slider
