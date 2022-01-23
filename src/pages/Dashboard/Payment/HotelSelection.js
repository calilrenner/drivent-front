import {
  PageSubtitle,
  Options,
  Option,
  Type,
  Price,
} from "../../../components/DefaultTabStyle";

export default function HotelSelection({ ticket, hasHotel, setHasHotel }) {
  return (
    <>
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
    </>
  );
}
