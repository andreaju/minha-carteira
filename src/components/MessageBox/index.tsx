import React from 'react';

import {Container} from './styles';


interface IMessageBoxProps{
    title: string;
    icon: string;
    footerText: string;
    description: string;
}
const MessageBox: React.FC<IMessageBoxProps> = ({
    title,
    icon,
    description,
    footerText,
})=>{
    return (
        <Container>
            <header>
                <h1>
                    {title}
                    <img src={icon} alt={title}></img>
                </h1>
                <p>{description}</p>
            </header>
            <footer>
                <span>{footerText}</span>
            </footer>
        </Container>
    )
}


export default MessageBox;