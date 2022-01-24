import styled from "styled-components";
import Button from "../Form/Button";

export default function HotelCard({ alreadySelectedHotel, setAlreadySelectedHotel }) {
  let accommodationType;

  if(alreadySelectedHotel.roomType === 1) {
    accommodationType = "Single";
  }
  else if(alreadySelectedHotel.roomType === 2) {
    accommodationType = "Single e Double";
  }
  else {
    accommodationType = "Single, Double e Triple";
  }

  function changeRoom() {
    setAlreadySelectedHotel({});
  }
  
  return ( 
    <ContainerStyle>
      <CardStyle >
        <img src={alreadySelectedHotel.hotelUrlImage} alt={alreadySelectedHotel.hotelName}/>
        <TextContainerStyle>
          <CardTitleStyle>{alreadySelectedHotel.hotelName}</CardTitleStyle>
          <CardSubtitleStyle>Quarto reservado:</CardSubtitleStyle>
          <CardTextStyle>{alreadySelectedHotel.roomNumber} ({accommodationType})</CardTextStyle>
          <CardSubtitleStyle>Pessoas no seu quarto: </CardSubtitleStyle>
          <CardTextStyle>{alreadySelectedHotel.roomOcupation >= 2 ? `Você e outras ${alreadySelectedHotel.roomOcupation - 1} pessoas` : "Apenas você."}</CardTextStyle>
        </TextContainerStyle>
      </CardStyle>
      <ButtonStyle onClick={changeRoom}>
        TROCAR DE QUARTO
      </ButtonStyle>
    </ContainerStyle>
  );
}

const ContainerStyle = styled.div`
  width: 210px;
  display: flex;
  flex-direction: column;
`;

const CardStyle = styled.div`
  width: 196px;
  height: 264px;
  background-color: #FFEED2;
  border-radius: 10px;
  padding: 14px;
  margin: 8px 8px 25px 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Roboto', sans-serif;

  transition: ease-in-out 0.3s;

  img{
    width: 168px;
    height: 109px;
    border-radius: 5px;
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

const ButtonStyle = styled(Button)`
  margin-top: 30px;
`;
