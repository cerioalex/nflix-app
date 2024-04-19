import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const params = useParams();

  return (
    <div>
      {/* <p>Profile Page {params.profileId}</p> */}
      <p>Profile Page</p>
    </div>
  );
};

export default ProfilePage;
