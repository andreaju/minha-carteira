import React, {useMemo, useState} from "react";
import emojis from '../../utils/emojis';

import {useTheme} from '../../hooks/theme';
import { 
        Container, 
        Profile, 
        Welcome, 
        UserName } from "./styles";
import {Toogle} from '../Toogle';

const MainHeader: React.FC = () => {

  const {toggleTheme, theme}  = useTheme();
  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);
  const emoji = useMemo(()=>{
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  }
  ,[])

  const handleChangeTheme = ()=>{
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  return (
    <Container>
        <Toogle
         labelLeft='Light'
         labelRight='Dark'
         checked={darkTheme}
         onChange={handleChangeTheme}
        />
      <Profile>
        <Welcome>Olá, {emoji} </Welcome>
        <UserName>André Santos</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
