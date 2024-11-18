import './App.css'
import { Suspense, lazy } from 'react'
import CreditCardIframe from "./CreditCardIframe.tsx";

// Works also with SSR as expected
const Sidebar = lazy(() => import('./Sidebar.tsx'))

function App() {
  return (
    <>
      <main className='main'>
        <h1>Checkout</h1>
        <CreditCardIframe />
      </main>
      <Suspense fallback={<p>Loading sidebar component...</p>}>
        <Sidebar />
      </Suspense>
    </>
  )
}

export default App
