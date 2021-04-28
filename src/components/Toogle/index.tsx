import React, { useState } from 'react';
import { Container, 
    ToogleLabel,
    ToogleSelector } from './styles';


interface IToogleProps{
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

export const Toogle: React.FC<IToogleProps> = ({
    labelLeft, labelRight, checked, onChange
})=>{
    
    
    return (
        <Container>
            <ToogleLabel>{labelLeft}</ToogleLabel>
            <ToogleSelector
               checked={checked}
               uncheckedIcon={false}
               checkedIcon={false}
               onChange={onChange}
            />
            <ToogleLabel>{labelRight}</ToogleLabel>
        </Container>
    )
}

