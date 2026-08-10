
import { FiBox } from 'react-icons/fi';
import styled from 'styled-components';
import { FaRegCircleCheck } from "react-icons/fa6";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FiShoppingBag } from "react-icons/fi";


const stockData = [
    {
        title:"Total Stock",
        percentage:"10",
        icon:<FiBox/>
    }
    ,{
        title:"Available Units",
        percentage:"6",
        icon:<FaRegCircleCheck/>
    },
    {
        title:"Sold Units",
        percentage:"4",
        icon:<FiShoppingBag/>
    },
    {
        title:"Pending Deliveries",
        percentage:"20",
        icon:<AccessTimeIcon/>
    }
]

const Container = styled.div`
padding: 1rem;
margin-top: 1rem;
// background-color: #F7F8FA;
display: flex;
gap: 1rem;
align-items: center;
justify-content: center;
font-family: 'gilroy-Medium', sans-serif;

@media (max-width: 768px) {
    flex-direction: column;
}
`;

const Card = styled.div`
height: 64px;
padding: 1.2rem 1rem;
border: 1px solid #E2E4E9;
display: flex;
background-color: #fff;
justify-content: space-between;
align-items: center;
box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 0px;
min-width:248px;
border-radius: 1rem;
transition: all 0.1s ease-in-out;
&:hover{
    border-color: #2F6FED;
    translateX: -5px;
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(182, 207, 250, 1) 0px 2px 4px -1px;
}

@media (max-width: 768px) {
    width: 90%;
}

`;

const Title = styled.div`
font-size: 0.8rem;
font-weight: 500;
color: #5C6270;
`;

const Percentage = styled.div`
font-size: 2rem;
font-weight: 500;
`;

const Icons = styled.div`
font-size: 1.5rem;
color: #2F6FED;
background-color: #EFF5FF;
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
justify-content: space-between;
`;



function StatsGrid() {
  return (
   <Container>
    {stockData.map((item,index) => (
    <Card key={index}>
        <TextSection>
        <Title>{item.title}</Title>
        <Percentage>{item.percentage}</Percentage>
        </TextSection>
        <Icons>{item.icon}</Icons>
    </Card>
    ))}
   </Container>
  )
}

export default StatsGrid