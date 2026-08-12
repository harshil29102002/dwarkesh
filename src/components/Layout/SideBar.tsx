import { LuLogOut } from "react-icons/lu";
import styled from "styled-components";
import LogoImg  from "../../assets/honda.png"


const Header = styled.div`
  display: flex;
  padding: 1rem 1rem;
  margin: 0rem;
  background-color: #CC0000;
  color: #fff;
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
  color:#fff;
  line-height: 0.7rem;
  letter-spacing: 0.01em;
`;

const Role = styled.div`
 font-family: 'gilroy-Medium', sans-serif;
  font-size: 0.7rem;
  color: #fff;
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

img{
width: 2.5rem;
height: 2.5rem;
border-radius: 10%;
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
  background-color: #fff;
  border-radius: 50%;

`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;



const SideBar = () => {
  // const [role, setRole] = useState("admin"); 

  return (
    <div>
      <Header>
        <Logo><img src={LogoImg}/> DWARKESH</Logo>
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
    </div>
  );
};

export default SideBar;
