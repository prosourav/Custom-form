import styled from "styled-components";
import TextInput from "../ui/inputs/TextInput";
import Label from "../ui/inputs/Label";
import Text from "../ui/texts/Text";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #efefef;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
`;

export default function InputGroup({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
  onFocus,
  onBlur,
  required,
}) {
  return (
    <Container>
      <Label htmlFor={name}>
        {label}
        {required && (
          <Text required fontSizes={"lg"} style={{ display: "inline", padding:'0px 2px' }}>
            *
          </Text>
        )}
      </Label>
      <TextInput
        name={name}
        id={name}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}
