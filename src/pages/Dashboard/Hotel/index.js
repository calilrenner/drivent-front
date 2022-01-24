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
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";

export default function Hotel() {
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({ id: 0 });
  const [hasPayment, setHasPayment] = useState(true);
  const [hasAccommodation, setHasAccommodation] = useState(false);

  const { hotels, payment } = useApi();
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  function loadHotels() {
    setLoading(true);
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

  function checkPayment(userId) {
    setLoading(true);
    payment.findPayment(userId)
      .then((response) => {
        if (response.status === 200) {
          response.data[0].modality.id === 1 ? setHasAccommodation(true) : setHasAccommodation(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setHasPayment(false);
        setLoading(false);
      });
  }

  useEffect(() => {
    checkPayment(userId);
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
