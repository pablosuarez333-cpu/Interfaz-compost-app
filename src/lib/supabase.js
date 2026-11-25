import { createClient } from '@supabase/supabase-js';

// Elimina todo lo que no sea ASCII visible (espacios, saltos de línea \r \n, comillas
// y símbolos ocultos). Ni una URL ni una clave de Supabase contienen esos caracteres.
function cleanEnv(value) {
  return (value ?? '').replace(/["']/g, '').replace(/[^\x21-\x7E]/g, '');
}

const rawKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';

const supabaseUrl = cleanEnv(import.meta.env.VITE_SUPABASE_URL)
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

const supabaseKey = cleanEnv(rawKey);

function getConfigError() {
  if (!supabaseUrl || !supabaseKey) {
    return 'Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_PUBLISHABLE_KEY. Revisa las variables de entorno y vuelve a desplegar.';
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

if (!supabaseConfigError) {
  console.info(
    `[Compost Platform] Supabase configurado. URL: ${supabaseUrl} | longitud de la clave: ${supabaseKey.length}`
  );

  if (rawKey.length !== supabaseKey.length) {
    console.warn(
      `[Compost Platform] Se eliminaron ${rawKey.length - supabaseKey.length} caracteres inválidos de la clave. Conviene volver a pegarla en Vercel.`
    );
  }
}

export const supabase = supabaseConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);