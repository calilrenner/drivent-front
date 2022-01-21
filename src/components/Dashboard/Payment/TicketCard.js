import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
import { Price, Type } from "../../DefaultTabStyle";

export default function TicketCard({ modalityInfo }) {
  const { value, modality, acommodation } = modalityInfo;
  const { userTicket } = useContext(UserContext);

  const ticketInfos = {
    modality: modality === "presential" ? "Presencial" : "Online",
    acommodation: acommodation === "yes" ? "Com hotel" : "Sem hotel",
  };

  return (
    <TicketContainer>
      <Type>
        {userTicket[0]?.modality.type || ticketInfos.modality} +{" "}
        {userTicket[0]?.acommodation.type || ticketInfos.acommodation}
      </Type>
      <Price>
        R${" "}
        {userTicket[0]?.modality.value + userTicket[0]?.acommodation.value ||
          value}
      </Price>
    </TicketContainer>
  );
}

const TicketContainer = styled.div`
  height: 7rem;
  width: 18rem;
  background-color: #ffeed2;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
