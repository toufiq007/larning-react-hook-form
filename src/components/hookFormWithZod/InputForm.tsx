/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type InputFormType = {
  email: string;
  password: string;
};
const InputForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitSuccessful, errors, isSubmitting },
  } = useForm<InputFormType>();
  // const onSubmit: SubmitHandler<InputFormType> = async (data: any) => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
  //   console.log(data);
  // };
  const onSubmit: SubmitHandler<InputFormType> = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      throw new Error("");
    } catch (err) {
      setError("email", {
        message: "this field is already taken",
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputContainer">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="enter email"
            {...register("email", {
              //   required: {
              //     value: true,
              //     message: "this field is required!!",
              //   },
              required: "this field is required",
              validate: (value) => {
                if (!value.includes("@")) {
                  return "email must include @";
                }
                return true;
              },
            })}
          />
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div className="inputContainer">
          <label htmlFor="">Password</label>
          <input
            style={{ fontSize: "17px", width: "420px", padding: "5px" }}
            type="password"
            placeholder="enter password"
            {...register("password", {
              required: {
                value: true,
                message: "this field is requried",
              },
              minLength: {
                value: 8,
                message: "password must be greater than 8",
              },
            })}
          />
          {errors.password?.message && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "loading..." : "submit"}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
