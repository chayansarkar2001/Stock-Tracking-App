import axios from "axios";
const TOKEN = 'ccqnpg2ad3i908o7cvpgccqnpg2ad3i908o7cvq0'
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})