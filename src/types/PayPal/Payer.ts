export default interface Payer {
  name: {
    given_name: string;
    surname: string;
  };
  email_address: string;
  payer_id: string;
}
