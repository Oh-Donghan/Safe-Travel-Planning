// "use-client";

import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export default function GMap() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={import.meta.env.VITE_G_MAP_API_KEY}>
      <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>
        <Map zoom={9} center={position} mapId={import.meta.env.VITE_G_MAP_ID}>
          <AdvancedMarker
            position={position}
            onClick={() => setOpen(true)}
          ></AdvancedMarker>

          {open && (
            <InfoWindow
              position={position}
              onCloseClick={() => setOpen(false)}
            >
              <p className=' text-stone-900'>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
