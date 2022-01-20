import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";
import { cardForm } from "../../../hooks/cardForm";
import Confirm from "../../Form/Confirm";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function PaymentInfo() {
  const { handleFocus, handleChange, handleSubmit, values, errors } =
    cardForm();

  const notify = () => toast(errors.message);

  return (
    <>
      <Title>Ingresso e pagamento</Title>
      <SubTitle>Ingresso escolhido</SubTitle>
      <TicketContainer>
        <span>Presencial + Com Hotel</span>
        <span>R$ 600</span>
      </TicketContainer>
      <SubTitle>Pagamento</SubTitle>
      <CardContainer>
        <Cards
          cvc={values.cvc}
          expiry={values.expirationDate}
          focused={values.focus}
          name={values.name}
          number={values.number}
        />
        <Form>
          <Input
            name="number"
            type="number"
            placeholder="Card Number"
            value={values.number}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <span>E.g.: 49...51...36...27...</span>

          <span>{errors.message}</span>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <div>
            <input
              name="expirationDate"
              type="text"
              placeholder="Valid Thru"
              value={values.expirationDate}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <input
              name="cvc"
              type="number"
              placeholder="CVC"
              value={values.cvc}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
        </Form>
      </CardContainer>
      <Confirm
        msg="FINALIZAR PAGAMENTO"
        position="absolute"
        bottom="10rem"
        onClick={(e) => {
          handleSubmit(e);
          notify();
        }}
      />
    </>
  );
}

const Title = styled.h1`
  font-size: 34px;
  margin-bottom: 3rem;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 1.5rem;
`;

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

  span:first-child {
    margin-bottom: 1rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  div {
    input {
      height: 3rem;
      width: 11rem;
      border-radius: 4px;
      border: 1.5px solid #e0e0e0;
      outline: none;
      padding-left: 1rem;
      margin-top: 0.7rem;
      font-size: 18px;

      &::placeholder {
        font-size: 18px;
      }

      &:hover {
        border: 1px solid #8e8e8e;
      }
    }

    input:last-child {
      width: 6rem;
      margin-left: 1rem;
    }
  }

  span {
    font-size: 12px;
    color: #8e8e8e;
    margin: 0.2rem 0 0.7rem 0;
  }
`;

const Input = styled.input`
  height: 3rem;
  width: 18rem;
  border-radius: 4px;
  border: 1.5px solid #e0e0e0;
  outline: none;
  padding-left: 1rem;
  font-size: 18px;

  &::placeholder {
    font-size: 18px;
  }

  &:hover {
    border: 1px solid #8e8e8e;
  }
`;
