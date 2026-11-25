import { createClient } from '@supabase/supabase-js';

// Elimina todo lo que no sea ASCII visible (espacios, saltos de línea \r \n, comillas
// y símbolos ocultos). Ni una URL ni una clave de Supabase contienen esos caracteres.
function cleanEnv(value) {
  return (value ?? '').replace(/["']/g, '').replace(/[^\x21-\x7E]/g, '');
}

// Si se pegó más texto del necesario (por ejemplo "NOMBRE=clave" o la clave dos veces),
// se toma solo la primera clave válida que aparezca.
function extractKey(raw) {
  const tokens = (raw ?? '').split(/[\s"'=]+/).filter(Boolean);
  const found = tokens.find(
    (token) => token.startsWith('sb_publishable_') || token.startsWith('eyJ')
  );
  return found ?? cleanEnv(raw);
}

const rawKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? '';

const supabaseUrl = cleanEnv(import.meta.env.VITE_SUPABASE_URL)
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/+$/, '');

const supabaseKey = extractKey(rawKey);

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

  // Una clave secreta nunca debe viajar al navegador
  if (rawKey.includes('sb_secret_')) {
    return 'VITE_SUPABASE_PUBLISHABLE_KEY contiene una clave SECRETA. Elimínala de inmediato, genera una nueva en Supabase y usa la clave que empieza con sb_publishable_.';
  }

  return null;
}

export const supabaseConfigError = getConfigError();

if (!supabaseConfigError) {
  console.info(
    `[Compost Platform] Supabase configurado. URL: ${supabaseUrl} | longitud de la clave: ${supabaseKey.length}`
  );

  if (rawKey.trim().length !== supabaseKey.length) {
    console.warn(
      `[Compost Platform] La variable de la clave traía ${rawKey.trim().length} caracteres y se usó solo la primera clave válida (${supabaseKey.length}). Corrige el valor en Vercel.`
    );
  }

  if (!supabaseKey.startsWith('sb_publishable_') && !supabaseKey.startsWith('eyJ')) {
    console.warn(
      '[Compost Platform] La clave no empieza con sb_publishable_ ni con eyJ. Verifica que sea la clave correcta.'
    );
  }
}

export const supabase = supabaseConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);