import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


export default function Nav() {
const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()


return (
<nav className="nav">
<div className="nav-left">
<Link to="/">Cursos</Link>
{isAuthenticated && <Link to="/create">Criar</Link>}
</div>
<div className="nav-right">
{isAuthenticated ? (
<>
<span className="username">{user?.name || user?.email}</span>
<button onClick={() => logout({ returnTo: window.location.origin })}>Sair</button>
</>
) : (
<button onClick={() => loginWithRedirect()}>Entrar</button>
)}
</div>
</nav>
)
}