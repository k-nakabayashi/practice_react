import { AppRoutes } from '@/routes';
import { AppProvider } from '@/providers/app'
import '@/App.css'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
