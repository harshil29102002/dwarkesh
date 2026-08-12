import styled from 'styled-components'
import { FiEdit, FiFileText, FiTrash, FiUserCheck } from "react-icons/fi";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Row, RowStatus } from './type';

// type RowStatus = "in-stock" | "reserved" | "sold";

// interface Row {
//   id: number;
//   model: string;
//   godown: string;
//   mfgDate: string;
//   chassis: string;
//   colour: string;
//   engineNo: string;
//   amount: number;
//   status: RowStatus;
// }

interface Handlers {
  onAssignVehicle?: (row: Row) => void;
  onEditDetails?: (row: Row) => void;
  onDeleteUnit?: (row: Row) => void;
  onViewChallan?: (row: Row) => void;
}

interface DataTableProps extends Handlers {
  data?: Row[];
}

interface MenuState {
  rowId: number;
  top: number;
  left: number;
}

interface RowAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SAMPLE_DATA: Row[] = [
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
    border-bottom: 1px solid #E5E7EB;
    background-color: #F5F6F8;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid #E2E4E9;
  transition: background 0.15s ease;
  background-color: #fff;
  &:hover {
    background: #FFF5F5;
    cursor: pointer;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
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
  background: none;
`;

const Badge = styled.div<{ $color: string; $bg: string; $border: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1rem;
  letter-spacing: 0.01em;
  font-weight: 600;
  color: ${(p) => p.$color};
  background-color: ${(p) => p.$bg};
  border: 1px solid ${(p) => p.$border};

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
  background: #501313;
`;

/* FIXED: was styled.button — a button cannot legally contain other buttons */
const OverlayAction = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  border-radius: 0.5rem;
  align-items: flex-start;
  padding: 0.2rem;
  width: 10rem;
  border: 1px solid #E2E4E9;
  background-color: #fff;
  z-index: 50;
`;

const OverlayActionButton = styled.button`
  border: none;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  text-align: left;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  font-family: 'gilroy-Medium', sans-serif;
  border-radius: 0.5rem;
  cursor: pointer;
  background: none;
  width: 100%;
  color: #111827;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  &:hover {
    background-color: #FCEBEB;
    color: #CC0000;
  }
`;

const StatusConfig = {
  "in-stock": { label: "In-Stock", color: "#067647", bg: "#ECFDF3", border: "#067647" },
  reserved: { label: "Reserved", color: "#B54708", bg: "#FFF8EB", border: "#FEDF89" },
  sold: { label: "Sold", color: "#6941C6", bg: "#F4F3FF", border: "#D9D6FE" },
};

const formatINR = (amount: number) =>
  typeof amount === "number" ? `₹${new Intl.NumberFormat("en-IN").format(amount)}` : "—";

const getRowsActions = (status: RowStatus, row: Row, handlers: Handlers): RowAction[] => {
  const normalized = (status || "").toLowerCase();
  switch (normalized) {
    case "in-stock":
      return [
        { key: "assign", label: "Assign Vehicle", icon: <FiUserCheck />, onClick: () => handlers.onAssignVehicle(row) },
        { key: "edit", label: "Edit Details", icon: <FiEdit />, onClick: () => handlers.onEditDetails(row) },
        { key: "delete", label: "Delete Vehicle", icon: <FiTrash />, onClick: () => handlers.onDeleteUnit(row) },
      ];
    case "reserved":
      return [
        { key: "edit", label: "Edit Details", icon: <FiEdit />, onClick: () => handlers.onEditDetails(row) },
        { key: "delete", label: "Delete Unit", icon: <FiTrash />, onClick: () => handlers.onDeleteUnit(row) },
      ];
    case "sold":
      return [
        { key: "view-challan", label: "View Challan", icon: <FiFileText />, onClick: () => handlers.onViewChallan(row) },
        { key: "edit", label: "Edit Details", icon: <FiEdit />, onClick: () => handlers.onEditDetails(row) },
        { key: "delete", label: "Delete Unit", icon: <FiTrash />, onClick: () => handlers.onDeleteUnit(row) },
      ];
    default:
      return []; // FIXED: was falling through to `undefined`, crashing `.map()`
  }
};

const MENU_WIDTH = 190;

const DataTable = ({ data = SAMPLE_DATA, onAssignVehicle = () => {}, onEditDetails = () => {}, onDeleteUnit = () => {}, onViewChallan = () => {} }: DataTableProps) => {
  const [openMenu, setOpenMenu] = useState<MenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null); // FIXED: was HTMLButtonElement

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  useEffect(() => {
    if (!openMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu();
    };
    const handleReposition = () => closeMenu();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [openMenu, closeMenu]);

  const toggleMenu = (e: React.MouseEvent, row: Row) => {
    e.stopPropagation();
    if (openMenu?.rowId === row.id) {
      closeMenu();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setOpenMenu({
      rowId: row.id,
      top: rect.bottom + window.scrollY + 4, // FIXED: was `+ 140` (arbitrary offset) and ignored scroll
      left: Math.max(8, rect.right - MENU_WIDTH),
    });
  };

  const handlers: Handlers = { onAssignVehicle, onEditDetails, onDeleteUnit, onViewChallan };
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
            <Th>Colors</Th>
            <Th>Engine NO</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => {
            const status = StatusConfig[row.status] ?? StatusConfig["in-stock"];
            return (
              <Tr key={row.id}>
                <RowIndex>{index + 1}</RowIndex>
                <ModelName>{row.model}</ModelName>
                <Td style={{ fontFamily: 'gilroy-Medium', fontSize: '14px' }}>{row.godown}</Td>
                <Td style={{ fontFamily: 'gilroy-Bold' }}>{row.mfgDate}</Td>
                <Td style={{ fontFamily: 'gilroy-Bold' }}>{row.chassis}</Td>
                <Td style={{ fontFamily: 'gilroy-Medium', fontSize: '14px' }}>{row.colour}</Td>
                <Td style={{ fontFamily: 'gilroy-Bold' }}>{row.engineNo}</Td>
                <Td style={{ fontFamily: 'gilroy-Bold', fontSize: '14px' }}>{formatINR(row.amount)}</Td>
                <Td>
                  <Badge $color={status.color} $bg={status.bg} $border={status.border}>
                    {status.label}
                  </Badge>
                </Td>
                <Td style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                  <ActionButton onClick={(e) => toggleMenu(e, row)}>
                    <Dot /><Dot /><Dot />
                  </ActionButton>
                </Td>
              </Tr>
            );
          })}

          {openMenu &&
            activeRow &&
            createPortal(
              <OverlayAction ref={menuRef} style={{ top: openMenu.top, left: openMenu.left }}>
                {getRowsActions(activeRow.status, activeRow, handlers).map((action) => (
                  <OverlayActionButton
                    key={action.key}
                    onClick={() => {
                      action.onClick();
                      closeMenu();
                    }}
                  >
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
  );
};

export default DataTable;