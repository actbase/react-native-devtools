import React, { createContext } from 'react';
import { generateUnique } from '../../utils/utils';
import {
  AxiosContenxtProviderProps,
  IAxiosInterceptor,
  IAxiosLog,
  IAxiosLogContext,
  IAxiosRequestConfig,
  IAxiosResponse,
} from '../@types/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultAxiosContext: IAxiosLogContext = {
  logs: [],
  clearLogList: () => { },
};

const AxiosContext = createContext(defaultAxiosContext);

// for keep logs 
const __logs: Array<IAxiosLog> = [];

const AxiosContextProvider = ({ children, axiosInstances }: AxiosContenxtProviderProps) => {
  const [logs, setLogs] = React.useState<Array<IAxiosLog>>([...__logs]);
  const clearLogList = () => {
    __logs.splice(0, Number.MAX_SAFE_INTEGER);
    setLogs([]);
  };
  
  const createLog = (config: IAxiosRequestConfig) => {
    config.uid = generateUnique();
    console.log('devTools::request', config.uid);
    const log: IAxiosLog = {
      uid: config.uid,
      time: Date.now(),
      config,
      elapse: -1,
      method: config?.method,
    };
    __logs.unshift(log);
    setLogs([...__logs]);
  };

  const linkResponse = (response: IAxiosResponse) => {
    console.log('',);
    const log = __logs.find((log) => log.uid === response?.config.uid);
    console.log('devTools::response', log?.uid);
    if (log) {
      log.isError = false;
      log.elapse = Date.now() - log.time;
      log.status = response.status;
      log.response = response;
      setLogs([...__logs]);
    }
  }

  React.useEffect(() => {
    if (!Array.isArray(axiosInstances)) return;
    const requestInstancesIds: Array<IAxiosInterceptor> = axiosInstances.map((instance) => {
      return {
        instance,
        interceptorId: instance.interceptors.request.use((config: AxiosRequestConfig) => {
          createLog(config as IAxiosRequestConfig);
          return config
        }, (error: any) => {
          // TODO : implement cancel token 
          console.log('cancel', error);
          return error
        })
      }
    });
    const responseInstancesIds: Array<IAxiosInterceptor> = axiosInstances.map((instance) => {
      return {
        instance,
        interceptorId: instance.interceptors.response.use((response: AxiosResponse) => {
          linkResponse(response as IAxiosResponse);
          return response;
        }, (error: any) => {
          console.log(error);
          linkResponse(error.response as IAxiosResponse);
          return Promise.reject(error);
        })
      }
    });

    return () => {
      requestInstancesIds.map(({ instance, interceptorId }) => {
        instance.interceptors.request.eject(interceptorId);
      });
      responseInstancesIds.map(({ instance, interceptorId }) => {
        instance.interceptors.response.eject(interceptorId);
      })
    }
  }, [axiosInstances]);

  return (
    <AxiosContext.Provider
      value={{ logs, clearLogList }}>
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosContextProvider };
