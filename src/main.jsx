import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router'

import Aos from 'aos'
import 'aos/dist/aos.css'; 

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist  bg-base-200'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>
)
