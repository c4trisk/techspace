

const getAllVenuesAsync = async () => {
  const res = await fetch('http://localhost:8080/api/venues')

  if(!res.ok) throw new Error('Something went wrong when getting data')

  return res.json()
}

const getFilteredVenuesAsync = async (filters: Record<string, string>) => {

  const queryParams = new URLSearchParams(filters).toString()

  console.log(queryParams)

  const res = await fetch(`http://localhost:8080/api/venues?${queryParams}`)

  if(!res.ok) throw new Error('Something went wrong when getting data')

  return res.json()
}

const venuesService = {
  getAllVenuesAsync,
  getFilteredVenuesAsync
}

export default venuesService