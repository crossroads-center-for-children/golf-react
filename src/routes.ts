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
    path: '/',
    componentName: 'Splash',
    layoutName: 'SplashLayout',
  },
];

export default routes;
