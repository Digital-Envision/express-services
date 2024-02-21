export function startCase(str: string) {
  const trimmed = str.trim();

  return trimmed[0].toUpperCase() + trimmed.slice(1);
}

// Return prefix for skeleton in YYYYMMDDHHmmss format
export function createPrefix() {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day, hour, minute, second].join('');
}
