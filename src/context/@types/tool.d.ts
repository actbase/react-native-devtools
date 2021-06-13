type ToolType = 'axiosLog' | undefined;

interface IDevTool {
  axiosLog:[boolean, Dispatch<SetStateAction<boolean>>] | undefined;
  asyncStorage:[boolean, Dispatch<SetStateAction<boolean>>] | undefined;
  log:[boolean, Dispatch<SetStateAction<boolean>>] | undefined;
  navigationContainer:MutableRefObject[], 
  setNavigationContainer:Function
}
interface IDevToolsAsyncStorage {
  handleOffset?:number | undefined
}

interface Move { x: number | AnimatedValue; y: number | AnimatedValue }
interface Size { x: number | AnimatedValue; y: number | AnimatedValue }