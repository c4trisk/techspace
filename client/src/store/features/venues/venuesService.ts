

const getAllVenuesAsync = async () => {
  const res = await fetch('http://localhost:8080/api/venues')

  if(!res.ok) throw new Error('Something went wrong when getting data')

  return res.json()
}

const venuesService = {
  getAllVenuesAsync
}

export default venuesService