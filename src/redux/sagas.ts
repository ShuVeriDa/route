import {setError, setPolyline} from "./route/routeSlice.ts";
import {IPolyLine, IRoute} from "../types/types.ts";
import {LatLngTuple} from "leaflet";
import {decodePolyline} from "../utils/decodePolyline.ts";
import {all, put, call, select, takeLatest} from "redux-saga/effects";
import {axiosClassic} from "../api/api.interceptor.ts";
import {RootStateType} from "./store.ts";

function* fetchPolylineData() {
  try {
    const currentRoute: IRoute = yield select((state: RootStateType) => state.route.currentRoute);

    if (!currentRoute || currentRoute.points.length === 0) {
      yield put(setPolyline([]));
      return;
    }

    const {data}: IPolyLine  = yield call(
      axiosClassic.get<IPolyLine>,
      `${currentRoute.points
        .map((point) => `${point.lng},${point.lat}`)
        .join(";")}`
    );

    const encodedPolyline = data.routes[0].geometry as string
    const decodedPolyline: LatLngTuple[][] | LatLngTuple[] | [] = decodePolyline(encodedPolyline);

    yield put(setPolyline(decodedPolyline));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* watchFetchPolylineData() {
  yield takeLatest("route/setCurrentRoute", fetchPolylineData);
}

export default function* rootSaga() {
  yield all([watchFetchPolylineData()]);
}