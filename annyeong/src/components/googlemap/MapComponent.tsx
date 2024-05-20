import { GoogleMap, LoadScript } from '@react-google-maps/api';

const container = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34.497,
  lng: 150.644
}

export default function MapComponent() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_G_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={container} center={center} zoom={10}>

      </GoogleMap>
    </LoadScript>
  )
}
