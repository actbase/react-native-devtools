import { AxiosResponse, AxiosRequestConfig } from 'axios';

interface IAxiosRequestConfig extends AxiosRequestConfig {
  uid: string;
}

interface IAxiosResponse extends AxiosResponse {
  config: IAxiosRequestConfig;
}

interface IAxiosLog {
  uid: string;
  time: number;
  method: string | undefined;
  config: IAxiosRequestConfig;

  isError?: boolean;
  elapse: number;
  status?: number | undefined;
  response?: IAxiosResponse;
}

interface IAxiosLogContext {
  logs: Array<IAxiosLog>;
  clearLogList: () => void;
}

interface AxiosContenxtProviderProps {
  children: JSX.Element | Array<JSX.Element>;
  axiosInstances: AxiosInstance[];
}

interface IAxiosInterceptor {
  instance: AxiosInstance;
  interceptorId: number;
}
