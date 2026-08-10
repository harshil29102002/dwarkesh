import styled from 'styled-components'
import { RiEBikeLine } from "react-icons/ri";
import { FilterDropdown } from '../../components/UI/FilterDown';
import PagesIcon from '@iconify-react/wordpress/pages';
import { PiExport } from "react-icons/pi";
import { BiSearch } from 'react-icons/bi';
import DataTable from './DataTable';
import AddVehicle from './AddVehicle';
import { useState } from 'react';
import EditVehicle from './EditVehicle';


const Container = styled.div`
display: flex;
gap: 0.8rem;
padding: 1.5rem;    
align-items: center;
border-radius: 0.5rem;
margin: 1rem 1.2rem;
border-radius: 1rem;
border: 1px solid #E2E4E9;
background-color: #F7F8FA;

@media(max-width: 768px){
  flex-direction: column;
}
`;

const SearchInputSection = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
background-color: #fff;
width: 20rem;
border: 1px solid #E2E4E9;
padding: 0.5rem 0.8rem;
border-radius: 0.5rem;

svg{
    width: 1.2rem;
    height: 1.2rem;
    color: #9AA0AC;
    }

    @media(max-width: 768px){
        width: 98%;
    }
`;

const SearchInput = styled.input`
background-color: transparent;
border: none;
height: 1.2rem;
width: 100%;
font-family: 'gilroy-Medium', sans-serif;

&:focus{
    outline: none;
}
`;


const ModelsSection = styled.div`
display: flex;
gap: 0.5rem;

@media(max-width: 768px){
    width: 100%;
}
`;

const ButtonSection = styled.div`
display:flex;
gap: 0.5rem;


@media(max-width: 768px){
   width: 100%;
}
`;


const Button = styled.button`
padding: 0rem 0.5rem;
height: 2.5rem;
width: 10rem;
background-color: #2F6FED;
color: white;
font-family: 'gilroy-Medium', sans-serif;
border-radius: 0.5rem;
border: 1px solid #2F6FED;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
transition: all 0.3s ease-in-out;

svg{
    width: 1.2rem;
    height: 1.2rem;
}

&:hover{
    cursor: pointer;
    background-color: #fff;
    color: #2F6FED;
}

@media(max-width: 768px){
    width: 100%;
}

@media(max-width: 480px){
  font-size: 0.8rem;
  
}
`;



const ToolBar = () => {
    const [isvehicleOpen, setIsvehicleOpen] = useState(false);
const [editingVehicle, setEditingVehicle] = useState(null)
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.1rem'}}>
   <Container>
    <SearchInputSection>
    <BiSearch/>
    <SearchInput placeholder='Search by chasis and Model...'/>
    </SearchInputSection>
    <ModelsSection>
          <FilterDropdown label="All Models" options={['Honda Activa 6G', 'Honda SP 125', 'Honda Activa 125',"Honda Dio 110", "Honda Shine 110"]} value={""} onChange={(value) => console.log(value)}/>
          <FilterDropdown label="All colors" options={['Black', 'Decent Blue Metallic', 'Geny Gray Metallic',"Mate Marshal Green", "Honda Shine 110"]} value={""} onChange={(value) => console.log(value)}/>
    </ModelsSection>
    <ButtonSection>
        <Button><PiExport height={'16x'}/>Export Register</Button>
        <Button><PagesIcon height='16px'/>Bulk Import</Button>
        <Button onClick={() => setIsvehicleOpen(true)}><RiEBikeLine height={'16px'} />Add Vechile</Button>
    </ButtonSection>
   </Container>
   <DataTable
   />

   {isvehicleOpen && (
  <AddVehicle
    onClose={() => setIsvehicleOpen(false)}
    onSubmit={(data) => console.log(data)}
  />
)}

{/* {editingVehicle && (
  <EditVehicle
    vehicle={editingVehicle}
    onClose={() => setEditingVehicle(null)}
    onSubmit={(updatedVehicle) => {
      setVehicles((prev) =>
        prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
      );
      // or: call your API here, e.g. updateVehicle(updatedVehicle)
    }}
  />
)} */}
  
   </div>

  )
}

export default ToolBar