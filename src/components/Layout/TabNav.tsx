import { CgNotes } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
    Package,
    BarChart3,
    Building2,
  } from "lucide-react";

const Bar = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 1rem;
border-bottom: 1px solid #e2e4e9;
padding: 1rem;

`;

const Tab = styled(NavLink)`
padding: 0.5rem 1rem;
background-color: #fff;
border-radius: 0.5rem;
display: flex;
font-size: 0.8rem;
font-family: "gilroy-Medium", sans-serif;
align-items: center;
justify-content: center;
border: 1px solid #e2e4e9;
border-radius: 9999px;
gap: 0.5rem;
color: #14161a;
text-decoration: none;
svg{
width: 1rem;
height: 1rem;    
}

 &:hover {
    background: #CC0000;
    color: #fff;
  }
 
  &.active {
    background: #CC0000;
    border-color: #CC0000;
    color: #fff;
  }
`;


const TABS = [
    { to: "/", label: "Stock Register", icon: <Package /> },
    { to: "/delivery-challans", label: "Delivery Challan", icon:<CgNotes />   },
    { to: "/analytics", label: "EnterPrice Analytics", icon:<BarChart3 /> },
    { to: "/godown-management", label: "Godown Management", icon: <Building2 /> },
    { to: "/staff-management", label: "Staff Management", icon: <FiUsers /> },
]


const TabNav = () =>{
    return(
        <Bar>
        {TABS.map((tab) => (
            <Tab to={tab.to} key={tab.to}>
                {tab.icon}
                {tab.label}
            </Tab>

        ))}
        </Bar>
    )
}

export default TabNav