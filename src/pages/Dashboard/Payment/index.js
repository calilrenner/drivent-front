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

export default function Payment() {
  const [hasSubscription, setHasSubscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
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
          <PageSubtitle>Primeiro, escolha sua modalidade de ingresso</PageSubtitle>
          <Options>
            <Option
              selected={ticket === "presential" ? true : false}
              onClick={() => ticket === "presential" ? setTicket(null) : setTicket("presential")}
            >
              <Type>Presencial</Type>
              <Price>R$250</Price>
            </Option>
            <Option
              selected={ticket === "online" ? true : false}
              onClick={() => ticket === "online" ? setTicket(null) : setTicket("online")}
            >
              <Type>Online</Type>
              <Price>R$100</Price>
            </Option>
          </Options>
        </> :
        <Center>
          {loading ? <Loading /> : <BlockedText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</BlockedText>}
        </Center>}
    </>
  );
}
