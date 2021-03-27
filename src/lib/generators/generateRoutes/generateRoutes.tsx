import { PartialRouteObject } from 'react-router';
import { AsyncElement } from '../../../components';
import { Route } from '../../../types';

const generateRoutes = (routes: Route[]): PartialRouteObject[] => {
  return routes.map(({ path, componentName, layoutName, children }) => ({
    element: (
      <AsyncElement
        pageName={componentName}
        layoutName={layoutName}
        hasOutlet={true}
      />
    ),
    children: children && generateRoutes(children),
    path,
  }));
};

export default generateRoutes;
