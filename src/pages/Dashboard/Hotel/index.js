import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  PageTitle,
  PageSubtitle
} from "../../../components/DefaultTabStyle";

import HotelCard from "../../../components/HotelCard";
import useApi from "../../../hooks/useApi";
export default function Hotel() {
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState([]);

  const { hotels } = useApi();
  useEffect(() => { 
    setLoading(true);
    hotels.getHotels()
      .then((response) => {
        if (response.status === 200) {
          setHotelsData(response.data);
          setLoading(false);
        } else {
          console.error(response.status);
          setLoading(false);
        }
      });
  }, [hotelsData]);

  return (
    <>
      <PageTitle>Escolha de hotel e quarto</PageTitle>
      <PageSubtitle>Primeiro, escolha seu hotel</PageSubtitle>
      <HotelsContainerStyle>
        {
          hotelsData.map((hotel) => {
            return (
              <HotelCard 
                key={hotel.name}
                name={hotel.name}
                imageUrl={hotel.imageUrl}
                accommodationTypes={hotel.accommodationTypes}
                vacancies={hotel.vacancies}
                rooms={hotel.rooms}
              />
            );
          })
        }
      </HotelsContainerStyle>
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
