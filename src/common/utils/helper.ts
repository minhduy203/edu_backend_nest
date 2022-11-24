export function getCookie(cookies: string, name: string): any {
  const value = `; ${cookies}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
