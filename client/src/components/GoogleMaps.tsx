
interface GoogleMapsProps {
  address: string
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ address }) => {

  const mapURL: string = `https://www.google.com/maps/embed/v1/place?q=${address.split(' ')[0]}+${address.split(' ')[1]},+Stockholm,+Sweden&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`

  return (
    <div className='GoogleMaps'>
      <div id="embed-ded-map-canvas">
        <iframe src={mapURL}></iframe>
      </div>
      <div className="overlay"></div>
    </div>
  )
}

export default GoogleMaps