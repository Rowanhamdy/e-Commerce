import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";
const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enteredEmail, setEnteredEmail] = useState<null|string>(null);

  const checkEmailAvailability =async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await axios.get(`https://snapdragon-delicate-shoulder.glitch.me/api/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");

      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
      console.log(error);
      
    }
  }

  const resetCheckEmaillAvailability = () =>{
setEmailAvailabilityStatus("idle")
setEnteredEmail(null)
  }

  return {emailAvailabilityStatus , enteredEmail, checkEmailAvailability ,resetCheckEmaillAvailability}
};
export default useCheckEmailAvailability;
