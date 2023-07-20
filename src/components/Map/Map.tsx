import {IRoute} from "../../types/types.ts";
import {FC} from "react";
import {MapContainer, Marker, Polyline, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from './Map.module.scss';
import {LatLngTuple} from "leaflet";

interface IMapProps {
  currentRoute: IRoute;
  polyline: LatLngTuple[][] | LatLngTuple[] | [];
}

export const Map: FC<IMapProps> = ({ currentRoute, polyline }) => {
  return (
    <div className={styles.wrapper}>
      <MapContainer center={[currentRoute.points[2].lat, currentRoute.points[2].lng]}
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