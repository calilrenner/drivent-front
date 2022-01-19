import styled from "styled-components";

export default function Payment() {
  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      {/* <PageSubtitle>Primeiro, escolha sua modalidade de ingresso</PageSubtitle>
      <Options>
        <Option>
          <Type>Presencial</Type>
          <Price>R$250</Price>
        </Option>
        <Option>
          <Type>Online</Type>
          <Price>R$100</Price>
        </Option>
      </Options> */}
      <Center>
        <BlockedText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</BlockedText>
      </Center>
    </>
  );
}

const PageTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 34px;
  margin-bottom: 35px;
`;

const PageSubtitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: #8E8E8E;
  margin-bottom: 15px;
`;

const Options = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 25px;
`;

const Option = styled.div`
  min-width: 145px;
  width: fit-content;
  min-height: 145px;
  height: fit-content;
  border: 1px solid #CECECE;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &:hover {
    filter: brightness(0.);
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
