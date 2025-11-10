import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

// Read env vars (VITE_*)
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

if (!domain || !clientId) {
  console.error('Missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID in environment. See .env.example')
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        // adicione audience se sua API exigir tokens de acesso
        audience: audience || undefined
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
