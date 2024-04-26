import React from "react";
import "../styles/movieCast.css";
import Typography from "@mui/material/Typography";
import { apiConfig } from "../api/apiConfig";
import Scroll from "./Scroll";

const MovieCast = ({ casts }) => {
  console.log("cast");
  console.log(casts);

  return (
    <div className="cast-container">
      <Typography variant="h5" gutterBottom>
        Cast
      </Typography>
      <Scroll>
        <div className="cast-card-wrapper">
          {casts.map((cast) => (
            <div key={cast.id} className="cast-card">
              {cast.profile_path ? (
                <img
                  src={apiConfig.imgW500(cast.profile_path)}
                  alt="#"
                  width={200}
                  height={300}
                />
              ) : (
                <img
                  src={"https://www.usm.edu/images/image-not-available_1.jpg"}
                  alt="#"
                  width={200}
                  height={300}
                />
                // <div className="no-profile"></div>
              )}
              <p className="cast-name">{cast.name}</p>
              <p className="cast-character">{cast.character}</p>
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  );
};

export default MovieCast;
