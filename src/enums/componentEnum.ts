export enum COMPONENT_SIZE_ENUM {
  TINY = 'tiny', 
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export const componentSizeMap =  new Map([
  [COMPONENT_SIZE_ENUM.TINY, '迷你'],
  [COMPONENT_SIZE_ENUM.SMALL, '小'],
  [COMPONENT_SIZE_ENUM.MEDIUM, '中'],
  [COMPONENT_SIZE_ENUM.LARGE, '大'],
])