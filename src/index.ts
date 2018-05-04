import {lensPath, view, zipObj} from 'ramda';

export const jsonHoisting = (data: any, schema: any): any => {
  if (Object.prototype.toString.apply(schema) === '[object Array]') {
    const xLens = lensPath(schema[0].split('.'));
    const value: any[] = view(xLens, data);
    if (value === undefined) {
      return;
    } else if (Object.prototype.toString.apply(schema) !== '[object Array]') {
      throw new Error(`Type Error: value of ${schema[0]} should be an Array`);
    } else {
      return value.map((v: any) => jsonHoisting(v, schema[1]));
    }
  } else if (Object.prototype.toString.apply(schema) === '[object Object]') {
    const keys = Object.keys(schema);
    const values: any = keys.map(key => jsonHoisting(data, schema[key]));
    return zipObj(keys, values);
  } else if (Object.prototype.toString.apply(schema) === '[object String]') {
    const xLens = lensPath(schema.split('.'));
    return view(xLens, data);
  } else {
    throw new Error(`Unsupported schema type: ${Object.prototype.toString.apply(schema)}`);
  }
};
