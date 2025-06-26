import { signInSchema } from "@Validations/signInSchema";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { signInType } from "@Validations/signInSchema";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";
export const useLogin = () => {
      const [searchParams, setSearchParams] = useSearchParams();
      const dispatch = useAppDispatch();
      const navigate = useNavigate();
      const { error, loading ,accessToken} = useAppSelector((state) => state.auth);
      const {
        register,
        handleSubmit,
        formState: { errors:formErrors },
      } = useForm<signInType>({
        mode: "onBlur",
        resolver: zodResolver(signInSchema),
      });
      const onSubmit: SubmitHandler<signInType> = async (data) => {
        if (searchParams.get("message")) {
          setSearchParams("");
        }
        dispatch(actAuthLogin(data))
          .unwrap()
          .then(() => {
            navigate("/");
          });
      };
    
      useEffect(() => {
        return () => {
          dispatch(resetUI());
        };
      }, [dispatch]);
      
  return {
error, loading ,accessToken,register,handleSubmit,formErrors,onSubmit,searchParams
  }
}
