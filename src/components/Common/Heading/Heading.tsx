import { memo } from "react";
import '@styles/global.css'
const Heading= memo(({title}: {title?:React.ReactNode }) => {
  
  return (
    <h2 className="mb-3 my-font mt-5" style={{ fontSize: "26px" }}>
      {title}
    </h2>
  );
});

export default Heading;