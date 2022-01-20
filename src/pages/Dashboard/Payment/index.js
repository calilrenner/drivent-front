import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import {
  PageTitle,
  PageSubtitle,
  Options,
  Option,
  Type,
  Price,
  Center,
  BlockedText,
} from "../../../components/DefaultTabStyle";
import TicketSelection from "./TicketSelection";

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
          <PageSubtitle visible={ticket === "presential" ? true : false}>Ótimo! Agora escolha sua modalidade de hospedagem</PageSubtitle>
          <Options visible={ticket === "presential" ? true : false}>
            <Option
              selected={hasHotel === "no" ? true : false}
              onClick={() => hasHotel === "no" ? setHasHotel(null) : setHasHotel("no")}
            >
              <Type>Sem Hotel</Type>
              <Price>+ R$ 0</Price>
            </Option>
            <Option
              selected={hasHotel === "yes" ? true : false}
              onClick={() => hasHotel === "yes" ? setHasHotel(null) : setHasHotel("yes")}
            >
              <Type>Com Hotel</Type>
              <Price>+ R$ 350</Price>
            </Option>
          </Options>
        </> :
        <Center>
          {loading ? <Loading /> : <BlockedText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</BlockedText>}
        </Center>}
    </>
  );
}
