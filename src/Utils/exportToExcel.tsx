// utils/exportToExcel.ts
import * as XLSX from "xlsx";

interface Row {
  model: string;
  godown: string;
  mfgDate: string;
  chassis: string;
  colour: string;
  engineNo: string;
  amount: number;
  status: string;
}

export const exportToExcel = (data: Row[], fileName = "StockRegister") => {
  const exportData = data.map((row, i) => ({
    "Sr No": i + 1,
    "Model": row.model,
    "Godown": row.godown,
    "MFG Date": row.mfgDate,
    "Chassis No": row.chassis,
    "Colour": row.colour,
    "Engine No": row.engineNo,
    "Amount": row.amount,
    "Status": row.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Register");
  XLSX.writeFile(workbook, `${fileName}_${Date.now()}.xlsx`);
};