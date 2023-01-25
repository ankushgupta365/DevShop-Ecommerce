import { Search, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
const Container = styled.div`
height: 60px;
${mobile({height: "50px"})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({padding: "10px 0px"})}
`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
    
`
const Language= styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: "none"})}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    padding: 5px;
    margin-left: 25px;
`
const Input = styled.input`
    border: none;
    ${mobile({width: "50px"})} 
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize: "24px"})}
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${mobile({flex: 1,justifyContent: "center"})}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize: "12px", marginLeft: "10px"})}
`
const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                      <Input placeholder='search'/>
                      <Search style={{ color: "gray", fontSize: 16 }}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>
                        Dev.
                    </Logo>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <Link to={"/cart"}>
                    <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartCheckoutOutlined/>
                    </Badge>
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar