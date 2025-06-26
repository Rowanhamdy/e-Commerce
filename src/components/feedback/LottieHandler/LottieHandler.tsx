import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notfound.json";
import load from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import empty from "@assets/lottieFiles/empty.json";
import success from "@assets/lottieFiles/success.json";
import { useNavigate } from "react-router-dom";

const lottieFilesMap = {
  notFound: notFound,
  load: load,
  error: error,
  empty: empty,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  to?: string;
  className?: string;
};
export const LottieHandler = ({
  type,
  message,
  to,
  className,
}: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const navigate = useNavigate();
  const messageStyle =
    type === "error" ? { fontSize: "19px", color: "red" } : { fontSize: "19px" , marginTop:"30px" };

  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie
        animationData={lottie}
        style={{ width: "400px", marginBottom: "30px" }}
        loop={false}
        onComplete={() => {
          if (to) navigate(to);
        }}
      />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};
