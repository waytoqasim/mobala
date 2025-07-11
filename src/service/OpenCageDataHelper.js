import APIURLS from "../apiurls";
import { apiInterceptor } from "./ApiService";
export const OpenCageData=(response)=>{
    fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${response.data.city}&key=ede4e8b4a1fb486f9f30e23b53b2504d&pretty=1`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((ress) => {
          let giveLat = ress.results[0].annotations.DMS.lat;
          let giveLng = ress.results[0].annotations.DMS.lng;
          giveLat =
            parseFloat(giveLat.split("°")[0]) +
            parseFloat(giveLat.split("°")[1].split("'")[0]) / 60 +
            parseFloat(giveLat.split("°")[1].split("'")[1]) / 3600;
          giveLng =
            parseFloat(giveLng.split("°")[0]) +
            parseFloat(giveLng.split("°")[1].split("'")[0]) / 60 +
            parseFloat(giveLng.split("°")[1].split("'")[1]) / 3600;
          var giveCityLatLon = { lat: giveLat, lon: giveLng };
          sessionStorage.setItem("UserCoordinates",JSON.stringify(giveCityLatLon));
        });
}

export const getlocation = () => {
    return new Promise((resolve, reject) => {
      // console.log(navigator.permissions);
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          // console.log(result.state);
          if (result.state == "granted" || result.state == "prompt") {
            try {
              navigator.geolocation.getCurrentPosition(
                function (position) {
                  fetch(
                    `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=21f61a865243443b8b07654137eadc62`,
                    { method: "GET" }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      // console.log(data);
                      let newObj = { ...data.results[0] };

                      apiInterceptor
                        .get(APIURLS.ORDERS.GETCOORDINATES(newObj.city,newObj.state,newObj.country))
                        .then((res) => res.json())
                        .then((ress) => {});
                         resolve(newObj);                      
                    })
                    .catch((err) => {
                      console.error(err);
                      resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      });
                    });
                },
                (err) => {
                  console.error(err);
                  resolve(null);
                }
              );
            } catch (err) {
              console.error(err);
            }
          } else {
            resolve(null);
          }
        });
    });
  };