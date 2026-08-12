import { useMemo, useState } from "react"
import DataTable from "./DataTable"
import StatsGrid from "./StatsGrid"
import ToolBar from "./ToolBar"
import EditVehicle from "./EditVehicle"
import AssignVehicle from "./AssignVehicle"
import styled from "styled-components"
import type { Row } from "./type"


const Titlesection = styled.div`
padding-left: 2rem;
font-family: "gilroy-Medium", sans-serif;
padding-top: 1rem;
line-height: 0.8rem;
h1{
font-size: 1.4rem;

}

p{

color: #6B7280;

}
`;




  const SAMPLE_DATA :Row[] = [
    {
      id: 1,
      model: "Honda Activa 6G",
      godown: "Modasa",
      mfgDate: "",
      chassis: "ME4JF507XG3842101",
      colour: "Decent Blue Metallic",
      engineNo: "JF50E984210",
      amount: 78500,
      status: "in-stock",
    },
    {
      id: 2,
      model: "Honda Shine 125",
      godown: "Modasa",
      mfgDate: "",
      chassis: "ME4HA128YG2190832",
      colour: "Rebel Red Metallic",
      engineNo: "HA12E821908",
      amount: 82300,
      status: "in-stock",
    },
    {
      id: 3,
      model: "Honda CB350 H'ness",
      godown: "Modasa",
      mfgDate: "",
      chassis: "ME4NC591ZG5039123",
      colour: "Matte Marshal Green",
      engineNo: "NC59E750391",
      amount: 210500,
      status: "reserved",
    },
    {
      id: 4,
      model: "Honda Unicorn",
      godown: "Modasa",
      mfgDate: "",
      chassis: "ME4KC821XG3041924",
      colour: "Geny Grey Metallic",
      engineNo: "KC82E930419",
      amount: 129900,
      status: "sold",
    },
  ];

const StockRegister = () => {

    const [assigningRow, setAssigningRow] = useState<Row|null>(null);
    const [editRow, setEditRow] = useState<Row|null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modelFilter, setModelFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [rows] = useState<Row[]>(SAMPLE_DATA);

    const handleAssignVehicle = (row: Row) => {
        setAssigningRow(row);
      };

      const handleEditDetails = (row: Row) => {
        setEditRow(row);
      }

      const filterRows = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        return rows.filter((row) => {
          const matchesSearch = !term || row.model.toLowerCase().includes(term) || row.chassis.toLowerCase().includes(term) 
          const matchesModel = !modelFilter || row.model === modelFilter;
          const matchesColor = !colorFilter || row.colour === colorFilter;
          return matchesSearch && matchesModel && matchesColor;
        })
      },[rows, searchTerm, modelFilter, colorFilter]);

  return (
    <div>
        <Titlesection>
        <h1 style={{marginBottom: '0.4rem'}}>Stock Register</h1>
        <p>Manage the stock of your dealership.</p>
        </Titlesection>
        <StatsGrid/>
        <ToolBar 
        data={filterRows}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        modelFilter={modelFilter}
        onModelChange={setModelFilter}
        colorFilter={colorFilter}
        onColorChange={setColorFilter}
        />

        <DataTable
        data={filterRows}
        onAssignVehicle={handleAssignVehicle}
        onEditDetails={handleEditDetails}
        onDeleteUnit={(row) => console.log(row)} 
        onViewChallan={(row) => console.log(row)}
        
        />
   
   {editRow && (
        <EditVehicle
        vehicle={editRow}
        onSubmit={(row) => console.log(row)}
        onClose={() => setEditRow(null)}
        />

   )}
   
   {
     assigningRow && (
       <AssignVehicle
       row={assigningRow}
       onClose={() => setAssigningRow(null)}
       onFinalize={(payload) => console.log(payload)}
       />
     )
   }
            
    </div>
  )
}

export default StockRegister