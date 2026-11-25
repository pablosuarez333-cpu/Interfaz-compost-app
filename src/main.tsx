import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CompostProvider } from './context/CompostContext';
import { supabaseConfigError } from './lib/supabase';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento root');
}

const root = createRoot(rootElement);

if (supabaseConfigError) {
  root.render(
    <main
      style={{
        maxWidth: 560,
        margin: '60px auto',
        padding: 24,
        background: '#fee2e2',
        color: '#7f1d1d',
        borderRadius: 10,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Error de configuración</h2>
      <p>{supabaseConfigError}</p>
    </main>
  );
} else {
  root.render(
    <BrowserRouter>
      <AuthProvider>
        <CompostProvider>
          <App />
        </CompostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}