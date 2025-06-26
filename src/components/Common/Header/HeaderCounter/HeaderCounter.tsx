import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWapper } = styles;

type HeaderCounterProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  to: string;
  name: string;
};
const HeaderCounter = ({
  totalQuantity,
  svgIcon,
  to,
  name,
}: HeaderCounterProps) => {
  const navigate = useNavigate();
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={`${container} `} onClick={() => navigate(to)}>
      <div className={iconWapper}>
        {svgIcon}
        {totalQuantity > 0 ? (
          <div className={quantityStyle}>{totalQuantity}</div>
        ) : null}
      </div>
      <h3>{name}</h3>
    </div>
  );
};

export default HeaderCounter;
