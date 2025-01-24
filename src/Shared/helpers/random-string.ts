export default (lenString = 8): string => {
  let result: string
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*-+'

  for (let i = lenString; i > 0; --i) {
    result = result + chars[Math.floor(Math.random() * chars.length)]
  }
  return result.replace('undefined', '')
}
