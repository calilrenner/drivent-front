import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import { PageTitle, PageSubtitle, Center, BlockedText } from "../../../components/DefaultTabStyle";
import TicketSelection from "./TicketSelection";
import HotelSelection from "./HotelSelection";

export default function Payment() {
  const [hasSubscription, setHasSubscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [hasHotel, setHasHotel] = useState(null);
  const [total, setTotal] = useState("0");
  const { enrollment } = useApi();

  useEffect(() => { 
    setLoading(true);
    enrollment.getPersonalInformations()
      .then((response) => {
        if (response.status === 200) {
          setHasSubscription(true);
          setLoading(false);
        } else {
          setHasSubscription(false);
          setLoading(false);
        }
      });
  }, [hasSubscription]);

  useEffect(() => {
    const ticketValue = ticket === "presential" ? 250 : 100;
    const hotelValue = hasHotel === "yes" ? 350 : 0;

    setTotal(ticketValue + hotelValue);
  }, [hasHotel, ticket]);

  const controlVisibility = () => { 
    if (ticket === "online") {
      return true;
    }
    if (ticket === "presential" && hasHotel) {
      return true;
    }
    return false;
  };

  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      {hasSubscription ?
        <>
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
          <PageSubtitle visible={controlVisibility()}>Fechado! O total ficou em R$ {total}. Agora é só confirmar:</PageSubtitle>
        </> :
        <Center>
          {loading ? <Loading /> : <BlockedText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</BlockedText>}
        </Center>}
    </>
  );
}
