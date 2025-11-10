import React, { useState } from 'react'
import { createCurso } from '../utils/api'
import { useNavigate } from 'react-router-dom'


export default function CreateCurso() {
const [form, setForm] = useState({ nome: '', descricao: '', nota: 0, nomeProfessor: '' })
const [saving, setSaving] = useState(false)
const navigate = useNavigate()


function change(e) {
const { name, value } = e.target
setForm(prev => ({ ...prev, [name]: name === 'nota' ? Number(value) : value }))
}


async function submit(e) {
e.preventDefault()
setSaving(true)
try {
await createCurso(form)
alert('Curso criado')
navigate('/')
} catch (err) {
console.error(err)
alert('Erro ao criar curso')
} finally {
setSaving(false)
}
}


return (
<div style={{ padding: 20 }}>
<h1>Criar Curso</h1>
<form onSubmit={submit}>
<div>
<label>Nome</label><br />
<input name="nome" value={form.nome} onChange={change} required />
</div>
<div>
<label>Descrição</label><br />
<textarea name="descricao" value={form.descricao} onChange={change} />
</div>
<div>
<label>Nota (0-5)</label><br />
<input type="number" name="nota" value={form.nota} min="0" max="5" onChange={change} required />
</div>
<div>
<label>Professor</label><br />
<input name="nomeProfessor" value={form.nomeProfessor} onChange={change} required />
</div>
<div style={{ marginTop: 10 }}>
<button type="submit" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
</div>
</form>
</div>
)
}