interface IDevToolExtension {
  label: string;
  action: Function;
  render?: () => JSX.Element;
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
  isOpen: boolean;
  onChangeOpen: Function;
}

interface IToolViewRef extends Ref {
  current: {
    show: Function;
    hide: Function;
  };
}
