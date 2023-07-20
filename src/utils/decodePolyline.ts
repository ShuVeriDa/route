import {LatLngTuple} from "leaflet";

export const decodePolyline = (encodedPolyline: string): LatLngTuple[] => {
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates: LatLngTuple[] = [];

  while (index < encodedPolyline.length) {
    let shift = 0;
    let result = 0;
    let byte;

    do {
      byte = encodedPolyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      byte = encodedPolyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
    lng += deltaLng;

    coordinates.push([lat / 1e5, lng / 1e5]);
  }

  return coordinates;
};