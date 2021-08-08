import React from 'react';
import { AxiosContenxtProviderProps, IAxiosLogContext } from '../@types/axios';
declare const AxiosContext: React.Context<IAxiosLogContext>;
declare const AxiosContextProvider: ({ children, axiosInstances }: AxiosContenxtProviderProps) => JSX.Element;
export { AxiosContext, AxiosContextProvider };
