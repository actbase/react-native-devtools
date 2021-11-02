import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const _store: { value: any; timeout: NodeJS.Timeout | null } = {
  value: {},
  timeout: null,
};

(async () => {
  AsyncStorage.getItem('_DevTool_').then(value => {
    if (value) _store.value = JSON.parse(value);
  });
})();

const ASStore: any = {
  set: async (key: string, value: Object | number | string) => {
    if (_store.timeout) {
      clearTimeout(_store.timeout);
      _store.timeout = null;
    }
    _store.value = { ..._store.value, [key]: value };
    _store.timeout = setTimeout(() => {
      if (_store.timeout) {
        clearTimeout(_store.timeout);
        _store.timeout = null;
      }
      AsyncStorage.setItem('_DevTool_', JSON.stringify(_store.value));
    }, 1000);
  },
  get: (key: string): any => _store.value?.[key],
};

export function useASStoredState<S>(
  key: string,
  initialState: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = React.useState<S>(ASStore.get(key) || initialState);
  React.useEffect(() => {
    ASStore.set(key, state);
  }, [state]);
  return [state, setState];
}

export default ASStore;
