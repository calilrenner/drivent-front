/* eslint-disable no-console */
import { useContext, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  PageTitle,
  PageSubtitle,
  Center,
  BlockedText
} from "../../../components/DefaultTabStyle";

import { IoPersonOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

import HotelCard from "../../../components/HotelCard";
import SelectedHotelCard from "../../../components/SelectedHotelCard";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";
import Button from "../../../components/Form/Button";

export default function Hotel() {
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({ id: 0 });
  const [hasPayment, setHasPayment] = useState(false);
  const [hasAccommodation, setHasAccommodation] = useState(false);
  const [alreadySelectedHotel, setAlreadySelectedHotel] = useState({});
  const [oldReservationInfo, setOldReservationInfo] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(0);
  const [selectedVacancyId, setSelectedVacancyId] = useState(0);

  const { hotels, payment, rooms } = useApi();
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  function checkPayment(userId) {
    setLoading(true);
    payment.findPayment(userId)
      .then((response) => {
        if (response.status === 200) {
          setHasPayment(true);
          response.data[0].acommodation.id === 1 ? setHasAccommodation(true) : setHasAccommodation(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function checkReservation(userId) {
    setLoading(true);
    hotels.findHotel(userId)
      .then((response) => {
        if (response.status === 200) {
          setAlreadySelectedHotel(response.data);
          setOldReservationInfo(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function loadHotels() {
    hotels.getHotels()
      .then((response) => {
        if (response.status === 200) {
          setHotelsData(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    checkPayment(userId);
    checkReservation(userId);
    loadHotels();
  }, []);

  function selectVacancy(vacancyId, roomIsFull, roomId) {
    if(!roomIsFull) {
      setSelectedRoomId(roomId);
      setSelectedVacancyId(vacancyId);
    }
  }

  function requestReservation() {
    let body = {};
    if(oldReservationInfo === false) {
      body = {
        userId: userId,
        vacancyId: selectedVacancyId,
        hotelId: selectedHotel.id
      };
      if(body.vacancyId !== 0) rooms.createOrUpdateReservation(body)
        .then((response) => { checkReservation(userId); loadHotels(); })
        .catch((error) => { console.error(error); });
    } else {
      body = {
        userId: userId,
        vacancyId: oldReservationInfo.vacancyId,
        hotelId: oldReservationInfo.hotelId,
        newVacancyId: selectedVacancyId,
        newHotelId: selectedHotel.id
      };
      if(body.newVacancyId !== 0) rooms.createOrUpdateReservation(body)
        .then((response) => { checkReservation(userId); loadHotels(); })
        .catch((error) => { console.error(error); });
    }
  }
  
  return (
    <>
      <PageTitle>Escolha de hotel e quarto</PageTitle>
      {
        hasPayment 
          ?
          hasAccommodation
            ?
            alreadySelectedHotel.hotelName 
              ?
              <>
                <SubtitleStyle>Você já escolheu o seu quarto: </SubtitleStyle>
                <SelectedHotelCard alreadySelectedHotel={alreadySelectedHotel} setAlreadySelectedHotel={setAlreadySelectedHotel} setSelectedRoomId={setSelectedRoomId} setSelectedVacancyId={setSelectedVacancyId}/>
              </>
              :
              <>
                <PageSubtitle>Primeiro, escolha seu hotel</PageSubtitle>
                {
                  loading
                    ?
                    <Loading/>
                    :
                    <>
                      <HotelsContainerStyle>
                        {
                          hotelsData.map((hotel) => {
                            return (
                              <HotelCard 
                                key={hotel.name}
                                id={hotel.id}
                                name={hotel.name}
                                imageUrl={hotel.imageUrl}
                                accommodationType={hotel.accommodationType}
                                vacancies={hotel.vacancies}
                                rooms={hotel.rooms}
                                selectedHotel={selectedHotel}
                                setSelectedHotel={setSelectedHotel}
                              />
                            );
                          })
                        }
                      </HotelsContainerStyle>
                        
                      {selectedHotel.id !== 0 && <HotelRoomsContainer>
                        <RoomsSectionTitle>Ótima pedida! Agora escolha o seu quarto:</RoomsSectionTitle>
                      
                        <RoomsList>{selectedHotel.rooms.map(room => (
                          <RoomCard 
                            key={room.id} 
                            isSelected={room.id === selectedRoomId} 
                            isFull={room.isFull}
                          >
                            {room.number}
                            <div>{room.vacancies.map(vacancy => (
                              vacancy.isAvailable
                                ? <VacancySimbol 
                                  isSelected={vacancy.id === selectedVacancyId} 
                                  onClick={() => selectVacancy(vacancy.id, room.isFull, room.id)}
                                  isAvailable={vacancy.isAvailable}
                                >{vacancy.id === selectedVacancyId ? <IoPerson/> : <IoPersonOutline/>}</VacancySimbol>
                                : <VacancySimbol isAvailable={vacancy.isAvailable}><IoPerson/></VacancySimbol>
                            ))}</div>
                          </RoomCard>
                        ))}</RoomsList>
        
                      </HotelRoomsContainer>}

                      <ButtonStyle onClick={requestReservation}>
                        RESERVAR QUARTO
                      </ButtonStyle>
                    </>
                }
              </> 
            :
            <Center>
              {loading ? <Loading /> : <BlockedText>Sua modalidade de ingresso não possui hospedagem. Prossiga para a escolha de atividades</BlockedText>}
            </Center>
          :
          <Center>
            {loading ? <Loading /> : <BlockedText>Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem</BlockedText>}
          </Center>
      }
    </>
  );
}

const HotelsContainerStyle = styled.section`
  display: flex;
  width: 100%;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 12px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #CCCCCC;
    border-radius: 20px;
  }
`;

const SubtitleStyle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #8E8E8E;
  margin-bottom: 14px;
`;

const HotelRoomsContainer = styled.section`
  width: 100%;
`;

const RoomsSectionTitle = styled.div`
  margin: 20px 0 30px 0;
  font-family: Roboto;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
`;

const RoomsList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RoomCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  margin: 0 4px 8px 4px;
  padding: 0 14px 0 16px;
  font-family: Roboto;
  color: #454545;
  background: ${(props) => props.isFull ? "#c6c6c6" : props.isSelected ? "#FFEED2" : "none"};
  cursor: ${(props) => props.isFull ? "not-allowed" : "auto"};
  :hover {
    background: ${(props) => props.isFull ? "#c6c6c6" : "#FFEED2"};
  }
  div {
    display: flex;
  }
`;

const VacancySimbol = styled.div`
  color: ${(props) => props.isSelected ? "#FF7491" : "#000000"};
  cursor: ${(props) => props.isAvailable ? "pointer" : "not-allowed"};
  font-size: 24px;
  :hover {
    color: ${(props) => props.isAvailable ? "#FF7491" : "#000000"};
  }
`;

const ButtonStyle = styled(Button)`
  margin-top: 30px;
`;
