'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const POSITION: [number, number] = [39.4559218, -0.3578184];

export default function LocationMap() {
  return (
    <div className="h-[350px] w-full overflow-hidden rounded-xl border border-[#e0e0e0] shadow-sm">
      <MapContainer
        center={POSITION}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={POSITION}
          icon={customIcon}
          ref={(ref) => {
            if (ref) {
              ref.openPopup();
            }
          }}
        >
          <Popup>
            <div className="font-sans text-xs font-medium">
              <strong className="block text-sm font-semibold">BEUATY.COWORKING</strong>
              Av. del Instituto Obrero de Valencia, 21, Bajo 5
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
