export function startCase(str: string) {
  const trimmed = str.trim();

  return trimmed[0].toUpperCase() + trimmed.slice(1);
}

// Return prefix for skeleton in YYYYMMDDHHmmss format
export function createPrefix() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  return [year, month, day, hour, minute, second].join('');
}
