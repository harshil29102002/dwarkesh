import styled from 'styled-components'
import { FiFile } from 'react-icons/fi';
import { TbCurrencyRupee } from "react-icons/tb";

const Container = styled.div`
padding: 1.2rem 1.2rem;
`;

const CardWrapper = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
max-width: 100%;
padding: 1.2rem;    
`;

const Card = styled.div`
height: 5rem;
padding: 1.2rem 1rem;
width: 100%;
background-color: #fff;
display: flex;
gap: 0.5rem;
justify-content: space-between;
border-radius: 1rem;
border: 1px solid #E2E4E9;
`;

const MainTitle = styled.div`
font-size: 1.5rem;
font-weight: 600;
color: #111827;
letter-spacing: 0.01em;
line-height: 1.5rem;
padding-left: 0.5rem;
font-family: "gilroy-Medium", "Inter", system-ui, sans-serif;
`;

const Title = styled.div`
font-size: 1rem;
font-family: 'gilroy-Medium', sans-serif;
`;

const Number = styled.div`
font-size: 2rem;
font-family: 'gilroy-Medium', sans-serif;
`;

const Icons = styled.div`
svg{
background-color: #FDE8E8;
padding: 0.5rem;
border-radius: 20%;
color: #CC0000;
width: 1.5rem;
height: 1.5rem;
}
`;

const IconWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 0.5rem;
border-radius: 20%;
`;

const TextSection = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
justify-content: space-around;
`;


const Data = [
    {
        title:"Total Delivery Challans",
        number:"10",
        icon:<FiFile/>
    },
    {
        title:"Total Delivery Challans",
        number:"₹1,58,000",
        icon:<TbCurrencyRupee/>
    }
]

const ChallanStat = () => {
  return (
    <Container>
        <MainTitle>Delivery Challans</MainTitle>
        <CardWrapper>
        {Data.map((item,index) => (
         <Card key={index}>
            <TextSection>
            <Title>{item.title}</Title>
            <Number>{item.number}</Number>
            </TextSection>
            <IconWrapper>
            <Icons>{item.icon}</Icons>
            </IconWrapper>
        </Card>
     
        ))}
           </CardWrapper>
        {/* <DataTable/> */}
    </Container>
  )
}

export default ChallanStat