import { __assign, __awaiter, __generator } from "tslib";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
var _store = {
  value: {},
  timeout: null
};

(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      AsyncStorage.getItem('_DevTool_').then(function (value) {
        if (value) _store.value = JSON.parse(value);
      });
      return [2
      /*return*/
      ];
    });
  });
})();

var ASStore = {
  set: function (key, value) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        if (_store.timeout) {
          clearTimeout(_store.timeout);
          _store.timeout = null;
        }

        _store.value = __assign(__assign({}, _store.value), (_a = {}, _a[key] = value, _a));
        _store.timeout = setTimeout(function () {
          if (_store.timeout) {
            clearTimeout(_store.timeout);
            _store.timeout = null;
          }

          AsyncStorage.setItem('_DevTool_', JSON.stringify(_store.value));
        }, 1000);
        return [2
        /*return*/
        ];
      });
    });
  },
  get: function (key) {
    var _a;

    return (_a = _store.value) === null || _a === void 0 ? void 0 : _a[key];
  }
};
export function useASStoredState(key, initialState) {
  var _a = React.useState(ASStore.get(key) || initialState),
      state = _a[0],
      setState = _a[1];

  React.useEffect(function () {
    ASStore.set(key, state);
  }, [state]);
  return [state, setState];
}
export default ASStore;