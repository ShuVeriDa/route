import {FC} from 'react';
import {IRoute} from "../../types/types.ts";
import styles from './RoutList.module.scss';
import {routes} from "../../redux/routes.ts";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../redux/store.ts";
import {setCurrentRoute} from "../../redux/route/routeSlice.ts";
import {Space, Table} from "antd";
import {LatLngTuple} from "leaflet";

interface IRouteListProps {
  currentRoute: IRoute;
}

export const RouteList: FC<IRouteListProps> = ({ currentRoute }) => {
  const dispatch = useDispatch<AppDispatchType>();

  const handleRouteSelection = (routeId: number) => {
    const selected = routes.find((route) => route.id === routeId);
    if (selected) {
      dispatch(setCurrentRoute(selected));
    }
  };

  const columns = [
    {
      title: `Маршрут № ${currentRoute.id}`,
      dataIndex: 'id',
      key: 'id',
      render: (text: string, record: IRoute) => (
        <span
          style={{
            backgroundColor: record.id === currentRoute?.id ? '#E6F7FF' : 'transparent',
            padding: '8px',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Точки (lat, lng)',
      dataIndex: 'points',
      key: 'points',
      render: (points: LatLngTuple[]) => (
        <Space direction="vertical">
          {points.map((lat, i) => (
            <span key={i}>
              {lat.lat} {lat.lng}
            </span>
          ))}
        </Space>
      ),
    },
  ];

  const data = routes.map((route) => ({
    key: route.id,
    id: route.id,
    points: route.points,
  }));

  return (
    <div className={styles.wrapper}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRouteSelection(record.id),
        })}
        rowClassName={(record) =>
          record.id === currentRoute?.id ? styles.selectedRow : ''
        }
        bordered
      />
    </div>
  );
};