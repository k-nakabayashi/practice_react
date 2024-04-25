import { useRoutes } from 'react-router-dom';
import { TopPage } from '@/pages';
import { errorRoutingConfig } from '@/routes/error';


export const AppRoutes = () => {

  const routingConfig = [
    {
      path: "/",
      element: <TopPage />,
    },
    {
      path: "/graph",
      element: <h2>testaa</h2>,
    },
    ...errorRoutingConfig,
  ];
  
  const element = useRoutes(routingConfig);

  return <>{element}</>;
};
