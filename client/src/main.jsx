import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter'ı import ediyoruz
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Redux store'u tüm uygulamaya erişilebilir hale getiriyoruz */}
    <App />
  </Provider>
)
