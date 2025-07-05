import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import serviceCentersByDistrict from '../../serviceCenters.json';

const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapFlyTo({ searchQuery, setVisibleCenters }) {
    const map = useMap();

    useEffect(() => {
        const lowerSearch = searchQuery.toLowerCase().trim();

        if (!searchQuery || lowerSearch === '') {
            // Default to Dhaka's centers when search is empty
            const dhakaCenters = serviceCentersByDistrict['Dhaka'] || [];
            setVisibleCenters(dhakaCenters);

            if (dhakaCenters.length > 0) {
                const bounds = L.latLngBounds(dhakaCenters.map((c) => [c.lat, c.long]));
                const center = bounds.getCenter();
                map.flyTo(center, 12, { animate: true, duration: 1.5 });
            }
            return;
        }

        // Search logic: district match
        const matchedDistrict = Object.keys(serviceCentersByDistrict).find((district) =>
            district.toLowerCase().includes(lowerSearch)
        );

        if (matchedDistrict) {
            const centers = serviceCentersByDistrict[matchedDistrict];
            setVisibleCenters(centers);

            if (centers.length > 0) {
                const bounds = L.latLngBounds(centers.map((c) => [c.lat, c.long]));
                const center = bounds.getCenter();
                map.flyTo(center, 12, { animate: true, duration: 1.5 });
            }
            return;
        }

        // Search by service center name
        let matchedCenters = [];
        Object.values(serviceCentersByDistrict).forEach((centers) => {
            centers.forEach((center) => {
                if (center.name.toLowerCase().includes(lowerSearch)) {
                    matchedCenters.push(center);
                }
            });
        });

        if (matchedCenters.length > 0) {
            setVisibleCenters(matchedCenters);
            const bounds = L.latLngBounds(matchedCenters.map((c) => [c.lat, c.long]));
            const center = bounds.getCenter();
            map.flyTo(center, 14, { animate: true, duration: 1.5 });
        } else {
            setVisibleCenters([]);
        }
    }, [searchQuery, map, setVisibleCenters]);

    return null;
}


const CoverageMap = ({ searchQuery }) => {
    const [visibleCenters, setVisibleCenters] = useState([]);

    return (
        <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            style={{ height: '400px', width: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MapFlyTo searchQuery={searchQuery} setVisibleCenters={setVisibleCenters} />
            {visibleCenters.map((center, idx) => (
                <Marker key={idx} position={[center.lat, center.long]} icon={customIcon}>
                    <Tooltip permanent direction='right' offset={[10, 0]}>
                        {center.name}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default CoverageMap;
