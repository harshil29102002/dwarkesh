import { useState } from "react";
import { RxCross2 } from "react-icons/rx"
import styled from "styled-components"

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
font-family: 'gilroy-Medium', sans-serif;
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
border-bottom: 1px solid #E2E4E9;
`;

const Title = styled.div`
font-size: 1.2rem;
font-weight: 600;
color: #14161A;
margin: 0;
`;

const CloseButton = styled.div`
background: none;
  border: none;
  cursor: pointer;
  color: #111827;
  display: flex;
  padding: 0.3rem;
  border-radius: 0.4rem;

  svg{
    width: 1.2rem;
    height: 1.2rem;
  }

&:hover{
   background: #F3F4F6;
}
`;  

const Form = styled.form`
padding: 1.5rem 2rem 2rem;
display: flex;
flex-direction: column;
gap: 1rem;
`;

const Row = styled.div`
display:grid;
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
font-family: 'gilroy-Medium', sans-serif;
color: #111827;
`;

const Input = styled.input`
padding: 0.7rem 0.9rem;
border: 1px solid #E2E4E9;
border-radius: 0.5rem;
font-family: 'gilroy-Medium', sans-serif;
font-size: 0.95rem;
color: #14161A;

  &::placeholder {
    color: #9AA0AC;
    font-size: 0.8rem;
  }


&:focus{
    outline: none;
    border-color:#2F6FED;
}
`;

const HelperText = styled.p`
font-size: 0.8rem;
font-family: 'gilroy-Medium', sans-serif;
color: #6B7280;
`;

const Select = styled.select`
padding: 0.5rem 1rem;
border: 1px solid #E2E4E9;
border-radius: 0.5rem;
font-family: 'gilroy-Medium', sans-serif;
font-size: 0.8rem;
background-color: #fff;

&:focus{
    outline: none;
    border-color:#2F6FED;
}
`;

const Option = styled.option`
border: 1px solid #E2E4E9;
`;

const Footer = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
padding: 1rem 0rem;
gap: 0.4rem;
border-top: 1px solid #E2E4E9;
`;

const CancelButton = styled.button`
  padding: 0.7rem 1.4rem;
  border-radius: 0.5rem;
  border: 1px solid #E2E4E9;
  background: #fff;
  color: #111827;
  font-family: 'gilroy-Medium', sans-serif;
  cursor: pointer;
 
  &:hover {
    background: #F7F8FA;
  }
`;

const SubmitButton = styled.button`
background-color: #E2E4E9;
padding: 0.7rem 1.4rem;
border-radius: 0.5rem;
border: 1px solid #E2E4E9;
font-family: 'gilroy-Medium', sans-serif;
font-size: 0.9rem;
color: #14161A;
transition: all 0.3s ease-in-out;
&:hover{
    background-color: #2F6FED;
    color: #fff;
}
`;

const InitialFormData = {
    make: "",
    model: "",
    color: "",
    status: "in-stock",
    godown: "",
    mfgDate: "",
    chassis: "",
    engineNo: "",
    amount: ""
}



const AddVehicle = ({onSubmit, onClose}) => {

    const [formData, setFormData] = useState(InitialFormData);

    const handleChange = (e) => {
        const {name, value} = e.target.value;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.chassis.length !== 17){
            alert('Chassis number should be 17 characters');
            return
        }
        onSubmit(formData);
        console.log(formData);
        onClose();
    }


  return (
    <Overlay onClick={onClose}>
        <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
                <Title>Add Vehicle</Title>
                <CloseButton typeof="button" onClick={onClose}><RxCross2/></CloseButton>
            </ModalHeader>
        
        <Form onSubmit={handleSubmit}>
          <Row>
            <Field>
                <Label>Make</Label>
                <Input type="text" placeholder="Honda" value={formData.make} onChange={handleChange} />
            </Field>
            <Field>
                <Label>Model</Label>
                <Input type="text" placeholder="Activa 6G" value={formData.model} onChange={handleChange}/>
            </Field>
          </Row>
          <Row>
            <Field>
                <Label>Color</Label>
                <Input type="text" placeholder="Black" value={formData.color} onChange={handleChange}/>
            </Field>
            <Field>
                <Label>Status</Label>
                <Select defaultValue="in-stock" value={formData.status} onChange={handleChange}>
                    <Option value="in-stock">In-Stock</Option>
                    <Option value="reserved">Reserved</Option>
                    <Option value="sold">Sold</Option>
                </Select>
            </Field>
          </Row>
          <Row>
            <Field>
                <Label>Godown Name</Label>
                <Input type="text" placeholder="1234567890" value={formData.godown} onChange={handleChange} />
            </Field>
            <Field>
                <Label>MFG Date</Label>
                <Input type="date" value={formData.mfgDate} onChange={handleChange} />
            </Field>
          </Row>
          <Row >
            <Field>
                <Label>Chassis NO</Label>
                <Input type="text" placeholder="1234567890" maxLength={17} value={formData.chassis} onChange={handleChange} style={{ width: "195%"}}/>
            </Field>
          </Row>
          <Row>
            <Field>
                <Label>Engine NO</Label>
                <Input type="text" placeholder="1234567890" value={formData.engineNo} onChange={handleChange} />
            </Field>
            <Field>
                <Label>Amount</Label>
                <Input type="text" placeholder="1234567890" value={formData.amount} onChange={handleChange} />
            </Field>
          </Row>
          <Footer>
            <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
          <SubmitButton type="submit">Submit</SubmitButton>
          </Footer>
        
        </Form>
        </ModalCard>
    </Overlay>
  )
}

export default AddVehicle