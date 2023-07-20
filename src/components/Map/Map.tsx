import {IRoute} from "../../types/types.ts";
import {FC, useEffect, useRef} from "react";
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from './Map.module.scss';
import L, {LatLngTuple} from "leaflet";

interface IMapProps {
  currentRoute: IRoute;
  polyline: LatLngTuple[][] | LatLngTuple[] | [];
}

export const Map: FC<IMapProps> = ({ currentRoute, polyline }) => {
  const mapRef = useRef<MapContainer>(null);

  useEffect(() => {
    if (mapRef.current && currentRoute.points.length > 0) {
      const bounds = L.latLngBounds(currentRoute.points.map((point) => [point.lat, point.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [currentRoute]);

  return (
    <div className={styles.wrapper}>
      <MapContainer
        ref={mapRef}
        center={[currentRoute.points[0].lat, currentRoute.points[0].lng]}
        zoom={12}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentRoute && (
          <>
            {polyline.length > 0 && <Polyline positions={polyline} />}
            {currentRoute.points.map((point, index) => (
              <Marker key={index} position={[point.lat, point.lng]} />
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
};