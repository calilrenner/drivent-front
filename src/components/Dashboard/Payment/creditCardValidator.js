import valid from "card-validator";

export default function creditCardValidator(values) {
  let errors = {};
  let creditCart = valid.number(values.number);

  creditCart.expirationDate = valid.expirationDate(values.expirationDate);
  creditCart.name = valid.cardholderName(values.name);
  creditCart.cvc = valid.cvv(values.cvc);
  creditCart.number = valid.number(values.number);

  errors.show = false;
  errors.message = {
    default: "Um erro desconhecido ocorreu. Tente mais tarde.",
  };
  errors.name = false;
  errors.number = false;
  errors.expirationDate = false;
  errors.cvc = false;

  if (values.cvc === null || !values.cvc.trim()) {
    errors.message.cvc = "O código está incompleto";
    errors.show = true;
  } else if (creditCart.cvc.isValid) {
    errors.cvc = true;
  } else {
    errors.message.cvc = "O código está errado";
    errors.show = true;
  }

  if (values.expirationDate === null || !values.expirationDate.trim()) {
    errors.message.expirationDate = "A validade está incompleta";
  } else if (creditCart.expirationDate.isValid) {
    errors.expirationDate = true;
    errors.show = true;
  } else {
    errors.message.expirationDate = "A validade está errada";
    errors.show = true;
  }

  if (values.name === null || !values.name.trim()) {
    errors.message.name = "O nome está incompleto";
    errors.show = true;
  } else if (creditCart.name.isValid) {
    errors.name = true;
  } else {
    errors.message.name = "O nome está errado";
    errors.show = true;
  }

  if (values.number === null || !values.number.trim()) {
    errors.message.number = "O número está incompleto";
    errors.show = true;
  } else if (creditCart.number.isValid) {
    errors.number = true;
  } else {
    errors.message.number = "O número está errado";
    errors.show = true;
  }

  if (errors.name && errors.number && errors.cvc && errors.expirationDate) {
    errors.message.default = "Sucesso!";
    errors.show = false;
  }

  return errors;
}
