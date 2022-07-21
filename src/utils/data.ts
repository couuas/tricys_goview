export const mapToOptions = <K extends string = 'key', V extends string = 'value'>(map: Map<string, string>, options = { k: 'label', v: 'value'} as { k: K; v: V }) => Array.from(map, item => {
  return {
    [options.k]: item[1],
    [options.v]: item[0],
  } as {[key in K | V]: string}
});