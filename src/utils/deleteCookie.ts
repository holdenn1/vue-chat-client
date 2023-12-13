export function deleteCookie(name: 'refresh_token' | 'access_token' | string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
