import React, { useState } from "react";
import perfilPng from "../../img/perfil.png";

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const DisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const urlIFnal = selectedImage
    ? selectedImage
    : perfilPng;
  return (
    <div>
      <div className="div-imagen-usuario">
        <label for="inputPhoto">
          <img
            alt="not fount"
            width={"250px"}
            src={urlIFnal}
            className="rounded-circle"
          />
        </label>
      </div>
      <input
        id="inputPhoto"
        style={{ display: "none" }}
        type="file"
        name="myImage"
        onChange={(event) => {
          toBase64(event.target.files[0])
          .then( res => {
            setSelectedImage(res);
          })
        }}
      />
    </div>
  );
};
