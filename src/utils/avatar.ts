export function getAvatarSrc(avatar: string): string {
  return 'https://ya-praktikum.tech/api/v2/resources' + encodeURI(avatar)
}
