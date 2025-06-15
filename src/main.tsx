import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import MobxProvider from './provider/MobxProvider.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.min.css'

createRoot(document.getElementById('root')!).render(
  <MobxProvider>
    <App />
  </MobxProvider>
)
