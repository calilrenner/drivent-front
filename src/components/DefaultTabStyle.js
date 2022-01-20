import styled from "styled-components";

const PageTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  margin-bottom: 35px;
`;

const PageSubtitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8E8E8E;
  display: ${props => props.visible ? "inblock" : "none"};
  margin-bottom: 15px;

  & span {
    font-weight: 700;
  }
`;

const Options = styled.div`
  width: fit-content;
  display: ${props => props.visible ? "grid" : "none"};
  grid-template-columns: repeat(2, 1fr);
  column-gap: 25px;
  margin-bottom: 45px;
`;

const Option = styled.div`
  min-width: 145px;
  width: fit-content;
  min-height: 145px;
  height: fit-content;
  border: ${props => props.selected ? "none" : "1px solid #CECECE"};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.selected ? "#FFEED2" : "transparent"};
  
  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`;

const Type = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #454545;
`;

const Price = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #898989;
`;

const Center = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlockedText = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  max-width: 464px;
  color: #8E8E8E;
  text-align: center;
`;

export {
  PageTitle,
  PageSubtitle,
  Options,
  Option,
  Type,
  Price,
  Center,
  BlockedText,
};
