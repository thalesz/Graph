import React, {ReactNode} from "react"
//import Login from "./Login"
import ImageLogin from "./ImageLogin"

interface PageLoginProps {
    children: ReactNode; // Componente filho (Login, Register, etc.)
    imageName: string; // Tipo do nome da imagem
  }

const PageLogin: React.FC<PageLoginProps> = ({children, imageName})=>{
    return(
        <div className="PageFormImage">
            {children}
            <ImageLogin imageName={imageName}/>
        </div>
    )
}

export default PageLogin