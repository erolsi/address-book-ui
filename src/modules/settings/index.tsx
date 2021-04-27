import { Switch, Route } from 'react-router-dom';
import SettingsPage from './components/settings-page/settings-page';

export default function AddressBookModule() {
  return (
    <Switch>
      <Route path="/">
        <SettingsPage />
      </Route>
    </Switch>
  );
}
