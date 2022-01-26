import styled from "styled-components";
import { PageTitle, PageSubtitle, Center, BlockedText } from "../../../components/DefaultTabStyle";
import Button from "../../../components/Form/Button";

export default function Activities() {
  return (
    <>
      <PageTitle>Escolha de atividades</PageTitle>
      <PageSubtitle visible={true}>Primeiro, filtre pelo dia do evento: </PageSubtitle>
      <Weekdays>
        <Day>Sexta, 22/10</Day>
        <Day>Sábado, 23/10</Day>
        <Day>Domingo, 24/10</Day>
      </Weekdays>
      {/* <Center>
        <BlockedText>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</BlockedText>
      </Center> */}
    </>
    // <Center>
    //   <BlockedText>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</BlockedText>
    // </Center>
  );
}

const Weekdays = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 18px;
`;

const Day = styled(Button)`
  max-width: 150px;
  text-transform: none !important;
`;
