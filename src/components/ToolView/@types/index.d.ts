interface IDevToolExtension {
  label: string;
  action: Function;
}

interface IToolContent {
  backgroundColor?: string;
  position: string;
  setPosition: Function;
  toggleTool: Function;
  extensions: IDevToolExtension[];
}

interface IDevToolsProps {
  enabled?: boolean;
  axiosInstances?: AxiosInstance[];
  extensions: IDevToolExtension[];
}

interface IToolViewProps {
  extensions: IDevToolExtension[];
}