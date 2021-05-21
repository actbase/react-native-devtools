type ToolType = 'axiosLog' | undefined;

interface IDevTool {
  isShowDevTool : boolean;
  type: ToolType;
  setShowDevTool: (isShow: boolean) => void;
  setToolType: (type: ToolType) => void;
  closeToolBar: () => void;
  openToolBar: () => void;
}
