import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import styled from "styled-components";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  backdrop-filter: blur(2px);
  justify-content: center;
  padding: 4rem 1rem;
  font-family: "gilroy-Medium", sans-serif;
`;

const ModalCard = styled.div`
  background-color: #fff;
  padding: 0.6rem 0.6rem;
  display: flex;
  width: 50%;
  max-width: 55rem;
  overflow-y: auto;
  flex-direction: column;
  max-height: 85vh;
  border-radius: 1rem;
  justify-content: space-between;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  border-bottom: 1px solid #e2e4e9;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #14161a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #111827;
  display: flex;
  padding: 0.3rem;
  border-radius: 0.4rem;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover {
    background: #f3f4f6;
  }
`;

const Form = styled.form`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-family: "gilroy-Medium", sans-serif;
  color: #111827;
`;

const Input = styled.input`
  padding: 0.7rem 0.9rem;
  border: 1px solid #e2e4e9;
  border-radius: 0.5rem;
  font-family: "gilroy-Medium", sans-serif;
  font-size: 0.95rem;
  color: #14161a;

  &::placeholder {
    color: #9aa0ac;
    font-size: 0.8rem;
  }

  &:focus {
    outline: none;
    border-color: #2f6fed;
  }
`;

const HelperText = styled.p`
  font-size: 0.8rem;
  font-family: "gilroy-Medium", sans-serif;
  color: #6b7280;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e4e9;
  border-radius: 0.5rem;
  font-family: "gilroy-Medium", sans-serif;
  font-size: 0.8rem;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #2f6fed;
  }
`;

const Option = styled.option`
  border: 1px solid #e2e4e9;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem 0rem;
  gap: 0.4rem;
  border-top: 1px solid #e2e4e9;
`;

const CancelButton = styled.button`
  padding: 0.7rem 1.4rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e4e9;
  background: #fff;
  color: #111827;
  font-family: "gilroy-Medium", sans-serif;
  cursor: pointer;

  &:hover {
    background: #f7f8fa;
  }
`;

const SubmitButton = styled.button`
  background-color: #cc0000;
  padding: 0.7rem 1.4rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e4e9;
  font-family: "gilroy-Medium", sans-serif;
  font-size: 0.9rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #B30000;
    border-color: #B30000;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface VehicleFormData {
  make: string;
  model: string;
  color: string;
  status: string;
  godown: string;
  mfgDate: string;
  chassis: string;
  engineNo: string;
  amount: string;
}

type RowStatus = "in-stock" | "reserved" | "sold";

export interface Row {
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


 
interface EditVehicleProps {
  // The row clicked on via "Edit Details". Null when there's nothing
  // selected yet (e.g. modal mounted before a row is chosen).
  vehicle: Row | null;
  onSubmit: (vehicle: Row) => void;
  onClose: () => void;
}

// Table rows store a combined "model" string ("Honda Activa 6G") and use
// "colour" (British spelling) — the form works with separate make/model and
// "color". This maps one shape to the other. If make/model are ever stored
// separately upstream, this can be simplified/removed.
const splitModel = (modelStr: string = "") => {
  const [make, ...rest] = modelStr.trim().split(" ");
  return { make: make || "", model: rest.join(" ") || "" };
};

const rowToFormData = (row: Row | null | undefined): VehicleFormData => {
  if (!row) {
    return {
      make: "",
      model: "",
      color: "",
      status: "in-stock",
      godown: "",
      mfgDate: "",
      chassis: "",
      engineNo: "",
      amount: "",
    };
  }
  const { make, model } = splitModel(row.model);
  return {
    make,
    model,
    color: row.colour ?? "",
    status: (row.status || "in-stock").toLowerCase(),
    godown: row.godown ?? "",
    mfgDate: row.mfgDate ?? "",
    chassis: row.chassis ?? "",
    engineNo: row.engineNo ?? "",
    amount: row.amount != null ? String(row.amount) : "",
  };
};

// vehicle = the row object clicked on ("Edit Details" from the action menu)
// onSubmit(updatedVehicle) = called with the merged, edited record
// onClose() = called to dismiss the modal (Cancel, X, backdrop click, or after submit)
const EditVehicle = ({ vehicle, onSubmit, onClose }: EditVehicleProps) => {
  const [formData, setFormData] = useState<VehicleFormData>(() => rowToFormData(vehicle));

  // Resync if a different row is passed in while the modal stays mounted.
  useEffect(() => {
    setFormData(rowToFormData(vehicle));
  }, [vehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.chassis.length !== 17) {
      alert("Chassis number should be 17 characters");
      return;
    }

    onSubmit({
      ...(vehicle ?? {}), // keep id and any other fields the form doesn't touch
      ...formData,
      model: `${formData.make} ${formData.model}`.trim(),
      colour: formData.color,
      amount: Number(formData.amount) || 0,
    } as Row);
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Edit Vehicle</Title>
          <CloseButton type="button" onClick={onClose}>
            <RxCross2 />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Field>
              <Label>Make</Label>
              <Input
                type="text"
                name="make"
                placeholder="Honda"
                value={formData.make}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label>Model</Label>
              <Input
                type="text"
                name="model"
                placeholder="Activa 6G"
                value={formData.model}
                onChange={handleChange}
              />
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Color</Label>
              <Input
                type="text"
                name="color"
                placeholder="Black"
                value={formData.color}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label>Status</Label>
              <Select name="status" value={formData.status} onChange={handleChange}>
                <Option value="in-stock">In-Stock</Option>
                <Option value="reserved">Reserved</Option>
                <Option value="sold">Sold</Option>
              </Select>
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Godown Name</Label>
              <Input
                type="text"
                name="godown"
                placeholder="Modasa"
                value={formData.godown}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label>MFG Date</Label>
              <Input
                type="date"
                name="mfgDate"
                value={formData.mfgDate}
                onChange={handleChange}
              />
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Chassis NO</Label>
              <Input
                type="text"
                name="chassis"
                maxLength={17}
                value={formData.chassis}
                onChange={handleChange}
                style={{ width: "195%" }}
              />
              <HelperText>{formData.chassis.length}/17 characters</HelperText>
            </Field>
          </Row>

          <Row>
            <Field>
              <Label>Engine NO</Label>
              <Input
                type="text"
                name="engineNo"
                value={formData.engineNo}
                onChange={handleChange}
              />
            </Field>
            <Field>
              <Label>Amount</Label>
              <Input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </Field>
          </Row>

          <Footer>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SubmitButton type="submit">Save Changes</SubmitButton>
          </Footer>
        </Form>
      </ModalCard>
    </Overlay>
  );
};

export default EditVehicle;