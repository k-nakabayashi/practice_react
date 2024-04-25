import { useRoutes } from 'react-router-dom';
import { TopPage, GraphPage } from '@/pages';
import { errorRoutingConfig } from '@/routes/error';


export const AppRoutes = () => {

  const routingConfig = [
    {
      path: "/",
      element: <TopPage />,
    },
    {
      path: "/graph",
      element: <GraphPage />,
    },
    ...errorRoutingConfig,
  ];
  
  const element = useRoutes(routingConfig);

  return <>{element}</>;
};
