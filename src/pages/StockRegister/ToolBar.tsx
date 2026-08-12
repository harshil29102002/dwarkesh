import styled from 'styled-components'
import { RiEBikeLine } from "react-icons/ri";
import { FilterDropdown } from '../../components/UI/FilterDown';
import PagesIcon from '@iconify-react/wordpress/pages';
import { PiExport } from "react-icons/pi";
import { BiSearch } from 'react-icons/bi';
import AddVehicle from './AddVehicle';
import { useState } from 'react';
import { exportToExcel } from '../../Utils/exportToExcel';
// import DataTable from './DataTable';

type RowStatus = "in-stock" | "reserved" | "sold";

interface Row {
  id: number;
  model: string;
  godown: string;
  mfgDate: string;
  chassis: string;
  colour: string;
  engineNo: string;
  amount: number;
  status: RowStatus;
}

const Container = styled.div`
display: flex;
gap: 0.8rem;
padding: 1.5rem;    
align-items: center;
border-radius: 0.5rem;
margin: 1rem 1.2rem;
border-radius: 1rem;
border: 1px solid #E2E4E9;
background-color: #fff;

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
    border-color:#F5B8B8;
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
background-color: #CC0000;
color: white;
font-family: 'gilroy-Medium', sans-serif;
border-radius: 0.5rem;
border: 1px solid #CC0000;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
font-size: 0.9rem;
transition: all 0.3s ease-in-out;

svg{
    width: 1.2rem;
    height: 1.2rem;
}



&:hover{
    cursor: pointer;
    background-color: #B30000;
    color: #fff;
}

@media(max-width: 768px){
    width: 100%;
}

@media(max-width: 480px){
  font-size: 0.8rem;
  
}
`;

const MODEL_OPTIONS = [
  "Honda Activa 6G",
  "Honda Shine 125",
  "Honda CB350 H'ness",
  "Honda Unicorn",
  "Honda SP 125",
  "Honda Activa 125",
  "Honda Dio 110",
];

const COLOR_OPTIONS = [
  "Decent Blue Metallic",
  "Rebel Red Metallic",
  "Matte Marshal Green",
  "Geny Grey Metallic",
];

interface ToolBarProps {
  data: Row[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  modelFilter: string;
  onModelChange: (value: string) => void;
  colorFilter: string;
  onColorChange: (value: string) => void;
 
}

// const STATUS_OPTIONS = ["in-stock", "reserved", "sold"];

const ToolBar = ({ data, searchTerm, onSearchChange, modelFilter, onModelChange, colorFilter, onColorChange }: ToolBarProps) => {
    const [isvehicleOpen, setIsvehicleOpen] = useState(false);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.1rem'}}>
   <Container>
    <SearchInputSection>
    <BiSearch/>
    <SearchInput placeholder='Search by chasis and Model...' value={searchTerm} onChange={(e) => onSearchChange(e.target.value)}/>
    </SearchInputSection>
    <ModelsSection>
          <FilterDropdown label="All Models" options={MODEL_OPTIONS} value={modelFilter} onChange={onModelChange}/>
          <FilterDropdown label="All colors" options={COLOR_OPTIONS} value={colorFilter} onChange={onColorChange}/>
    </ModelsSection>
    <ButtonSection>
        <Button onClick={() => exportToExcel(data)}><PiExport height={'16x'} />Export Register</Button>
        <Button><PagesIcon height='16px'/>Bulk Import</Button>
        <Button onClick={() => setIsvehicleOpen(true)}><RiEBikeLine height={'16px'} />Add Vehicle</Button>
    </ButtonSection>
   </Container>
  

   {isvehicleOpen && (
  <AddVehicle
    onClose={() => setIsvehicleOpen(false)}
    onSubmit={(data) => console.log(data)}
  />
)}

  
   </div>

  )
}

export default ToolBar