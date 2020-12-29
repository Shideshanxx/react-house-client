import styles from './index.css';
import {MenuBar } from '@/components';
import { useLocation } from 'umi';
import { StoreProvider } from 'think-react-store';
import * as store from '../stores';

function BasicLayout(props) {
  // location.pathname为当前路径
  const location = useLocation();
  const paths = ['/', '/order', '/user']
  return (
    <StoreProvider store={store}>
      <MenuBar
        show={paths.includes(location.pathname)}
        pathname={location.pathname}
      />
      {props.children}
    </StoreProvider>
  );
}

export default BasicLayout;
