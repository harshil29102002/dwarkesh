// import { BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
// import { MdAdminPanelSettings } from "react-icons/md";
import { RiBox3Line } from "react-icons/ri";
import styled from "styled-components";
import { CgNotes } from "react-icons/cg";
import { RiEBikeLine } from "react-icons/ri";
import { IoAnalytics } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import WarehouseIcon from '@iconify-react/lucide/warehouse';
// import { useState } from "react";

const Header = styled.div`
  display: flex;
  padding: 1rem 1rem;
  margin: 0rem;
  background-color: #F7F8FA;
  align-items: center;
  justify-content: space-between;
  font-family: 'gilroy-Medium', sans-serif;
`;

// const Admintoggle = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   position: relative;
//   border: 1px solid #2F6FED;
//   background-color: #2F6FED;
//   padding: 0.2rem;
//   border-radius: 5rem;
// `;

// const Indicator = styled.div<{ $active: boolean }>`
//   position: absolute;
//   top: 0.2rem;
//   bottom: 0.2rem;
//   left: 0.2rem;
//   width: calc(50% - 0.2rem);
//   background-color: #fff;
//   border-radius: 5rem;
//   transition: transform 0.25s ease;
//   transform: translateX(${({ $active }) => ($active === "employee" ? "100%" : "0%")});
// `;

// const Span = styled.span<{ $active: boolean }>`
//   color: ${({ $active }) => ($active ? "#14161A" : "white")};
//   padding: 0.3rem 0.8rem;
//   font-size: 0.8rem;
//   display: flex;
//   position: relative;
//   gap: 0.5rem;
//   align-items: center;
//   border-radius: 5rem;
//   font-weight: bold;
 
//   transition: all 0.3s ease-in-out;

//   svg{
//     width: 1rem;
//     height: 1rem;
//   }
// `;

const AdminAvatar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  color:#14161A;
  line-height: 0.7rem;
  letter-spacing: 0.01em;
`;

const Role = styled.div`
 font-family: 'gilroy-Medium', sans-serif;
  font-size: 0.7rem;
  color: #9AA0AC;
  line-height: 1rem;
  letter-spacing: 0.01em;
`;

const LogOut = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 0.5rem;
font-weight: bold;
font-size: 0.8rem;

svg{
width: 1rem;
height: 1rem;
}
`;

const Logo = styled.div`
display: flex;
align-items: center;
gap: 0.4rem;
font-weight: bold;
font-size: 1.5rem;

svg{
width: 2rem;
height: 2rem;
}
`;

const AdminSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #9AA0AC;
  border-radius: 50%;

`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainNavbar = styled.div`
  background-color: #F7F8FA;
  padding: 1rem;
  border:1px solid #E2E4E9;
 
  
  font-family: 'gilroy-Medium', sans-serif;
  ul{
    display: flex;
    gap: 1rem;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: #F7F8FA;
    padding: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
   
    @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
  }

    li{
      padding: 0.6rem 1rem;
      display: flex;

      gap: 0.5rem;
      align-items: center;
      background-color: #FFF;
      border-radius: 0.5rem;
      cursor: pointer;
       border: 1px solid #E2E4E9;
       border-radius: 2rem;
      font-size: 0.8rem;
      color: #14161A;
      line-height: 1rem;
      letter-spacing: 0.01em;
      font-weight: 500;

      transition: all 0.2s ease-in;
       &:hover{
        background-color: #2F6FED;
        color: white;
       }

       @media screen and (max-width: 768px) {
        text-align: center;
        font-size: 0.7rem;
      }
    }
  }
`;

const SideBar = () => {
  // const [role, setRole] = useState("admin"); 

  return (
    <div>
      <Header>
        <Logo><RiEBikeLine/> DWARKESH</Logo>
        <AdminSection>
          {/* <Admintoggle>
            <Indicator $active={role} />
            <Span $active={role === "admin"} onClick={() => setRole("admin")}>
              <MdAdminPanelSettings />
              Admin
            </Span>
            <Span $active={role === "employee"} onClick={() => setRole("employee")}>
              <BiUser />
              Employee
            </Span>
          </Admintoggle> */}
          <AdminAvatar>
            <Avatar />
            <TextSection>
              <Title>Admin</Title>
              <Role>Administrator</Role>
            </TextSection>
          </AdminAvatar>
          <LogOut>
            {" "}
            <LuLogOut />
            Logout
          </LogOut>
        </AdminSection>
      </Header>
      <MainNavbar>
        <ul>
          <li><RiBox3Line/> Stock Register</li>
          <li><CgNotes/>Delivery challans</li>
          <li><IoAnalytics/>Enterprise Analytics</li>
          <li><WarehouseIcon height="13px"/>Godown Management</li>
          <li><FiUsers/>Staff Management</li>
        </ul>
      </MainNavbar>
    </div>
  );
};

export default SideBar;
