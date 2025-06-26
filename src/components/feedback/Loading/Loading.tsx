import type { TLoading } from "@types";
import { LottieHandler } from "../LottieHandler/LottieHandler";


type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  pendingComponent?: React.ReactNode;
};

const Loading = ({ status, error, children ,pendingComponent }: LoadingProps) => {
  if (status === "pending") {
    return <>{pendingComponent}</>;
  }
  if (status === "failed") {
    
    return <div> <LottieHandler type="error" message={error as string}/></div> ;
  }
  return <div>{children}</div>;
};

export default Loading;