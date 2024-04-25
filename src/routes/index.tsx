import { useRoutes } from 'react-router-dom';
import { errorRoutingConfig } from '@/routes/error'

export const AppRoutes = () => {

  const routingConfig = [
    {
      path: "/",
      element: <h2>test1</h2>,
    },
    {
      path: "/aaa",
      element: <h2>testaa</h2>,
    },
    ...errorRoutingConfig,
  ];
  
  const element = useRoutes(routingConfig);

  return <>{element}</>;
};
