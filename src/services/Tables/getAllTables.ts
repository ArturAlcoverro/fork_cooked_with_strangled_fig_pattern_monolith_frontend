const endpoint = '/table'

export default function getAllTables() {
  return fetch(`${import.meta.env.VITE_BACKEND_API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Response Error on "${endpoint}"`)
      return res.json()
    })
    .then((res) => res.filter((table: any) => table.active).sort((a: any, b: any) => a.id.value - b.id.value))
}
