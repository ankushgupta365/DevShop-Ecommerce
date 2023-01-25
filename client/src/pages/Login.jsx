import styled from "styled-components"
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react"
import { login } from "../redux/apiCalls"
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
   width: 25%;
    background-color: white;
    padding: 20px;
    ${mobile({ width: "75%" })}
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    padding: 10px;
    margin: 10px 0;
`
const Button = styled.button`
    width: 40%;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
    padding: 15px 20px;
    margin-bottom: 10px;
`
const Link = styled.a`
   font-size: 12px;
   text-decoration: underline;
   cursor: pointer;
   margin: 5px 0; 
`
const Error = styled.span`
    font-size: 12px;
    color: red;
`
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const {isFetching, error} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const handleLogin = (e)=>{
        e.preventDefault();
        login(dispatch,{username,password})
    }
    return (
        <Container>
            <Wrapper>
                <Title>LOGIN</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleLogin}>Login</Button>
                    <Link disabled={isFetching}>Forgot your password?</Link>
                    {error && <Error>something went wrong...</Error>}
                    <Link>Create an Account</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login