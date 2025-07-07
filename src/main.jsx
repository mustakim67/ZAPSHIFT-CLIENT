import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

import Aos from 'aos'
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContext/AuthProvider'

Aos.init();
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist  bg-base-200'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>

    </div>
  </StrictMode>
)
