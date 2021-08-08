import React from 'react';
declare const ASStore: any;
export declare function useASStoredState<S>(key: string, initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
export default ASStore;
