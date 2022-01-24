import styled from "styled-components";

export default function HotelCard({ id, name, imageUrl, accommodationType, vacancies, rooms, selectedHotel, setSelectedHotel }) {
  function selectHotel() {
    let hotelData = {
      id, name, vacancies, rooms
    };
    hotelData.rooms.sort((a, b) => (a.number > b.number) ? 1 : -1);
    hotelData.rooms.forEach(room => {
      room.vacancies.sort((a, b) => (a.isAvailable > b.isAvailable) ? 1 : -1);

      let ocupation = 0;
      room.vacancies.forEach(vacancy => {
        if(vacancy.isAvailable === false) ocupation++;
      });
      if(ocupation === room.vacancies.length) room.isFull = true;
      else room.isFull = false;
    });
    setSelectedHotel(hotelData);
  }

  return ( 
    <CardStyle onClick={selectHotel} isSelected={selectedHotel.id === id}>
      <img src={imageUrl} alt={name}/>
      <TextContainerStyle>
        <CardTitleStyle>{name}</CardTitleStyle>
        <CardSubtitleStyle>Tipos de acomodação:</CardSubtitleStyle>
        <CardTextStyle>{accommodationType}</CardTextStyle>
        <CardSubtitleStyle>Vagas disponíveis</CardSubtitleStyle>
        <CardTextStyle>{vacancies}</CardTextStyle>
      </TextContainerStyle>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${(props) => props.isSelected ? "#FFEED2" : "#F1F1F1"};
  border-radius: 10px;
  padding: 14px;
  margin: 8px;

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

  :hover{
    cursor: pointer;
    filter: brightness(1.05) saturate(1.6);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
