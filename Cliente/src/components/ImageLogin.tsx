import React from "react";

interface ImageLoginProps{
  imageName: string;
}

const ImageLogin: React.FC<ImageLoginProps> = ({imageName}) => {
  const imagePath = process.env.PUBLIC_URL + `/${imageName}`;

  return (
    <div className="imgContainer">
      <img className="imglogin" src={imagePath} alt="Descrição da imagem" />
    </div>
  );
};

export default ImageLogin;
