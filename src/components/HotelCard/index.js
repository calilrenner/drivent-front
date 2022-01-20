import styled from "styled-components";

export default function HotelCard({ name, imageUrl, accommodationTypes, vacancies, rooms }) {
  return ( 
    <CardStyle>
      <img src={imageUrl}/>
      <TextContainerStyle>
        <CardTitleStyle>{name}</CardTitleStyle>
        <CardSubtitleStyle>Tipos de acomodação:</CardSubtitleStyle>
        <CardTextStyle>{accommodationTypes}</CardTextStyle>
        <CardSubtitleStyle>Vagas disponíveis</CardSubtitleStyle>
        <CardTextStyle>{vacancies}</CardTextStyle>
      </TextContainerStyle>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 196px;
  height: 264px;
  background-color: #F1F1F1;
  border-radius: 10px;
  padding: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Roboto', sans-serif;

  img{
    width: 168px;
    height: 109px;
    border-radius: 5px;
  }

  :hover{
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

const TextContainerStyle = styled.div`
  width: 100%;
  align-items: baseline;
`;

const CardTitleStyle = styled.p`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
  color: #343434;
`;

const CardSubtitleStyle = styled.p`
  margin-top: 14px;
  font-size: 12px;
  font-weight: 700;
  color: #3C3C3C;
`;

const CardTextStyle = styled.p`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #3C3C3C;
`;
