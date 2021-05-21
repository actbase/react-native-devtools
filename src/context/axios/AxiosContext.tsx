import React, { useState, createContext } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultAxiosContext: IAxiosLogContext = {
  reqLog: [],
  resLog: [],
  useInterceptor: () => { },
  ejectInterceptor: () => { },
  clearLogList: () => { },
};

const AxiosContext = createContext(defaultAxiosContext);

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

const AxiosContextProvider = ({ children }: Props) => {
  const [reqId, setReqId] = useState<number | undefined>(undefined);
  const [resId, setResId] = useState<number | undefined>(undefined);
  const [reqLog, setReqLog] = useState<Array<IAxiosLog>>([]);
  const [resLog, setResLog] = useState<Array<IAxiosLog>>([]);

  const getDate = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
  };

  const getReqLog = (config: AxiosRequestConfig, isError: boolean = false) => {
    if (isError) {

    }
    return `url = ${config.url}`;
  };

  const getResLog = (response: AxiosResponse, isError: boolean = false) => {
    if (isError) {

    }
    return `data = ${JSON.stringify(response.data)}`;
  };

  const getLogFormat = (config?: AxiosRequestConfig, response?: AxiosResponse, isError: boolean = false) => {
    const log = config ? getReqLog(config) : getResLog(response!);
    const type: logType = config ? 'request' : 'response';
    const logResult: IAxiosLog = {
      id: '',
      time: getDate(),
      log,
      type,
      isError,
      status: response ? response.status : undefined,
      method: config ? config.method : undefined,
    };

    return logResult;
  };

  const reqInterceptor = () => {
    return axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        setReqLog(prevlog => [...prevlog, getLogFormat(config, undefined, false)]);
        return config;
      },
      (error: any) => {
        setReqLog(prevlog => [...prevlog, getLogFormat(error, undefined, true)]);
        return error;
      },
    );
  };

  const resInterceptor = () => {
    return axios.interceptors.response.use(
      (response: AxiosResponse) => {
        setResLog(prevLog => [...prevLog, getLogFormat(undefined, response, false)]);
        return response;
      },
      (error: any) => {
        setResLog(prevLog => [...prevLog, getLogFormat(undefined, error, true)]);
        return error;
      },
    );
  };

  const useInterceptor = () => {
    setReqId(reqInterceptor());
    setResId(resInterceptor());
  };

  const ejectInterceptor = () => {
    reqId && axios.interceptors.request.eject(reqId);
    resId && axios.interceptors.response.eject(resId);
    setReqId(undefined);
    setResId(undefined);
  };

  const clearLogList = () => {
    setReqLog([]);
    setResLog([]);
  };

  return (
    <AxiosContext.Provider
      value={{
        reqLog,
        resLog,
        useInterceptor,
        ejectInterceptor,
        clearLogList,
      }}>
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosContextProvider };
