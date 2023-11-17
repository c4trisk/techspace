
const getVenueAsync = async (slug: string) => {
  const res = await fetch('http://localhost:8080/api/venues/' + slug)

  if(!res.ok) throw new Error('Something went wrong when getting data')

  return res.json()
}

const venueService = {
  getVenueAsync
}

export default venueService