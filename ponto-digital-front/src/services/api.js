import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5249/api",
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    }
})

export const Ponto = async (pontos) => {
  return await api.post("/Ponto/Ponto", pontos);
}

export const testePonto = () => {
  return api.get("/Ponto/TestePonto")
}