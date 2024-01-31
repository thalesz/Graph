import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = () => {
  return (
    <ul className="lista-menu">
      <hr className="linha-separadora" />
      <li>
        <Link to='/users' className='link'>
          Users
        </Link>
      </li>      
      
      <hr className="linha-separadora" />
      {/* Adicione mais itens conforme necessário */}
    </ul>
  );
};

export default MenuItems;
