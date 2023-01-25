import styled from 'styled-components'
import { mobile } from '../responsive'
import {Link} from 'react-router-dom'

const Container = styled.div`
    flex: 1;
    height: 70vh;
    margin: 3px;
    position: relative;
`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
${mobile({height: "20vh"})}
`
const Intro = styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
top: 0;
left: 0;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    color: gray;
    font-weight: 600;
`

const Category = ({ item }) => {
    return (
        <Container key={item.id}>
            <Link to={`/products/${item.cat}`}>
            <Image src={item.img} />
            <Intro>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Intro>
            </Link>
        </Container>
    )
}

export default Category