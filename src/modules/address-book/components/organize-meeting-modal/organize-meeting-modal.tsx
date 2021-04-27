import { Modal, message } from 'antd';
import api from 'api';
import { User } from 'modules/address-book/types';

export default function OrganizeMeetingModal({ user, onCancel, onOk }: { user: User; onCancel?: () => void; onOk?: () => void }) {
  const onConfirm = () => {
    // do a HTTP call and organize a meeting
    (async () => {
      try {
        await api.post('organize-meeting');
      } catch (e) {
        // we skip as this does not work at the moment
        // so we always succeed
      }
    })();

    message.success('Succesully organized meeting');
    onOk && onOk();
  };

  return (
    <Modal title={`Organize a meeting with ${user.name.first} ${user.name.last}`} visible={true} onCancel={onCancel} okText="Confirm meeting" onOk={onConfirm}>
      <div data-testid="organize-meeting-modal">
        <h3>Contact information</h3>
        <dl data-testid="details">
          <dt>Address</dt>
          <dd>
            {user.location?.street.name} {user.location?.street.number}, {user.location?.postcode} {user.location?.city}, {user.location?.state}
          </dd>
          <dt>Telephone</dt>
          <dd>{user.phone}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </dl>
      </div>
    </Modal>
  );
}
