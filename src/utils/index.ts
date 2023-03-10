function addLighten(color: string, amount: number): string {
  // 亮度
  amount = Math.trunc((255 * amount) / 100)
  const value = parseInt(color, 16) + amount
  const result = value > 255 ? 255 : value < 0 ? 0 : value 
  
  return result.toString(16).length > 1
    ? result.toString(16)
    : `0${result.toString(16)}`
}

// 颜色加亮
export function colorLighten(color: string, amount: number): string {
  color = color.indexOf('#') === 0 ? color.substring(1) : color
  
  return `#${addLighten(color.substring(0, 2), amount)}${addLighten(
    color.substring(2, 4),
    amount
  )}${addLighten(color.substring(4, 6), amount)}`
}
