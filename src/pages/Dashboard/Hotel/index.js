import { useContext, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  PageTitle,
  PageSubtitle,
  Center,
  BlockedText
} from "../../../components/DefaultTabStyle";

import HotelCard from "../../../components/HotelCard";
import SelectedHotelCard from "../../../components/SelectedHotelCard";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";

export default function Hotel() {
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({ id: 0 });
  const [hasPayment, setHasPayment] = useState(true);
  const [hasAccommodation, setHasAccommodation] = useState(false);
  const [alreadySelectedHotel, setAlreadySelectedHotel] = useState({});
  const [oldReservationInfo, setOldReservationInfo] =useState({});

  const { hotels, payment } = useApi();
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  function checkPayment(userId) {
    setLoading(true);
    payment.findPayment(userId)
      .then((response) => {
        if (response.status === 200) {
          response.data[0].modality.id === 1 ? setHasAccommodation(true) : setHasAccommodation(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setHasPayment(false);
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
                <SelectedHotelCard alreadySelectedHotel={alreadySelectedHotel} setAlreadySelectedHotel={setAlreadySelectedHotel}/>
              </>
              :
              <>
                <PageSubtitle>Primeiro, escolha seu hotel</PageSubtitle>
                {
                  loading
                    ?
                    <Loading/>
                    :
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
