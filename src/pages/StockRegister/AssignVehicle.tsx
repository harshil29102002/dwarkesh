import { forwardRef, useRef, useState } from "react";
import { FiDownload, FiFile, FiPrinter, FiUpload } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import styled, { keyframes } from "styled-components";
import type { Row } from "./type";



interface BuyerDetials {
  buyerName: string;
  contactNumbers: string;
  salesPrice: string;
  deliveryAddress: string;
}

// ---- Vehicle handover checklist (left half of the printed chalan table) ----
interface HandoverChecklist {
  keyStNo: string;
  omBook: string;
  mirror: string;
  firstAidKit: string;
  toolSet: string;
  batteryNo: string;
  invoiceNo: string;
  serviceBookGiven: string;
}

// ---- Charges / values (right half of the printed chalan table) ----
interface ChargesDetails {
  bookingDate: string;
  dob: string;
  invoiceValue: string;
  rtoPassing: string;
  insurance: string;
  accessoriesValue: string;
  crtmAmc: string;
  extendedWarranty: string;
}

// ---- Reference, contact & exchange details (bottom half of the chalan) ----
interface ChalanReferenceDetails {
  variant: string;
  refName: string;
  refAddress: string;
  refTelNo: string;
  fullName: string;
  telNo: string;
  email: string;
  hpaWith: string;
  exchangeModel: string;
  exchangeYear: string;
  exchangeValue: string;
  remarks: string;
}

interface FinalizePayload {
  row: Row;
  buyer: BuyerDetials;
  documents: File[];
  chalanNumber: string;
  handover: HandoverChecklist;
  charges: ChargesDetails;
  reference: ChalanReferenceDetails;
}

// Edit these to match the real dealership letterhead / footer.
const DEALER_INFO = {
  name: "DWARKESH AUTO",
  tagline: "Honda Exclusive Authorised Dealer",
  officeAddress:
    "H.Office : S.No. 39/1, Modasa Shamlaji Road, Nr. G.I.D.C., Ganeshpur, Modasa-383315.",
  phone: "Tel (02774) 242961",
};

