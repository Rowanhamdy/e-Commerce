import { useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import "@styles/global.css";
import "animate.css";
import NewArrivals from "./NewArrivals";
import { Button } from "react-bootstrap";
import BestSeller from "./BestSeller";

export default function Home() {
  const arrivalsRef = useRef<HTMLDivElement | null>(null);

  const handleLearnMore = () => {
    arrivalsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="">
        <Carousel indicators={false}>
          <Carousel.Item>
            <div className="position-relative ">
              <div className="carousel-img back-theme1" />

              <div className="d-flex justify-content-center align-items-center  position-absolute top-50 start-50 translate-middle  mb-5 ">
                <div className="carousel-overlay">
                  <h2 className="text-center mainText mb-5 text-white animate__animated animate__fadeInUp animate__delay-1s">
                    Classic Shop
                  </h2>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center  position-absolute top-50 start-50 translate-middle   ">
                <div className="mt-5 pt-5  animate__animated animate__fadeInUp animate__delay-1s">
                  <p className="text-center description text-white  ">
                    Welcome to Engage shop demo. we're the biggest , best
                    equipped and most advanced Online shop in the Egypt.
                  </p>
                  <Button
                    onClick={handleLearnMore}
                    className="btn btn-light btn-lg my-font fw-medium fs-6 text-uppercase  position-absolute mt-5 top-75 start-50 translate-middle "
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="position-relative ">
              <div className="carousel-img back-theme2" />

              <div className="p-5 d-flex justify-content-start align-content-start text-white   my-content  mb-5">
                <h2 className="mainText mb-5 text-white  animate__animated animate__fadeInUp animate__delay-1s">
                  Classic Shop
                </h2>
              </div>
              <div className="p-5 d-flex justify-content-center align-items-center    my-content mt-5 ">
                <div className="animate__animated animate__fadeInUp animate__delay-1s">
                  <p className=" description mt-5 text-white text-white  ">
                    Welcome to Engage shop demo. we're the biggest , best
                    equipped and most advanced Online shop in the Egypt.
                  </p>
                  <Button
                    onClick={handleLearnMore}
                    className="btn btn-light my-font fw-medium btn-lg fs-6 text-uppercase  position-absolute mt-3 top-75 start-0  "
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="position-relative ">
              <div className="carousel-img back-theme3" />

              <div className="d-flex justify-content-center align-items-center  position-absolute top-50 start-50 translate-middle  mb-5 ">
                <h2 className="text-center  text-white  mainText mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                  Classic Shop
                </h2>
              </div>
              <div className="d-flex justify-content-center align-items-center  position-absolute top-50 start-50 translate-middle   ">
                <div className="mt-5 pt-5  animate__animated animate__fadeInUp animate__delay-1s">
                  <p className="text-center  text-white  description  ">
                    Welcome to Engage shop demo. we're the biggest , best
                    equipped and most advanced Online shop in the Egypt.
                  </p>
                  <Button
                    onClick={handleLearnMore}
                    className="btn btn-light btn-lg fs-6 text-uppercase my-font fw-medium position-absolute mt-5 top-75 start-50 translate-middle "
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="content-below-carousel">
        <div ref={arrivalsRef}>
          <NewArrivals />
          <BestSeller />
        </div>
      </div>
    </>
  );
}
