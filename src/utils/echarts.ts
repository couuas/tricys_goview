// 设置position 判断超出页面时进行补偿
// x,y 组件的相对画布的偏移量 也就是attr.x attr.y
export const setTooltipPosition = (attr: { x: number, y: number }) => {
  const { x, y } = attr
  return (point: number[], params:unknown, dom:unknown, rect:unknown, size: { contentSize: number[] }) => {
    return [
      x + point[0] - size.contentSize[0] > 0 ? point[0] - size.contentSize[0] : point[0],
      y + point[1] - size.contentSize[1] > 0 ? point[1] - size.contentSize[1] : point[1]
    ]
  }
}