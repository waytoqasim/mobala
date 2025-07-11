import React, { Suspense, lazy } from "react";
import "../../App.css";
// import Profile from "../ProfileComponent/profileComponent.js";
const Profile = lazy(() => import("../../components/profile/profileComponent.js"));

function EditProfileNew(props) {
  sessionStorage.setItem("previousPathName", window.location.pathname);
  return (
    <>
      <Suspense>
        <Profile editProfile={true} />
      </Suspense>
    </>
  );
}
export default EditProfileNew;
