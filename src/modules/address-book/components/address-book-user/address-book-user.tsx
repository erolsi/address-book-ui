import React from 'react';
import { useState } from 'react';
import { Button, Card, Skeleton } from 'antd';
import { css } from '@emotion/react';
import { UserState } from 'modules/address-book/store';
import { User } from 'modules/address-book/types';
import OrganizeMeetingModal from '../organize-meeting-modal/organize-meeting-modal';
import LazyAvatar from 'components/lazy-avatar/lazy-avatar';

export default function AddressBookUser({ user }: { user: UserState }) {
  const [organizeMeeting, setOrganizeMeeting] = useState<User | null>(null);

  return (
    <>
      <Card
        hoverable
        css={css`
          &.ant-card {
            margin-bottom: 16px;
            min-height: 166px;
          }
        `}
        data-testid="address-book-user"
      >
        <Skeleton loading={user.loading} avatar active>
          <Card.Meta
            title={`${user.name.first} ${user.name.last} ${user.name.username ? `- ${user.name.username}` : ''}`}
            description={
              <div>
                {user.email}
                <br />
                <br />
                <Button type="primary" onClick={() => setOrganizeMeeting(user)}>
                  Organize a meeting
                </Button>
              </div>
            }
            avatar={<LazyAvatar alt={`${user.name.first} ${user.name.last}`} src={user.picture.large} />}
            data-testid="meta"
          />
        </Skeleton>
      </Card>
      {organizeMeeting ? (
        <OrganizeMeetingModal user={organizeMeeting} onCancel={() => setOrganizeMeeting(null)} onOk={() => setOrganizeMeeting(null)} />
      ) : null}
    </>
  );
}
