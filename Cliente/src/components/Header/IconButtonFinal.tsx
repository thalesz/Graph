import React from "react";

const IconButtonFinal : React.FC = ()=>{
    const imagePath = process.env.PUBLIC_URL + `/img7.png`;

    return(
        
        <button className="IconButtonFinal">
            <img src={imagePath} alt="" />
            SIGNAL
        </button>
    )
}

export default IconButtonFinal;