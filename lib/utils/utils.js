import { __spreadArrays } from "tslib";
export var code = function (string) {
  return string.charCodeAt(0);
};

var createArray = function (number) {
  return __spreadArrays(Array(number));
};

var _smallCase = createArray(code('z') - code('a') + 1).map(function (_, i) {
  return String.fromCharCode(code('a') + i);
});

var _largeCase = createArray(code('Z') - code('A') + 1).map(function (_, i) {
  return String.fromCharCode(code('A') + i);
});

var _numbers = createArray(10).map(function (_, i) {
  return String(i);
});

var _strings = __spreadArrays(_smallCase, _largeCase, _numbers);

export var generateUnique = function (length) {
  if (length === void 0) {
    length = 8;
  }

  return _strings.reduce(function (p, _, __, a) {
    return p.length >= length ? p : __spreadArrays(p, [a[Math.floor(Math.random() * a.length)]]);
  }, []).join('');
};
export var getByteSizeAdjust = function (byte) {
  if (byte < 1024) return byte + " B";
  if (byte < 1024 * 1024) return (byte / 1024).toFixed(2) + " KB";
  if (byte < 1024 * 1024 * 1024) return (byte / (1024 * 1024)).toFixed(2) + " MB";
  if (byte < 1024 * 1024 * 1024 * 1024) return (byte / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  if (byte < 1024 * 1024 * 1024 * 1024 * 1024) return (byte / (1024 * 1024 * 1024 * 1024)).toFixed(2) + " TB";
  return '';
};
export var zf = function (value, length, fill) {
  if (length === void 0) {
    length = 2;
  }

  if (fill === void 0) {
    fill = '0';
  }

  var s = "" + value;
  if (s.length > length) return s;
  return "" + fill.repeat(length - s.length) + s;
};
export var dateToTimeString = function (date) {
  return zf(date.getHours()) + ":" + zf(date.getMinutes()) + ":" + zf(date.getSeconds()) + "." + zf(date.getMilliseconds(), 3);
};