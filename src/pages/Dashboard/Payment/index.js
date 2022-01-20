import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import { PageTitle, Center, BlockedText } from "../../../components/DefaultTabStyle";
import TicketSelection from "./TicketSelection";
import HotelSelection from "./HotelSelection";

export default function Payment() {
  const [hasSubscription, setHasSubscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [hasHotel, setHasHotel] = useState(null);
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
        </> :
        <Center>
          {loading ? <Loading /> : <BlockedText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</BlockedText>}
        </Center>}
    </>
  );
}
