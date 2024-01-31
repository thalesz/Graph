import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
const BtnLogout: React.FC = ()=>{
    const authContext = useContext(AuthContext);

  if (!authContext) {
    // Lidar com o caso em que o contexto não está disponível
    return null;
  }

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <ul className="lista-menu">
      <hr className="linha-separadora" />
      <li onClick={handleLogout}>
          Logout
      </li>      
      
      <hr className="linha-separadora" />
      {/* Adicione mais itens conforme necessário */}
    </ul>

  );
}
export default BtnLogout;