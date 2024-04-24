import "../App.css";
import React, { useRef } from "react";

const Scroll = ({ children }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
    }
  };

  return (
    <div className="image-slider-container">
      <button className="scroll-button" onClick={scrollLeft}>
        {"<"}
      </button>
      <div className="image-slider" ref={sliderRef}>
        {children}
      </div>
      <button className="scroll-button" onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
};

export default Scroll;
