export default interface Route {
  path: string;
  componentName: string;
  layoutName: string;
  children?: Route[];
}
