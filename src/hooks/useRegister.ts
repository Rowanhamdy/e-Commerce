import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@Validations/signUpSchema";
import type { signUpType } from "@Validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthRegister ,resetUI } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  
     const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { loading, error ,accessToken } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<signUpType> =async(data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password })).unwrap().then(()=>{
      navigate("https://snapdragon-delicate-shoulder.glitch.me/login?message=account_created")
    });
  };

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmaillAvailability,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      //checking
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmaillAvailability();
    }
  };

   useEffect(() => {
      return () => {
        dispatch(resetUI());
      };
    }, [dispatch]);
  
  return{
loading, error ,accessToken ,onSubmit,errors ,register,
    handleSubmit ,emailOnBlurHandler ,emailAvailabilityStatus
  }
}
