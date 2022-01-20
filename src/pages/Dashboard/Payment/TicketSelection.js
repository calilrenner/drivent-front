import {
  PageSubtitle,
  Options,
  Option,
  Type,
  Price,
} from "../../../components/DefaultTabStyle";

export default function TicketSelection({ ticket, setTicket, setHasHotel }) {
  return (
    <>
      <PageSubtitle visible={true}>Primeiro, escolha sua modalidade de ingresso</PageSubtitle>
      <Options visible={true}>
        <Option
          selected={ticket === "presential" ? true : false}
          onClick={() => {
            ticket === "presential" ? setTicket(null) : setTicket("presential");
            setHasHotel(null);
          }}
        >
          <Type>Presencial</Type>
          <Price>R$ 250</Price>
        </Option>
        <Option
          selected={ticket === "online" ? true : false}
          onClick={() => {
            ticket === "online" ? setTicket(null) : setTicket("online");
            setHasHotel(null);
          }}
        >
          <Type>Online</Type>
          <Price>R$ 100</Price>
        </Option>
      </Options>
    </>
  );
}
