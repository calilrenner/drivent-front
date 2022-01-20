import valid from "card-validator";

export default function creditCardValidator(values) {
  let errors = {};
  let creditCart = valid.number(values.number);

  creditCart.expirationDate = valid.expirationDate(values.expirationDate);
  creditCart.name = valid.cardholderName(values.name);
  creditCart.cvc = valid.cvv(values.cvc);
  creditCart.number = valid.number(values.number);

  errors.show = true;
  errors.message = "Um erro desconhecido ocorreu. Tente mais tarde.";
  errors.name = false;
  errors.number = false;
  errors.expirationDate = false;
  errors.cvc = false;

  if (values.cvc === null || !values.cvc.trim()) {
    errors.message = "O código está incompleto";
  } else if (creditCart.cvc.isValid) {
    errors.cvc = true;
  } else {
    errors.message = "O código está errado";
  }

  if (values.expirationDate === null || !values.expirationDate.trim()) {
    errors.message = "A validade está incompleta";
  } else if (creditCart.expirationDate.isValid) {
    errors.expirationDate = true;
  } else {
    errors.message = "A validade está errada";
  }

  if (values.name === null || !values.name.trim()) {
    errors.message = "O nome está incompleto";
  } else if (creditCart.name.isValid) {
    errors.name = true;
  } else {
    errors.message = "O nome está errado";
  }

  if (values.number === null || !values.number.trim()) {
    errors.message = "O número está incompleto";
  } else if (creditCart.number.isValid) {
    errors.number = true;
  } else {
    errors.message = "O número está errado";
  }

  if (errors.name && errors.number && errors.cvc && errors.expirationDate) {
    errors.message = "Sucesso!";
  }

  return errors;
}
