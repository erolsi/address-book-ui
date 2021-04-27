import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { css } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import store, { AddressBookStore } from 'modules/address-book/store';
import AddressBookSearch from '../address-book-search/address-book-search';
import AddressBookUser from '../address-book-user/address-book-user';
import isBottomPage from 'helpers/is-bottom-page';

const AddressBookPage = observer(({ store }: { store: AddressBookStore }) => {
  useEffect(() => {
    // load initial users
    store.load();

    return () => store.reset();
  }, [store]);

  useEffect(() => {
    // load additional users on reaching bottom of the page
    // we add buffer to start loading before we reach the end
    const onScroll = () => {
      const bottom = isBottomPage(500);

      if (bottom) {
        store.loadNextPage();
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, [store]);

  return (
    <div>
      <AddressBookSearch onSearch={(value) => store.search(value)} />
      <div
        className="site-card-wrapper"
        css={css`
          margin-top: 60px;
        `}
      >
        <Row gutter={16} data-testid="grid">
          {store.visibleUsers.length || store.loading ? (
            store.visibleUsers.map((user) => {
              return (
                <Col key={user.email} span={6}>
                  <AddressBookUser user={user} />
                </Col>
              );
            })
          ) : (
            <Col span={24}>No results</Col>
          )}
        </Row>
      </div>
    </div>
  );
});

const AddressBookPageWrapped = () => <AddressBookPage store={store} />;

export default AddressBookPageWrapped;
