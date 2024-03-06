import React from 'react';
import {Link }from 'react-router-dom'
interface CardProps {
  cardData: {
    title: string;
    info: string;
    tags: string[];
    link:string;
  };
}

const Card: React.FC<CardProps> = ({ cardData }) => {
  const {title,info,tags,link } = cardData;

  return (
    <div className="card card-other">
      <div className="header">
        <p className="title">{title}</p>
      </div>
      <div className="info">
        <p>{info}</p>
      </div>
      <div className="footer">
        <p className="tag">{tags.map(tag => `#${tag} `)}</p>
        <Link to={link}>
            <button type="button" className="action">
            Get started
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
