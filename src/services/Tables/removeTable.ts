const endpoint = '/table'

export default function removeTable(id: number) {
  return fetch(`${import.meta.env.VITE_BACKEND_API_URL}${endpoint}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`Response Error on "${endpoint}"`)
    return true
  })
}
