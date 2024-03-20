/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormField = z.infer<typeof schema>;

const InputForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitSuccessful, errors, isSubmitting },
  } = useForm<FormField>({
    defaultValues: {
      email: "user@gmail.com",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormField> = async (data: any) => {
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
          <input type="text" placeholder="enter email" {...register("email")} />
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
            {...register("password")}
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
