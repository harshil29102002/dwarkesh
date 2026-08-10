import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  
`;

const StyledSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  padding: 8px 32px 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border, #E2E4E9);
  background: var(--surface, #fff);
  font-size: 14px;
  cursor: pointer;
  font-family: 'gilroy-Medium', sans-serif;
`;

const Arrow = styled(IoIosArrowDown)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 14px;
`;

type FilterDropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <Wrapper>
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </StyledSelect>
      <Arrow />
    </Wrapper>
  );
}