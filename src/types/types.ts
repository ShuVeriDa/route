export interface IPoint {
  lat: number;
  lng: number;
}

export interface IRoute {
  id: number;
  points: IPoint[];
  polyline?: IPoint[];
}

export interface ILegs {
  steps: [],
  summary: string,
  weight: number,
  duration: number,
  distance: number
}

export interface IRoutes {
  geometry: string,
  legs: ILegs[],
  weight_name: string,
  weight: number,
  duration: number,
  distance: number
}

export interface IWaypoints {
  hint: string,
  distance: number,
  name: string,
  location: number[]
}

export interface IPolyLine {
  code: string,
  routes: IRoutes[],
  waypoints: IWaypoints[]
}

