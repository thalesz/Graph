import React from 'react';
import { HeaderBtsProps } from "./interfaceBoxDuvPerQuestao";
import Card from 'react-bootstrap/Card';

const HeaderBts: React.FC<HeaderBtsProps>= ({ title }) => {
    const cardHeaderStyle = {
        backgroundColor: 'transparent', // Set background color to transparent
    };

    return (
        <>
            <Card.Header as="h5" style={cardHeaderStyle}>{title}</Card.Header>
        </>
    );
};

export default HeaderBts;
