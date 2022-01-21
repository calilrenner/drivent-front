import styled from "styled-components";
import { Price, Type } from "../../DefaultTabStyle";

export default function TicketCard({ modalityInfo }) {
  const { value, modality, acommodation } = modalityInfo;

  const ticketInfos = {
    modality: modality === "presential" ? "Presencial" : "Online",
    acommodation: acommodation === "yes" ? "Com hotel" : "Sem hotel",
  };

  return (
    <TicketContainer>
      <Type>
        {ticketInfos.modality} + {ticketInfos.acommodation}
      </Type>
      <Price>R$ {value}</Price>
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
