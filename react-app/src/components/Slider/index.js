import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import image1 from "../../assets/slider-2.avif";
import image2 from "../../assets/slider-3.avif";
import image3 from "../../assets/slider-5.avif";
import "./slider.css";

const Slider = () => {
  //State
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      <p className="test">
        Let's find a new trail{user ? ", " + user.firstName : null}
      </p>
      <Carousel
        className="carousel"
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
      >
        <div>
          <img className="car-img" src={image1} />
        </div>
        <div>
          <img className="car-img" src={image2} />
        </div>
        <div>
          <img className="car-img" src={image3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
