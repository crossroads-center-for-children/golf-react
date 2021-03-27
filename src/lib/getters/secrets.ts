import axios from "axios";

const root = process.env.REACT_APP_API_URL;

export async function getPayPalClientId(slug: string): Promise<string> {
  const secret = axios
    .get(`${root}/secrets/${slug}`)
    .then((res) => res.data.secret.secret);

  return secret;
}
