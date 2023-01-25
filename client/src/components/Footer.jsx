import { Facebook, Instagram, MailOutlined, Phone, Pinterest, Room, Twitter } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection: "column"})}
`
const Left = styled.div`
flex:1;
display: flex;
flex-direction: column;
padding: 20px;
`
const Logo = styled.h1``
const Decs = styled.p`
margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props)=> props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Center = styled.div`
flex: 1;
padding: 20px;
${mobile({display: "none"})}
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styled.div`
flex: 1;
padding: 20px;
${mobile({backgroundColor: "#eee"})}
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>AnkushDev.</Logo>
                <Decs>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt temporibus, earum veniam quam numquam possimus, consectetur autem sequi odit harum, iure quod vel aliquid. Harum minima, delectus molestias dolorum in dignissimos sit!</Decs>
                <SocialContainer>
                    <SocialIcon color="3B5999"><Facebook/></SocialIcon>
                    <SocialIcon color="E4405F"><Instagram/></SocialIcon>
                    <SocialIcon color="55ACEE"><Twitter/></SocialIcon>
                    <SocialIcon color="E60023"><Pinterest/></SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                    <ListItem>Conditions</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={{marginRight: "10px"}}/> A-971 Laxmi Garden, Loni Ghaziabad, 201102
                </ContactItem>
                <ContactItem>
                    <Phone style={{marginRight: "10px"}}/> +91-7042469676
                </ContactItem>
                <ContactItem>
                    <MailOutlined style={{marginRight: "10px"}}/> ankushgupta365@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    )
}

export default Footer