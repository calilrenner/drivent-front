import styled from "styled-components";

export default function Confirm({ msg, position, bottom, onClick = () => 0 }) {
  return (
    <ConfirmButton position={position} bottom={bottom} onClick={onClick}>
      {msg}
    </ConfirmButton>
  );
}

const ConfirmButton = styled.button`
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 10px 0px #00000040;
  background-color: #e0e0e0;
  width: 11rem;
  height: 2rem;
  font-size: 14px;
  position: ${({ position }) => (position ? position : "initial")};
  bottom: ${({ bottom }) => (bottom ? bottom : "inherity")};

  &:hover {
    cursor: pointer;
  }
`;
