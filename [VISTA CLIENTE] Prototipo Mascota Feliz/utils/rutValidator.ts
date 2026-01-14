// Utilidades para validación de RUT chileno

export function formatRUT(rut: string): string {
  // Elimina caracteres no numéricos excepto K
  const cleaned = rut.replace(/[^0-9kK]/g, '');
  
  if (cleaned.length < 2) return cleaned;
  
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1).toUpperCase();
  
  // Formatea con puntos y guión
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formatted}-${dv}`;
}

export function validateRUT(rut: string): boolean {
  // Elimina puntos y guión
  const cleaned = rut.replace(/\./g, '').replace(/-/g, '');
  
  if (cleaned.length < 2) return false;
  
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1).toUpperCase();
  
  // Validar que el cuerpo sea numérico
  if (!/^\d+$/.test(body)) return false;
  
  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDV = 11 - (sum % 11);
  const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();
  
  return dv === calculatedDV;
}

export function cleanRUT(rut: string): string {
  return rut.replace(/\./g, '').replace(/-/g, '');
}
