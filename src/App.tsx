import { AppRoutes } from '@/routes';
import { AppProvider } from '@/AppProvider';
import '@/App.css';


function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
