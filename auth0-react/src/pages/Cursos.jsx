import React, { useEffect, useState } from 'react'
import { isAdminFromUser } from '../utils/auth'


export default function Cursos() {
const [cursos, setCursos] = useState([])
const [loading, setLoading] = useState(true)
const { user } = useAuth0()
const isAdmin = isAdminFromUser(user)


useEffect(() => {
fetchCursos()
}, [])


async function fetchCursos() {
setLoading(true)
try {
const data = await listCursos()
setCursos(data)
} catch (err) {
console.error(err)
alert('Erro ao carregar cursos')
} finally {
setLoading(false)
}
}


async function handleDelete(id) {
if (!window.confirm('Confirma exclusão?')) return
try {
await deleteCurso(id)
setCursos(prev => prev.filter(c => c.id !== id))
} catch (err) {
console.error(err)
alert('Erro ao deletar (verifique se você é admin e se o backend valida roles)')
}
}


if (loading) return <div>Carregando cursos...</div>


return (
<div style={{ padding: 20 }}>
<h1>Cursos</h1>
{cursos.length === 0 && <p>Nenhum curso cadastrado.</p>}
<ul>
{cursos.map(c => (
<li key={c.id} style={{ marginBottom: 10 }}>
<strong>{c.nome}</strong> — {c.descricao} <br />
Nota: {c.nota} — Professor: {c.nomeProfessor}
{isAdmin && (
<button style={{ marginLeft: 12 }} onClick={() => handleDelete(c.id)}>Deletar</button>
)}
</li>
))}
</ul>
</div>
)
}