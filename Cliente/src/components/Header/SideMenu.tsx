import React, { useState } from "react";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BtnLogout from "../btnLogout";

const SideMenu: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            {
                !menuOpen &&(
                    <button className="ButtonHeaderFinal" onClick={toggleMenu}>
                        <FontAwesomeIcon className="icon" icon={faBars} />
                    </button>
                )
            }
            
            {menuOpen && (
                <div className="menu">
                    {/* Aqui você pode colocar o conteúdo do seu menu */}
                    <button className="ButtonHeaderFinalClose" onClick={toggleMenu}>
                        <FontAwesomeIcon className="icon" icon={faX} /> {/* Use o ícone faX aqui */}
                    </button>
                    <div className="menuItemsDiv">
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                        </ul>
                    </div>
                    <div className="menuFooter">
                            <BtnLogout></BtnLogout>
                    </div>

                </div>
            )}
        </div>
    );
};

export default SideMenu;
