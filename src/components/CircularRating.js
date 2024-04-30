import "../App.css";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularRating = ({ rating }) => {
  return (
    <CircularProgressbar
      value={rating}
      maxValue={10}
      text={rating}
      styles={buildStyles({
        pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        textSize: 28,
        textColor: "#fff",
        trailColor: "transparent",
      })}
      className="circle"
    />
  );
};

export default CircularRating;
