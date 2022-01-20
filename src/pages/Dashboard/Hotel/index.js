import { useState } from "react";
import Loading from "../../../components/Loading";
import {
  PageTitle,
  PageSubtitle,
  Center,
  BlockedText,
} from "../../../components/DefaultTabStyle";

export default function Hotel() {
  const [hasPayment, setHasPayment] = useState(true);
  const [hasAccommodation, setHasAccommodation] = useState(false);
  const [loading, setLoading] = useState(false);

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