function toNumber(v: string) {
  const n = parseFloat((v || "").replace(/[^0-9.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
}

function calcTotal(charges: ChargesDetails) {
  return (
    toNumber(charges.invoiceValue) +
    toNumber(charges.rtoPassing) +
    toNumber(charges.insurance) +
    toNumber(charges.accessoriesValue) +
    toNumber(charges.crtmAmc) +
    toNumber(charges.extendedWarranty)
  );
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;



interface AssignVehicleDrawerProps {
  row: Row;
  onClose: () => void;
  // Called on "Finalize delivery" in step 3. Do your API calls here
  // (upload docs, mark row sold, persist chalan record) then resolve.
  onFinalize: (payload: FinalizePayload) => Promise<void> | void;
}

const STEPS = ["Buyer & Price", "KYC Upload", "Chalan PDF"] as const;




const Overlay = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1000;

  @media print {
    position: static;
    background: none;
  }
`;

const Drawer = styled.div`
  height: 100%;
  width: min(520px, 100%);
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid #e2e4e9;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: #14161a;
  font-family: "gilroy-Medium", sans-serif;

  animation: ${slideIn} 0.3s ease-in-out;

  @media print {
    width: 100%;
    height: auto;
    border: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem;
  border-bottom: 1px solid #e2e4e9;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-family: "gilroy-Bold", sans-serif;
`;
const CloseButton = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #14161a;

  &:hover {
    color: #B30000;
    background-color: #FFF5F5;
  }
`;

const Stepper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem 1.5rem;
  gap: 0.5rem;
  border-bottom: 1px solid #e2e4e9;

  @media print {
    display: none;
  }
`;

const StepItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
  
  position: relative;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 16px;
    left: 55%;
    width: 90%;
    height: 1.5px;
    background-color: ${(p) => (p.$active ? "#B30000" : "#e2e4e9")};
  }
`;

const StepCircle = styled.div<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  background-color: #FFF5F5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 0.8rem;
   border: 1.5px solid ${(p) => (p.$active ? '#B30000' : '#e2e4e9')};
  color: ${(p) => (p.$active ? '#B30000' : '#6b7280')};
  font-family: "gilroy-Bold", sans-serif;
`;

const StepLabel = styled.div<{ $active: boolean }>`
  font-family: "gilroy-Bold", sans-serif;
  font-size: 0.8rem;
  color: ${(p) => (p.$active ? "#B30000" : "#6b7280")};
`;

const SpecCard = styled.div`
  margin: 1.5rem 1.5rem;
  background-color: #FFF5F5;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #F5B8B8;
`;

const SpecsName = styled.div`
  font-size: 0.8rem;
  font-family: "gilroy-Bold", sans-serif;
  color: #CC0000;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  
`;

const SpecRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: #14161a;

  h3 {
    font-size: 1.3rem;
    font-family: "gilroy-Medium", sans-serif;
    margin: 0rem;
  }

  span {
    color: #000;
    flex: 1;
    font-size: 0.8rem;
  }
`;

const SpecVehicle = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0.5rem 0;
  font-size: 0.8rem;
  color: #14161a;

  code {
    color: #6b7280;
    margin-left: 0.2rem;
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    border: 1px solid #e2e4e9;
    font-weight: 600;
  }
`;



const Body = styled.div`
  flex: 1;
  padding: 0 2rem;
`;

const Footer = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #e2e4e9;
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #f7f8fa;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid #e2e4e9;
  font-family: "gilroy-Medium", sans-serif;
  color: #14161a;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e2e4e9;
  }
`;

const PrimaryButton = styled.button`
  background-color: #CC0000;
  flex: 1;
  text-align: center;
  border: none;
  color: #fff;
  font-size: 0.9rem;
  
  font-family: "gilroy-Medium", sans-serif;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #B30000;
  }
`;

const Field = styled.div`
  display: block;
  font-size: 0.85rem;
  padding: 0.4rem;
  font-family: "gilroy-Medium", sans-serif;
  font-weight: 600;
  margin-bottom: 0.4rem;
  textarea {
    display: block;
    margin-top: 0.4rem;
    width: 100%;
    background-color: #f7f8fa;
    color: #14161a;
    border: 1px solid #e2e4e9;
    padding: 0.7rem 0.9rem;
    border-radius: 0.5rem;
    outline: none;

    &::placeholder {
      color: #5b6273;
      font-family: "gilroy-Medium", sans-serif;
    }

    &:focus {
      outline: none;
      border-color: #22d3ee;
    }
  }
`;

const InputField = styled.input`
  width: 100%;
  display: block;
  margin-top: 0.4rem;
  background-color: #f7f8fa;
  color: #14161a;
  border: 1px solid #e2e4e9;
  padding: 0.7rem 0.9rem;
  border-radius: 0.5rem;
  outline: none;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Dropzone = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.5rem 1rem;
  gap: 0.5rem;
  border: 2px dashed #e2e4e9;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  input {
    display: none;
  }



  &:hover {
    border-color: #CC0000;
  }
  `;

  const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid #CC0000;
  background: #CC0000;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
 
  &:hover {
    background: #B30000;
  }
`;

  const DocList = styled.ul`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  `;


  const DocItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f7f8fa;
  margin: 0rem 0rem 1rem 0;  
  border: 1px solid #e2e4e9;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-family: "gilroy-Medium", sans-serif;
  color: #14161a;
  `;


  const ChallanSection = styled.div`
  margin: 0rem 0rem 1rem 0;
  `;


  const ChalanActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: flex-end;
  `;

  const ChalanActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
 
  p {
    font-size: 0.8rem;
    color: #9aa5b8;
    font-family: "gilroy-Medium", sans-serif;
    margin: 0;
  }
 
  div {
    display: flex;
    
    gap: 0.75rem;
  }
 
  @media print {
    display: none;
  }
`;

const ChalanPreview = styled.div`
  background: #fff;
  color: #14161a;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #e2e4e9;
  font-family: "gilroy-Medium", sans-serif;
 
  @media print {
    border-radius: 0;
    padding: 0;
  }
`;

// ---------------------------------------------------------------------------
// Printed-chalan styling — mirrors the physical Dwarkesh Auto D.C. book page:
// letterhead, D.C. No. / Date block, dotted fill-in lines, the 9-row
// particulars/qty + other-details table, remarks box, reference & exchange
// lines, and the two signature boxes at the bottom.
// ---------------------------------------------------------------------------

const ChalanLetterhead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 2px solid #14161a;
  padding-bottom: 0.75rem;
  margin-bottom: 0.9rem;

  h1 {
    font-size: 1.4rem;
    letter-spacing: 0.03em;
    margin: 0;
    font-family: "gilroy-Bold", sans-serif;
  }

  .tagline {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: #5b6273;
    text-transform: uppercase;
    margin-top: 0.2rem;
    font-weight: 600;
  }
`;

const ChalanMetaBox = styled.div`
  text-align: right;
  font-size: 0.8rem;
  white-space: nowrap;

  p {
    margin: 0.15rem 0;
  }

  strong {
    font-family: "gilroy-Bold", sans-serif;
  }
`;

const ChalanIntro = styled.p`
  font-size: 0.85rem;
  margin: 0 0 0.75rem;
`;

const DottedLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.82rem;
  margin-bottom: 0.55rem;
  flex-wrap: wrap;

  .label {
    color: #14161a;
    font-weight: 700;
    white-space: nowrap;
  }

  .value {
    flex: 1;
    min-width: 50px;
    border-bottom: 1px dotted #6b7280;
    padding: 0 0.3rem 0.1rem;
    font-weight: 600;
    min-height: 1.1em;
  }
`;

const DottedLineRow = styled.div`
  display: flex;
  gap: 1.5rem;

  ${DottedLine} {
    flex: 1;
  }
`;

const ChalanTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.76rem;
  margin: 0.9rem 0;

  th,
  td {
    border: 1px solid #14161a;
    padding: 0.32rem 0.5rem;
  }

  th {
    background: #f7f8fa;
    text-align: left;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  td.sr {
    text-align: center;
    width: 1.8rem;
  }

  td.qty {
    text-align: center;
    width: 3.2rem;
  }

  td.detail-label {
    color: #5b6273;
    width: 40%;
  }

  td.detail-value {
    text-align: right;
    font-weight: 700;
  }

  tr.total td {
    font-weight: 700;
    border-top: 2px solid #14161a;
  }
`;

const RemarksBox = styled.div`
  border: 1px solid #14161a;
  margin-bottom: 0.9rem;

  .remarks-header {
    text-align: center;
    font-weight: 700;
    font-size: 0.78rem;
    padding: 0.35rem;
    background: #f7f8fa;
    border-bottom: 1px solid #14161a;
    text-transform: uppercase;
  }

  .remarks-body {
    padding: 0.6rem 0.75rem;
    min-height: 2.2rem;
    font-size: 0.82rem;
    white-space: pre-wrap;
  }
`;

const SignatureRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2.5rem;
`;

const SignatureBox = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  padding-top: 2.2rem;
  border-top: 1px solid #14161a;
`;

const ChalanFooter = styled.div`
  text-align: center;
  font-size: 0.7rem;
  color: #5b6273;
  margin-top: 1.4rem;
  border-top: 1px solid #e2e4e9;
  padding-top: 0.5rem;

  p {
    margin: 0.1rem 0;
  }
`;

// ---- Editable inputs for the checklist / charges / reference sections ----

const FormSectionTitle = styled.div`
  font-size: 0.8rem;
  font-family: "gilroy-Bold", sans-serif;
  color: #CC0000;
  text-transform: uppercase;
  margin: 1.25rem 0 0.6rem;

  @media print {
    display: none;
  }
`;

const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1rem;
  margin-bottom: 0.5rem;

  @media print {
    display: none;
  }
`;

const MiniField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #5b6273;

  input,
  textarea {
    font-size: 0.82rem;
    font-weight: 500;
    font-family: "gilroy-Medium", sans-serif;
    color: #14161a;
    background: #f7f8fa;
    border: 1px solid #e2e4e9;
    border-radius: 0.4rem;
    padding: 0.5rem 0.6rem;
    outline: none;

    &:focus {
      border-color: #CC0000;
    }
  }
`;

const MiniFieldFull = styled(MiniField)`
  grid-column: 1 / -1;
`;

  
function BuyersPriceSteps({
  buyer,
  setBuyer,
}: {
  buyer: BuyerDetials;
  setBuyer: (b: BuyerDetials) => void;
}) {
  return (
    <>
      <Field>
        Buyer's full name
        <InputField
          placeholder="Buyer Name"
          value={buyer.buyerName}
          onChange={(e) => setBuyer({ ...buyer, buyerName: e.target.value })}
        />
      </Field>
      <FieldRow>
        <Field>
          Contact number
          <InputField
            placeholder="e.g. 1234567890"
            value={buyer.contactNumbers}
            onChange={(e) =>
              setBuyer({ ...buyer, contactNumbers: e.target.value })
            }
          />
        </Field>
        <Field>
          Sales price
          <InputField
            placeholder="e.g. 1234567890"
            value={buyer.salesPrice}
            onChange={(e) => setBuyer({ ...buyer, salesPrice: e.target.value })}
          />
        </Field>
      </FieldRow>
      <Field>
        Delivery address
        <textarea
          rows={3}
          placeholder="e.g. 12, Station Road, Modasa, Gujarat"
          value={buyer.deliveryAddress}
          onChange={(e) =>
            setBuyer({ ...buyer, deliveryAddress: e.target.value })
          }
        />
      </Field>
    </>
  );
}

function KycUploadStep({
    documents,
    onFileChange,
}:{
    documents: File[];
    onFileChange:(files:FileList | null) => void;
}) {
    return(
        <>
        <p style={{fontSize:"0.8rem",marginBottom:"0.5rem",color:"black"}}>Upload documents
        Upload identification files and KYC proofs (Aadhaar Card, PAN Card, Purchase receipt, or signature sheet). Enforced file upload limit: &nbsp;5 MB per file.
        </p>
        <Dropzone>
        <FiUpload size={22} />
        <strong>Drag & drop customer KYC proofs</strong>
        <span>or click to select files</span>
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={(e) => onFileChange(e.target.files)}
        />
      </Dropzone>
      <div style={{fontSize:"0.85rem",margin:"1.25rem 0 0.25rem",color:"black",fontWeight:600}}>
        Uploaded document
      </div>
      {documents.length === 0 ? (
        <p style={{fontSize:"0.8rem",marginBottom:"0.5rem",color:"#5b6273",textAlign:"center",padding:"1rem 0"}}>No documents uploaded yet.</p>
      ):(
        <DocList>
            {documents.map((doc,index) => (
                <DocItem key={`${doc.name}-${index}`}>
                    <FiFile/>
                    <span>{doc.name}</span>
                </DocItem>
            ))}
        </DocList>
      )
      }
            </>

    )
}

// Editable inputs feeding the printed chalan below. Hidden on @media print —
// only the ChalanPdfStep preview is meant to be printed/exported.
function ChalanDetailsForm({
  handover,
  setHandover,
  charges,
  setCharges,
  reference,
  setReference,
}: {
  handover: HandoverChecklist;
  setHandover: (h: HandoverChecklist) => void;
  charges: ChargesDetails;
  setCharges: (c: ChargesDetails) => void;
  reference: ChalanReferenceDetails;
  setReference: (r: ChalanReferenceDetails) => void;
}) {
  return (
    <>
      <FormSectionTitle>Vehicle handover checklist</FormSectionTitle>
      <MiniGrid>
        <MiniField>
          Key St No.
          <input
            value={handover.keyStNo}
            onChange={(e) => setHandover({ ...handover, keyStNo: e.target.value })}
          />
        </MiniField>
        <MiniField>
          O.M. Book (Service Book)
          <input
            value={handover.omBook}
            onChange={(e) => setHandover({ ...handover, omBook: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Mirror
          <input
            value={handover.mirror}
            onChange={(e) => setHandover({ ...handover, mirror: e.target.value })}
          />
        </MiniField>
        <MiniField>
          First Aid Kit
          <input
            value={handover.firstAidKit}
            onChange={(e) => setHandover({ ...handover, firstAidKit: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Tool Set
          <input
            value={handover.toolSet}
            onChange={(e) => setHandover({ ...handover, toolSet: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Battery No.
          <input
            value={handover.batteryNo}
            onChange={(e) => setHandover({ ...handover, batteryNo: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Invoice No.
          <input
            value={handover.invoiceNo}
            onChange={(e) => setHandover({ ...handover, invoiceNo: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Service Book Given
          <input
            value={handover.serviceBookGiven}
            onChange={(e) =>
              setHandover({ ...handover, serviceBookGiven: e.target.value })
            }
          />
        </MiniField>
      </MiniGrid>

      <FormSectionTitle>Charges & values</FormSectionTitle>
      <MiniGrid>
        <MiniField>
          Booking Date
          <input
            type="date"
            value={charges.bookingDate}
            onChange={(e) => setCharges({ ...charges, bookingDate: e.target.value })}
          />
        </MiniField>
        <MiniField>
          D.O.B.
          <input
            type="date"
            value={charges.dob}
            onChange={(e) => setCharges({ ...charges, dob: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Invoice Value (₹)
          <input
            value={charges.invoiceValue}
            onChange={(e) => setCharges({ ...charges, invoiceValue: e.target.value })}
          />
        </MiniField>
        <MiniField>
          R.T.O. Passing (₹)
          <input
            value={charges.rtoPassing}
            onChange={(e) => setCharges({ ...charges, rtoPassing: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Insurance (₹)
          <input
            value={charges.insurance}
            onChange={(e) => setCharges({ ...charges, insurance: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Accessories Value (₹)
          <input
            value={charges.accessoriesValue}
            onChange={(e) =>
              setCharges({ ...charges, accessoriesValue: e.target.value })
            }
          />
        </MiniField>
        <MiniField>
          C.R.T.M / AMC (₹)
          <input
            value={charges.crtmAmc}
            onChange={(e) => setCharges({ ...charges, crtmAmc: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Extended Warranty (₹)
          <input
            value={charges.extendedWarranty}
            onChange={(e) =>
              setCharges({ ...charges, extendedWarranty: e.target.value })
            }
          />
        </MiniField>
      </MiniGrid>

      <FormSectionTitle>Reference & exchange details</FormSectionTitle>
      <MiniGrid>
        <MiniField>
          Variant
          <input
            value={reference.variant}
            onChange={(e) => setReference({ ...reference, variant: e.target.value })}
          />
        </MiniField>
        <MiniField>
          H.P.A. with
          <input
            value={reference.hpaWith}
            onChange={(e) => setReference({ ...reference, hpaWith: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Ref. Name
          <input
            value={reference.refName}
            onChange={(e) => setReference({ ...reference, refName: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Ref. Tel. No.
          <input
            value={reference.refTelNo}
            onChange={(e) => setReference({ ...reference, refTelNo: e.target.value })}
          />
        </MiniField>
        <MiniFieldFull>
          Ref. Address
          <input
            value={reference.refAddress}
            onChange={(e) => setReference({ ...reference, refAddress: e.target.value })}
          />
        </MiniFieldFull>
        <MiniField>
          Full Name
          <input
            value={reference.fullName}
            onChange={(e) => setReference({ ...reference, fullName: e.target.value })}
          />
        </MiniField>
        <MiniField>
          Tel. No.
          <input
            value={reference.telNo}
            onChange={(e) => setReference({ ...reference, telNo: e.target.value })}
          />
        </MiniField>
        <MiniFieldFull>
          E-mail
          <input
            value={reference.email}
            onChange={(e) => setReference({ ...reference, email: e.target.value })}
          />
        </MiniFieldFull>
        <MiniField>
          Exchange Model
          <input
            value={reference.exchangeModel}
            onChange={(e) =>
              setReference({ ...reference, exchangeModel: e.target.value })
            }
          />
        </MiniField>
        <MiniField>
          Exchange Year
          <input
            value={reference.exchangeYear}
            onChange={(e) =>
              setReference({ ...reference, exchangeYear: e.target.value })
            }
          />
        </MiniField>
        <MiniField>
          Exchange Value (₹)
          <input
            value={reference.exchangeValue}
            onChange={(e) =>
              setReference({ ...reference, exchangeValue: e.target.value })
            }
          />
        </MiniField>
        <MiniFieldFull>
          Remarks of Departs & Initials
          <textarea
            rows={2}
            value={reference.remarks}
            onChange={(e) => setReference({ ...reference, remarks: e.target.value })}
          />
        </MiniFieldFull>
      </MiniGrid>
    </>
  );
}

const ChalanPdfStep = forwardRef<
  HTMLDivElement,
  {
    row: Row;
    buyer: BuyerDetials;
    chalanNumber: string;
    handover: HandoverChecklist;
    charges: ChargesDetails;
    reference: ChalanReferenceDetails;
    onPrint: () => void;
    onDownload: () => void;
  }
>(({ row, buyer, chalanNumber, handover, charges, reference, onPrint, onDownload }, ref) => {
  const today = new Date().toLocaleDateString("en-IN");
  const total = calcTotal(charges);

  const checklistRows: { sr: number; label: string; value: string }[] = [
    { sr: 1, label: "Key St No.", value: handover.keyStNo },
    { sr: 2, label: "O.M. Book (Service Book)", value: handover.omBook },
    { sr: 3, label: "Mirror", value: handover.mirror },
    { sr: 4, label: "First Aid Kit", value: handover.firstAidKit },
    { sr: 5, label: "Tool Set", value: handover.toolSet },
    { sr: 6, label: "Battery No.", value: handover.batteryNo },
    { sr: 7, label: "Invoice No.", value: handover.invoiceNo },
    { sr: 8, label: "Service Book Given", value: handover.serviceBookGiven },
    { sr: 9, label: "", value: "" },
  ];

  const chargeRows: { label: string; value: string }[] = [
    { label: "Booking Date", value: charges.bookingDate },
    { label: "D.O.B.", value: charges.dob },
    { label: "Invoice Value", value: charges.invoiceValue ? `₹${charges.invoiceValue}` : "" },
    { label: "R.T.O. Passing Rs.", value: charges.rtoPassing ? `₹${charges.rtoPassing}` : "" },
    { label: "Insurance Rs.", value: charges.insurance ? `₹${charges.insurance}` : "" },
    { label: "Accessories Value", value: charges.accessoriesValue ? `₹${charges.accessoriesValue}` : "" },
    { label: "C.R.T.M/AMC", value: charges.crtmAmc ? `₹${charges.crtmAmc}` : "" },
    { label: "Extended Warranty", value: charges.extendedWarranty ? `₹${charges.extendedWarranty}` : "" },
  ];

  return (
    <ChallanSection>
      <ChalanActions>
        <p>Verify the compiled delivery chalan details.</p>
        <ChalanActionButtons>
          <IconButton onClick={onPrint}>
            <FiPrinter /> Print
          </IconButton>
          <IconButton onClick={onDownload}>
            <FiDownload /> Download PDF
          </IconButton>
        </ChalanActionButtons>
      </ChalanActions>

      <ChalanPreview ref={ref} id="chalan-print-area">
        <ChalanLetterhead>
          <div>
            <h1>{DEALER_INFO.name}</h1>
            <div className="tagline">{DEALER_INFO.tagline}</div>
          </div>
          <ChalanMetaBox>
            <p>
              <strong>D.C. No.</strong> {chalanNumber}
            </p>
            <p>
              <strong>Date:</strong> {today}
            </p>
          </ChalanMetaBox>
        </ChalanLetterhead>

        <ChalanIntro>
          Dear Sir,
          <br />
          Today we have received from you
        </ChalanIntro>

        <DottedLine>
          <span className="label">HONDA</span>
          <span className="value">{row.model}</span>
          <span className="label">Colour</span>
          <span className="value">{row.colour}</span>
          <span className="label">Varient</span>
          <span className="value">{reference.variant || "—"}</span>
        </DottedLine>
        <DottedLine>
          <span className="label">Bearing Engine No.</span>
          <span className="value">{row.engineNo}</span>
        </DottedLine>
        <DottedLine>
          <span className="label">Chasis No.</span>
          <span className="value">{row.chassis}</span>
        </DottedLine>

        <ChalanTable>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Particulars</th>
              <th>Qty.</th>
              <th colSpan={2}>Other Derails</th>
            </tr>
          </thead>
          <tbody>
            {checklistRows.map((item, i) => {
              const isLastRow = i === checklistRows.length - 1;
              return (
                <tr key={item.sr} className={isLastRow ? "total" : undefined}>
                  <td className="sr">{item.sr}</td>
                  <td>{item.label}</td>
                  <td className="qty">{item.value}</td>
                  <td className="detail-label">
                    {isLastRow ? "TOTAL" : chargeRows[i].label}
                  </td>
                  <td className="detail-value">
                    {isLastRow ? `₹${total.toFixed(2)}` : chargeRows[i].value || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ChalanTable>

        <RemarksBox>
          <div className="remarks-header">Remarks of Departs &amp; Initials</div>
          <div className="remarks-body">{reference.remarks || " "}</div>
        </RemarksBox>

        <DottedLineRow>
          <DottedLine>
            <span className="label">Ref. Name</span>
            <span className="value">{reference.refName || "—"}</span>
          </DottedLine>
        </DottedLineRow>
        <DottedLineRow>
          <DottedLine>
            <span className="label">Address</span>
            <span className="value">{reference.refAddress || "—"}</span>
          </DottedLine>
          <DottedLine>
            <span className="label">Tel. No.</span>
            <span className="value">{reference.refTelNo || "—"}</span>
          </DottedLine>
        </DottedLineRow>
        <DottedLine>
          <span className="label">Full Name</span>
          <span className="value">{buyer.buyerName || reference.fullName || "—"}</span>
        </DottedLine>
        <DottedLineRow>
          <DottedLine>
            <span className="label">Tel. No.</span>
            <span className="value">{buyer.contactNumbers || reference.telNo || "—"}</span>
          </DottedLine>
          <DottedLine>
            <span className="label">E-mail</span>
            <span className="value">{reference.email || "—"}</span>
          </DottedLine>
        </DottedLineRow>
        <DottedLine>
          <span className="label">H.P.A. with</span>
          <span className="value">{reference.hpaWith || "—"}</span>
        </DottedLine>
        <DottedLineRow>
          <DottedLine>
            <span className="label">Exchange Derails : Model</span>
            <span className="value">{reference.exchangeModel || "—"}</span>
          </DottedLine>
          <DottedLine>
            <span className="label">Year</span>
            <span className="value">{reference.exchangeYear || "—"}</span>
          </DottedLine>
          <DottedLine>
            <span className="label">Exchange Value</span>
            <span className="value">{reference.exchangeValue || "—"}</span>
          </DottedLine>
        </DottedLineRow>

        <SignatureRow>
          <SignatureBox>Receiver's Signature</SignatureBox>
          <SignatureBox>
            For, {DEALER_INFO.name}
            <br />
            Authorised Signatory
          </SignatureBox>
        </SignatureRow>

        <ChalanFooter>
          <p>{DEALER_INFO.officeAddress}</p>
          <p>{DEALER_INFO.phone}</p>
        </ChalanFooter>
      </ChalanPreview>
    </ChallanSection>
  );
});
ChalanPdfStep.displayName = "ChalanPdfStep";

const AssignVehicle = ( { row, onClose, onFinalize }: AssignVehicleDrawerProps) => {
  const [step, setStep] = useState(1);
  const [buyer, setBuyer] = useState<BuyerDetials>({
    buyerName: "",
    contactNumbers: "",
    salesPrice: "",
    deliveryAddress: "",
  });

  const [documents, setDocuments] = useState<File[]>([]);

  const [handover, setHandover] = useState<HandoverChecklist>({
    keyStNo: "",
    omBook: "",
    mirror: "",
    firstAidKit: "",
    toolSet: "",
    batteryNo: "",
    invoiceNo: "",
    serviceBookGiven: "",
  });

  const [charges, setCharges] = useState<ChargesDetails>({
    bookingDate: "",
    dob: "",
    invoiceValue: "",
    rtoPassing: "",
    insurance: "",
    accessoriesValue: "",
    crtmAmc: "",
    extendedWarranty: "",
  });

  const [reference, setReference] = useState<ChalanReferenceDetails>({
    variant: "",
    refName: "",
    refAddress: "",
    refTelNo: "",
    fullName: "",
    telNo: "",
    email: "",
    hpaWith: "",
    exchangeModel: "",
    exchangeYear: "",
    exchangeValue: "",
    remarks: "",
  });

  const challanref = useRef<HTMLDivElement>(null);
  const challanNumberRef = useRef(
    `DA/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
  );

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    setDocuments((prev) => [...prev, ...Array.from(files)]);
    // TODO: kick off real uploads here, e.g.
    // Array.from(files).forEach((f) => uploadKycDocument(row.id, f));
  };

    const handlePrint = () => {
      window.print();
    }

    const handleDownloadPdf = async () => {
        // Optional deps: npm install html2canvas jspdf
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
          import('html2canvas'),
          import('jspdf'),
        ]);
        if (!challanref.current) return;
        const canvas = await html2canvas(challanref.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`${challanNumberRef.current.replace(/\//g, '-')}.pdf`);
      };

    const handleFinalize = async () => {
      await onFinalize({
        row,
        buyer,
        documents,
        chalanNumber: challanNumberRef.current,
        handover,
        charges,
        reference,
      });
      onClose();
    };

    const canGoToStep2 = buyer.buyerName.trim().length > 0 && buyer.salesPrice.trim().length > 0;

  return (
    <Overlay onClick={onClose}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Assign Vehicle & Delivery Challan</Title>
          <CloseButton>
            <RxCross2 onClick={onClose} />
          </CloseButton>
        </Header>
        <Stepper>
          {STEPS.map((label, i) => (
            <StepItem key={label} $active={step >= i + 1}>
               <StepCircle $active={step >= i + 1}>{i + 1}</StepCircle>
               <StepLabel $active={step >= i + 1}>{label}</StepLabel>
            </StepItem>
          ))}
        </Stepper>
        <SpecCard>
          <SpecsName>Allocating Vehicle Specs</SpecsName>
          <SpecRow>
            <h3>{row.model}</h3>
            <span><b style={{fontSize:"1rem"}}>color : </b>{row.colour}</span>
          </SpecRow>
          <SpecVehicle>
            <span>
              Chasis :<code>{row.chassis}</code>{" "}
            </span>
            <span>
              Engine :<code>{row.engineNo}</code>
            </span>
          </SpecVehicle>
        </SpecCard>
        <Body>
          {step === 1 && (
            <BuyersPriceSteps buyer={buyer} setBuyer={setBuyer} />
          )}
          {step === 2 && (
            <KycUploadStep
            
              documents={documents}
              onFileChange={handleFileChange}
            />
          )}
          {step === 3 && (
            <>
              <ChalanDetailsForm
                handover={handover}
                setHandover={setHandover}
                charges={charges}
                setCharges={setCharges}
                reference={reference}
                setReference={setReference}
              />
              <ChalanPdfStep
                ref={challanref}
                row={row}
                buyer={buyer}
                chalanNumber={challanNumberRef.current}
                handover={handover}
                charges={charges}
                reference={reference}
                onPrint={handlePrint}
                onDownload={handleDownloadPdf}
              />
            </>
          )}
        </Body>
        <Footer>
          <BackButton disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</BackButton>
          {step < 3 ?(
  <PrimaryButton
  disabled={step === 1 && !canGoToStep2}
  onClick={() => setStep((s) => Math.min(3, s + 1))}
  >Next Step</PrimaryButton>
          ):(
             <PrimaryButton onClick={handleFinalize}>Finalize Delivery</PrimaryButton>
          )} 
        </Footer>
      </Drawer>
    </Overlay>
  );
};

export default AssignVehicle;