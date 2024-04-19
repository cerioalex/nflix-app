import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfilesPage = () => {
  const profiles = [1, 2, 3, 4, 5];

  return (
    <div>
      <p>Profiles Page</p>
      {/* {profiles.map((profile) => (
        <NavLink
          key={profile}
          to={`/profiles/${profile}`}
          className={({ isActive }) => {
            return isActive ? "red" : "";
          }}
        >
          Profile {profile}
        </NavLink>
      ))}
      <Outlet /> */}
    </div>
  );
};

export default ProfilesPage;
