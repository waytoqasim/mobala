import { useState, useEffect } from "react";
import React from "react";
import MetaTags from "react-meta-tags";

const Map = () => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  function load() {
    window.location.reload(true);
  }
  // useEffect(() => {
  //   load();
  // }, [null]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position.coords.latitude, position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  });

  return (
    <div>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6085.9502472127715!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smoney%20changers!5e0!3m2!1sen!2s!4v1677160362910!5m2!1sen!2s&z=15`}
        CacheControl="no-cache"
        // zoom={14}
        mapTypeId="hybrid"
        style={{ border: 0, width: "100vw", height: "92vh" }}
        allowfullscreen=""
        loading="lazy"
        Buffer="true"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
export default Map;

{
  /* <iframe src="https://www.google.com/maps/embed?pb=!  1m16!1m12!1m3 !1d3618.5243825009607  !2d67.08878204611067!3d24.914200060691336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smoney%20changers!5e0!3m2!1sen!2s!4v1677144497407!5m2!1sen!2s"
   width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
<iframe src="https://www.google.com/maps/embed?pb=!  1m12!1m8 !1m3 !1d14474.097585361855  !2d67.08221599796688!3d24.914199588911718                !3m2!1i1024!2i768!4f13.1!2m1!1smoney%20changers!5e0!3m2!1sen!2s!4v1677144525423!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */
}
