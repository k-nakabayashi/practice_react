import { Error400, Error404, Error429, Error500 } from '@/pages/error'

export const errorRoutingConfig = [
    {
      path: '400',
      element: <Error400 />,
    },
    {
      path: '429',
      element: <Error429 />,
    },

    {
      path: '500',
      element: <Error500 />,
    },

    {
      path: '404',
      element: <Error404 />,
    },

    {
      path: '*',
      element: <Error404 />,
    },
  ];
