import { useAuth0 } from '@auth0/auth0-react'

let _getAccessTokenSilently = null


export function registerGetAccessToken(getTokenFn) {
_getAccessTokenSilently = getTokenFn
}


export async function getAccessToken() {
if (!_getAccessTokenSilently) throw new Error('getAccessToken not registered')
return await _getAccessTokenSilently()
}

export function isAdminFromUser(user) {
if (!user) return false
const rolesClaimCandidates = [
(user && user['https://pf-profsoftware/roles']),
(user && user['https://roles']),
(user && user.roles),
(user && user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'])
]
for (const c of rolesClaimCandidates) {
if (!c) continue
if (Array.isArray(c) && c.includes('admin')) return true
if (typeof c === 'string' && c === 'admin') return true
}
return false
}