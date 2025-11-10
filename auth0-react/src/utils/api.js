import axios from 'axios'
import { getAccessToken } from './auth'


const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'


export async function listCursos() {
const res = await axios.get(`${BASE}/api/cursos`)
return res.data
}


export async function createCurso(body) {
const token = await getAccessToken()
const res = await axios.post(`${BASE}/api/cursos`, body, {
headers: {
Authorization: `Bearer ${token}`
}
})
return res.data
}


export async function deleteCurso(id) {
const token = await getAccessToken()
const res = await axios.delete(`${BASE}/api/cursos/${id}`, {
headers: {
Authorization: `Bearer ${token}`
}
})
return res.status === 204
}