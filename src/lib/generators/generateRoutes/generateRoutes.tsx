import { PartialRouteObject } from 'react-router';
import { AsyncElement } from '../../../components';

const generateRoutes = (routes: any[]): PartialRouteObject[] => {
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
