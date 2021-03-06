import React, {useState} from 'react';

import {
    Container,
    Logo,
    Form,
    FormTitle} from './styles';
import logoImg from '../../assets/logo.svg'    
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MdEmail } from 'react-icons/md';

import {useAuth} from '../../hooks/auth';

const Signin: React.FC = ()=>{

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {signIn, signOut} = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt='Minha Carteira'/>
                <h3>Minha Carteira</h3>
            </Logo>
            <Form onSubmit={()=> signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>
                <Input 
                type='email'
                placeholder='e-mail'
                required
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input 
                type='password'
                placeholder='senha'
                onChange={(e)=>setPassword(e.target.value)}
                required/>
                <Button type='submit'>Entrar</Button>

            </Form>
        </Container>
    )
} 

export default Signin;