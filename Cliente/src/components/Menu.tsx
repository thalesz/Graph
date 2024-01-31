import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import MenuItems from './MenuItems';
import BtnLogout from './btnLogout';
const Menu: React.FC = ()=>{
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuCompleto, setMenuCompleto] = useState(false);
  
    const toggleMenu = () => {
      if (menuCompleto) {
        setMenuAberto(false);
        setTimeout(() => {
          setMenuCompleto(false);
        }, 300); // Defina o tempo de transição (300ms) para aguardar antes de mudar para o estado de menu completo para 35x35
      } else {
        setMenuAberto(!menuAberto);
        setMenuCompleto(true);
      }
    };
  
    const handleMenuClose = () => {
      setMenuAberto(false);
      setTimeout(() => {
        setMenuCompleto(false);
      }, 300); // Defina o tempo de transição (300ms) para aguardar antes de mudar para o estado de menu completo para 35x35
    };
  
    const linksMenu = menuCompleto ? (
  
      <MenuItems
      ></MenuItems>
  
    ) : null;

    const logoutBtn = menuCompleto ? (
      <BtnLogout
      ></BtnLogout>
    ) : null;
  
    return (
      <div className={`container ${menuAberto ? 'menu-aberto' : ''}`}>
        <nav className={`menu-lateral ${menuCompleto ? 'menu-completo' : ''}`}>
          <button  className="botao-menu " id='btmenuid' onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} id="icon"/>
          </button>
          {linksMenu}
          <div className='Logout'>
            {logoutBtn}
          </div>
          
        </nav>
      </div>
    );
}

export default Menu