import { css } from '@emotion/react';
import { Avatar, AvatarProps } from 'antd';
import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazyAvatar(props: AvatarProps & React.RefAttributes<any>) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px'
  });

  return (
    <span ref={ref}>
      {inView ? (
        <Avatar {...props} data-testid="avatar" />
      ) : (
        <div
          className="ant-avatar ant-avatar-circle ant-avatar-image"
          data-testid="avatar-placeholder"
          css={css`
            &.ant-avatar-image {
              background: #eee;
            }
          `}
        ></div>
      )}
    </span>
  );
}
