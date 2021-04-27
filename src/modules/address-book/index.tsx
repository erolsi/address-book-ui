import { Switch, Route } from 'react-router-dom';
import AddressBookPage from './components/address-book-page/address-book-page';

export default function AddressBookModule() {
  return (
    <Switch>
      <Route path="/">
        <AddressBookPage />
      </Route>
    </Switch>
  );
}
