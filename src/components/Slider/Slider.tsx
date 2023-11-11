import React, { useEffect, useState } from "react";
import "./Slider.scss";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";

export interface Slide {
  label: string;
  paragraph: string;
  image: string;
}

export interface SliderProps {
  slides: Slide[];
}

export const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlideId, setCurrentSlideId] = useState<number>(0);
  const [downX, setDownX] = useState(1);
  const [upX, setUpX] = useState(1);

  const slideLeft = () => {
    if (currentSlideId > 0) {
      setCurrentSlideId((prev) => prev - 1);
    } else {
      setCurrentSlideId(slides.length - 1);
    }
  };

  const slideRight = () => {
    if (currentSlideId < slides.length - 1) {
      setCurrentSlideId((prev) => prev + 1);
    } else {
      setCurrentSlideId(0);
    }
  };

  const listenToMouseDown = (e: React.MouseEvent) => {
    setDownX(e.clientX);
  };

  const listenToTouchStart = (e: React.TouchEvent) => {
    setDownX(e.touches[0].clientX);
  };

  const listenToMouseUp = (e: React.MouseEvent) => {
    setUpX(e.clientX);
  };

  const listenToTouchEnd = (e: React.TouchEvent) => {
    setUpX(e.changedTouches[0].clientX);
  };

  useEffect(() => {
    if (downX + 100 < upX) {
      slideLeft();
    } else if (downX - 100 > upX) {
      slideRight();
    }
  }, [upX]);

  return (
    <div
      className="slider"
      onMouseDown={(e) => listenToMouseDown(e)}
      onMouseUp={(e) => listenToMouseUp(e)}
      onTouchStart={(e) => listenToTouchStart(e)}
      onTouchEnd={(e) => listenToTouchEnd(e)}
    >
      <div
        className="slider__slide-container"
        style={{ transform: `translateX(calc(-100% * ${currentSlideId}))` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.image}
            style={{ backgroundImage: `url(${slide.image})` }}
            className="slider__slide"
          >
            <h1>{slide.label}</h1>
            <p>{slide.paragraph}</p>
          </div>
        ))}
      </div>

      <div className="slider__dot-navigation">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slider__dot ${
              index === currentSlideId ? "slider__dot--active" : ""
            }`}
            onClick={() => setCurrentSlideId(index)}
          ></div>
        ))}
      </div>

      <button className="slider__btn slider__btn--left" onClick={slideLeft}>
        <img src={arrowLeft} alt="left" />
      </button>
      <button className="slider__btn slider__btn--right" onClick={slideRight}>
        <img src={arrowRight} alt="right" />
      </button>
    </div>
  );
};
