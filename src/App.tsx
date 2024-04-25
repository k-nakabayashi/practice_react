import { AppRoutes } from '@/routes';
import { AppProvider } from '@/providers/app'
import '@/App.css'
import '@/assets/css/tailwind.css'


function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
