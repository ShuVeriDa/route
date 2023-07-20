import './App.css'
import styles from './Main.module.scss';
import {Map} from "./components/Map/Map.tsx";
import {RouteList} from "./components/RouteList/RouteList.tsx";
import {AppDispatchType, RootStateType, useAppSelector} from "./redux/store.ts";
import {setCurrentRoute} from "./redux/route/routeSlice.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {routes} from "./redux/routes.ts";
import {Alert, Space} from "antd";

function App() {
  const dispatch = useDispatch<AppDispatchType>();
  const {currentRoute, polyline, error} = useAppSelector((state: RootStateType) => state.route);

  useEffect(() => {
    dispatch(setCurrentRoute(routes[0]));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <RouteList currentRoute={currentRoute}
      />
      <Map currentRoute={currentRoute}
           polyline={polyline}
      />
      {error && <Space direction="vertical" className={styles.alert}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable={true}
        />
      </Space>}
    </div>
  )
}

export default App
