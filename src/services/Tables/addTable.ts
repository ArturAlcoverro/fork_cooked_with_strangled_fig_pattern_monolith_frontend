const endpoint = '/table'

export default function addTable() {
  const raw = JSON.stringify({
    active: true,
  })

  return fetch(`${import.meta.env.VITE_BACKEND_API_URL}${endpoint}`, {
    method: 'POST',
    body: raw,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`Response Error on "${endpoint}"`)
    return res.json()
  })
}
