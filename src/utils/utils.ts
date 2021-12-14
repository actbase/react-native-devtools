export const code: (string: string) => Number | any | BigInt = string => string.charCodeAt(0);
const createArray: (number: number) => Array<any> = number => [...Array(number)];
const _smallCase: Array<string> = createArray(code('z') - code('a') + 1).map((_, i) =>
  String.fromCharCode(code('a') + i),
);
const _largeCase: Array<string> = createArray(code('Z') - code('A') + 1).map((_, i) =>
  String.fromCharCode(code('A') + i),
);
const _numbers: Array<string> = createArray(10).map((_, i) => String(i));
const _strings: Array<string> = [..._smallCase, ..._largeCase, ..._numbers];
export const generateUnique: (length?: Number) => string = (length: Number = 8) => {
  return _strings
    .reduce(
      (p: Array<string>, _: string, __: any, a: Array<string>) =>
        p.length >= length ? p : [...p, a[Math.floor(Math.random() * a.length)]],
      [],
    )
    .join('');
};

export const getByteSizeAdjust: (byte: number) => string = (byte: number) => {
  if (byte < 1024) return `${byte} B`;
  if (byte < 1024 * 1024) return `${(byte / 1024).toFixed(2)} KB`;
  if (byte < 1024 * 1024 * 1024) return `${(byte / (1024 * 1024)).toFixed(2)} MB`;
  if (byte < 1024 * 1024 * 1024 * 1024) return `${(byte / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  if (byte < 1024 * 1024 * 1024 * 1024 * 1024) return `${(byte / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`;
  return '';
};

export const zf = (value: number | string, length: number = 2, fill: string = '0') => {
  const s = `${value}`;
  if (s.length > length) return s;
  return `${fill.repeat(length - s.length)}${s}`;
};

export const dateToTimeString: (date: Date) => string = (date: Date) => {
  return `${zf(date.getHours())}:${zf(date.getMinutes())}:${zf(date.getSeconds())}.${zf(date.getMilliseconds(), 3)}`;
};

