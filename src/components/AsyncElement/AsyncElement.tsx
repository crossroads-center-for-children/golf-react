import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import loadable from '@loadable/component';
import { AsyncElementProps } from '../../types';

const AsyncElement: FC<AsyncElementProps> = ({
  pageName,
  layoutName,
  hasOutlet,
  ...props
}) => {
  const Page = loadable(() => import(`../../pages/${pageName}`));
  const Layout = loadable(() => import(`../../layouts/${layoutName}`));

  return (
    <div {...props}>
      <Layout />
      <Page />
      {hasOutlet ? <Outlet /> : null}
    </div>
  );
};

export default AsyncElement;
