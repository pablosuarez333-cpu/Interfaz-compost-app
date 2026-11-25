import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

function getConfigError() {
  if (!supabaseUrl || !supabaseKey) {
    return 'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_KEY. Revisa el archivo .env en la raíz del proyecto y reinicia "npm run dev".';
  }

  try {
    const { protocol } = new URL(supabaseUrl);
    if (protocol !== 'https:' && protocol !== 'http:') throw new Error();
  } catch {
    return `VITE_SUPABASE_URL no es una URL válida. Valor recibido: "${supabaseUrl}". Debe empezar con https:// (ejemplo: https://abcdefgh.supabase.co).`;
  }

  return null;
}

export const supabaseConfigError = getConfigError();

export const supabase = supabaseConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);