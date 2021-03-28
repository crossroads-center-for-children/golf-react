const routes: any[] = [
  {
    path: 'register',
    componentName: 'Register',
    layoutName: 'MainLayout',
    children: [
      {
        path: 'pay',
        componentName: 'Pay',
        layout: 'MainLayout',
      },
    ],
  },
  {
    path: 'success',
    componentName: 'Success',
    layoutName: 'MainLayout',
  },
  {
    path: '/',
    componentName: 'Splash',
    layoutName: 'SplashLayout',
  },
];

export default routes;
