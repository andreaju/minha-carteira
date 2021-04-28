import React from  'react';
import Logo from '../../assets/logo.svg';
import { Container,
        Header,
        LogoImg,
        MenuContainer, 
        MenuItemLink, 
        Title,
        MenuItemButton } from './styles';
import {
            MdDashboard,
            MdArrowDownward,
            MdArrowUpward,
            MdExitToApp
           } from 'react-icons/md';
           
import {useAuth} from '../../hooks/auth';           
const Aside: React.FC = () =>{

    const {signOut} = useAuth();
    return (
        <Container>
            <Header>
                <LogoImg src={Logo} alt='Logo Minha Carteira'/>
                <Title>Minha Carteira</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href='/dashboard'>
                    <MdDashboard/>
                    DashBoard
                </MenuItemLink>
                <MenuItemLink href='/list/entry-balance'>
                    <MdArrowUpward/>
                    Entradas
                </MenuItemLink>
                <MenuItemLink href='/list/exit-balance'>
                    <MdArrowDownward/>
                    Saidas
                </MenuItemLink>
                <MenuItemButton onClick={signOut} >
                    <MdExitToApp/>
                    Sair
                </MenuItemButton>                                                
            </MenuContainer>
        </Container>
    )
}

export default Aside;