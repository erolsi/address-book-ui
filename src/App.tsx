import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from 'components/main-layout/main-layout';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { css } from '@emotion/react';

const AddressBookModuleLazy = React.lazy(() => import('./modules/address-book'));
const SettingsModuleLazy = React.lazy(() => import('./modules/settings'));

const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

function App() {
  return (
    <React.Suspense
      fallback={
        <div
          css={css`
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Spin indicator={loadingIcon} />
        </div>
      }
    >
      <Router>
        <MainLayout>
          <Switch>
            <Route path="/" exact={true}>
              <AddressBookModuleLazy />
            </Route>
            <Route path="/settings">
              <SettingsModuleLazy />
            </Route>
          </Switch>
        </MainLayout>
      </Router>
    </React.Suspense>
  );
}

export default App;
