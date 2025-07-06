import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import { FaSearchLocation } from "react-icons/fa";

const defaultPosition = [23.685, 90.3563]; // Center of Bangladesh

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45],
});

// Helper to jump to map location
const MapFlyTo = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 13, { duration: 1.5 });
    }
  }, [coords, map]);
  return null;
};

const BangladeshMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (match) {
      setActiveCoords([match.latitude, match.longitude]);
      setActiveMarkerIndex(serviceCenters.indexOf(match));
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="relative w-full h-[700px] rounded-xl overflow-hidden border shadow-xl bg-white">
      {/* Search box */}
      <form
        onSubmit={handleSearch}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[999] w-full max-w-md bg-white/90 backdrop-blur-md border rounded-full px-4 py-2 flex items-center shadow-lg"
      >
        <FaSearchLocation className="text-gray-600 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search district..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-sm"
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary rounded-full px-4"
        >
          Go
        </button>
      </form>

      {/* Map */}
      <MapContainer
        center={defaultPosition}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {activeCoords && <MapFlyTo coords={activeCoords} />}

        {serviceCenters.map((center, idx) => (
          <Marker
            key={idx}
            position={[center.latitude, center.longitude]}
            icon={customIcon}
          >
            <Popup autoOpen={idx === activeMarkerIndex}>
              <div>
                <h3 className="font-semibold text-lg">{center.district}</h3>
                <p className="text-sm text-gray-600">
                  Areas: {center.covered_area.join(", ")}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
