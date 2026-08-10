
import { MdOutlineDelete } from "react-icons/md";
import styled from 'styled-components'
import { FiEdit, FiFileText, FiTrash, FiUserCheck } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";


const SAMPLE_DATA = [
    {
      id: 1,
      model: "Honda Activa 6G",
      godown: "Modasa",
      mfgDate: "",
      chassis: "ME4JF507XG3842101",
      colour: "Decent Blue Metallic",
      engineNo: "JF50E984210",
      amount: 78500,
      status: "In-Stock",
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
      status: "In-Stock",
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

const Shell = styled.div`
 background-color: #F7F8FA;
  border-radius: 1rem;
  overflow-x: auto;
  border: 1px solid #E2E4E9;
  margin: 0rem 1.2rem 1rem 1.2rem;
`;


const Table = styled.table`
font-family: 'gilroy-Regular', sans-serif;
width: 100%;
min-width: 900px;
padding: 1rem;
border-collapse: collapse;
`;

const Thead = styled.thead`
tr {
border-bottom: 1px solid #E2E4E9;
background-color: #F7F8FA;
}
`;

const Tr = styled.tr`
 border-bottom: 1px solid #E2E4E9;
  transition: background 0.15s ease;
 background-color: #fff;
  &:hover {
    background: #F7F8FA;
    cursor: pointer;
  }
 
  &:last-child {
    border-bottom: none;
  }
`;

const Th = styled.th`
padding: 1rem;
text-align: left;
background-color: #;
text-transform: uppercase;
font-weight: 600;
letter-spacing: 0.06em;
color: #14161A;

border-bottom: 1px solid #E2E4E9;
white-space: nowrap;
font-size: 12px;
`;

const Tbody = styled.tbody`
position: relative;
`;

const Td = styled.td`
padding: 1rem;
font-size: 12px;
color: #14161A;

font-weight: 500;
vertical-align: middle;
`;

const RowIndex = styled.td`
 color: #5b6273;
  font-weight: 500;
  font-size: 15px;
  padding: 1.2rem;
  font-variant-numeric: tabular-nums;
`;

const ModelName = styled.td`
  color: #14161A;
  font-weight: 600;
  font-size: 14px;
`;

const ActionButton = styled.button`
  border: none;
  color: #2F6FED;
  display: flex;
  gap: 0.2rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background:none;
`;


const Badge = styled.div<{ $color: string; $bg: string; $border: string }>`
display: inline-flex;
align-items: center;
gap: 0.5rem;
padding: 0.2rem 0.6rem;
border-radius:999px;
font-size: 11px;
line-height: 1rem;
letter-spacing: 0.01em;
font-weight: 600;
color: ${( p ) => p.$color };
background-color: ${( p ) => p.$bg };
border: 1px solid ${( p ) => p.$border };

 &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;



const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
`;

const OverlayAction = styled.button`
 display: flex;
 position: absolute;
 flex-direction: column;
 border-radius: 0.5rem;
 align-items: flex-start;
 top: 40px;
 right: 10px;
 border: none;
 padding: 0.2rem;
 width: 10rem;
 cursor: pointer;
 border: 1px solid #E2E4E9;
 background-color:#fff;
`;

const OverlayActionButton = styled.button`
  border: none;
  color: #2F6FED;
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
  text-align: left;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  font-family: 'gilroy-Medium', sans-serif;
  border-radius: 0.5rem;
  cursor: pointer;
  background:none;
  width: 100%;
  color: #111827;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  } 

  &:hover {
    background-color: #EEF4FF;
    color: #2F6FED;
  }
`;



const StatusConfig = {
    "in-stock": {
        label: "In-Stock",
        color: "#067647",
        bg: "#ECFDF3",
        border: "#067647"
       },
     reserved: {
        label: "Reserved",
         color: "#B54708",
          bg: "#FFF8EB",
           border: "#FEDF89"
        },
     sold: { 
       label: "Sold",
        color: "#6941C6",
         bg: "#F4F3FF",
          border: "#D9D6FE"
        }
   }

   const formatINR = (amount) =>
    typeof amount === "number"
      ? `₹${new Intl.NumberFormat("en-IN").format(amount)}`
      : "—";

const getRowsActions = (status,row,handlers) => {
  const normalized = (status || "").toLowerCase()
  switch(normalized) {
    case "in-stock":
    return [
      {
        key:"assign",
        label:"Assign Vehicle",
        icon:<FiUserCheck/>,
        onClick:() => handlers.onAssignVehicle?.(row)
      },
      {
        key:"edit",
        label:"Edit Details",
        icon:<FiEdit/>,
        onClick:() => handlers.onEditDetails?.(row)
      },
      {
        key:"delete",
        label:"Delete Vehicle",
        icon:<FiTrash/>,
        onClick:() => handlers.ondeleteUnit?.(row)
      }
    ];
    case "reserved":
    return [
      {
        key:"edit",
        icon:<FiEdit/>,
        label:"Edit Details"
      },
      {
        key:"Delete Unit",
        label:"Delete Unit",
        icon:<FiTrash/>,
        onClick:() => handlers.ondeleteUnit?.(row)
      }
    ];

    case "sold":
    return [
      {
        key:"view-challan",
        label:"View Challan",
        icon:<FiFileText/>,
        onClick:() => handlers.onViewChallan?.(row)
      },
      {
        key:"edit",
        label:"Edit Details",
        icon:<FiEdit/>
      },
      {
        key:"Delete Unit",
        label:"Delete Unit",
        icon:<FiTrash/>,
        onClick:() => handlers.ondeleteUnit?.(row)
      }
    ]
    
  }
}


const MENU_WIDTH = 190

const DataTable = ({data = SAMPLE_DATA, onAssignVehicle, onEditDetails,onDeleteUnit, onViewChallan}) => {

  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const closeMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    if(!openMenu) return;
    const handleClickOutside = (e) => {
      if(menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    }

    const handleReposition = () => closeMenu()
    
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    }
  }, [openMenu, closeMenu])


  const toggleMenu = (e,row) => {
    e.stopPropagation();

    if(openMenu?.rowId === row.id){
      closeMenu();
      return
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setOpenMenu({
      rowId: row.id,
      top: rect.bottom + 140,
      left: Math.max(1, rect.right - MENU_WIDTH),
    });
  }

  const handlers = { onAssignVehicle, onEditDetails, onDeleteUnit, onViewChallan };
  const activeRow = data.find((r) => r.id === openMenu?.rowId);
  

  return (
    <Shell>
    <Table>
        <Thead>
            <Tr>
                <Th>Index</Th>
                <Th>Model Name</Th>
                <Th>Godown Name</Th>
                <Th>MFG. Date</Th>
                <Th>Chassis NO</Th>
                <Th>colors</Th>
                <Th>Engine NO</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Action</Th>
            </Tr>
        </Thead>
        <Tbody>
          {data.map((row,index) => {
            const status = StatusConfig[row.status] ?? StatusConfig["in-stock"];
            return (
                <Tr key={row.id}>
                    <RowIndex>{index + 1}</RowIndex>
                    <ModelName>{row.model}</ModelName>
                    <Td style={{fontFamily: 'gilroy-Medium', fontSize: '14px'}}>{row.godown}</Td>
                    <Td style={{fontFamily: 'gilroy-Bold'}}>{row.mfgDate}</Td>
                    <Td style={{fontFamily: 'gilroy-Bold'}}>{row.chassis}</Td>
                    <Td style={{fontFamily: 'gilroy-Medium', fontSize: '14px'}}>{row.colour}</Td>
                    <Td style={{fontFamily: 'gilroy-Bold'}}>{row.engineNo}</Td>
                    <Td style={{fontFamily: 'gilroy-Bold',fontSize: '14px'}}>{formatINR(row.amount)}</Td>
                  
                    <Td style={{fontFamily: 'gilroy-Medium', fontSize: '12px'}}>  <Badge $color={status.color} $bg={status.bg} $border={status.border}>{row.status}</Badge></Td>
                    <Td style={{display: 'flex', gap: '0.5rem' ,alignItems: 'center', justifyContent: 'center'}}>
                    <ActionButton onClick={(e) => toggleMenu(e,row)}> <Dot/><Dot/><Dot/></ActionButton>
                    {/* <ActionButton><BiEdit/></ActionButton>
                    <ActionButton><MdDelete/></ActionButton> */}
                    </Td>
                </Tr>
            )
          })}

{openMenu && 
activeRow &&
createPortal(
  <OverlayAction ref={menuRef} style={{top: openMenu.top, left: openMenu.left}}>
    {getRowsActions(activeRow.status,activeRow,handlers).map((action)=> (
      <OverlayActionButton key={action.key} onClick={() => {
        action.onClick()
         closeMenu()
      }}>
        {action.icon}
        {action.label}
      </OverlayActionButton>
    ))}
          </OverlayAction>, 
          document.body
)}
        </Tbody>
  
    </Table>
    </Shell>
  )
}


export default DataTable

