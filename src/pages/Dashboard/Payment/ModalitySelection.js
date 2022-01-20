import { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import TicketSelection from "./TicketSelection";
import HotelSelection from "./HotelSelection";
import { PageSubtitle } from "../../../components/DefaultTabStyle";
import Button from "../../../components/Form/Button";

export default function ModalitySelection({ setModalityInfo, setPaymentVisibility }) {
  const [ticket, setTicket] = useState(null);
  const [hasHotel, setHasHotel] = useState(null);
  const [total, setTotal] = useState(0);
  const [modalityVisibility, setModalityVisibility] = useState(true);

  useEffect(() => {
    const ticketValue = ticket === "presential" ? 250 : 100;
    const hotelValue = hasHotel === "yes" ? 350 : 0;

    setTotal(ticketValue + hotelValue);
  }, [hasHotel, ticket]);

  const storeTicketAndHotelInfo = () => {
    if (!ticket || !hasHotel) {
      toast("Selecione os dados pedidos corretamente");
    }
    const data = {
      modality: ticket,
      acommodation: hasHotel,
    };
    setModalityInfo(data);
    setModalityVisibility(false);
    setPaymentVisibility(true);
  };

  return (
    <ModalityContainer visible={modalityVisibility}>
      <TicketSelection
        ticket={ticket}
        setTicket={setTicket}
        setHasHotel={setHasHotel}
      />
      <HotelSelection
        ticket={ticket}
        hasHotel={hasHotel}
        setHasHotel={setHasHotel}
      />
      <PageSubtitle
        visible={ticket === "online" || (ticket === "presential" && hasHotel) ? 1 : undefined}
      >Fechado! O total ficou em <span>R$ {total}</span>. Agora é só confirmar:</PageSubtitle>
      <ToPaymentButton
        visible={ticket === "online" || (ticket === "presential" && hasHotel) ? 1 : undefined}
        onClick={storeTicketAndHotelInfo}
      >
            RESERVAR INGRESSO
      </ToPaymentButton>
    </ModalityContainer>
  );
}

const ToPaymentButton = styled(Button)`
  display: ${props => props.visible ? "inblock" : "none !important"};
`;

const ModalityContainer = styled.section`
  display: ${props => props.visible ? "" : "none"};
`;
