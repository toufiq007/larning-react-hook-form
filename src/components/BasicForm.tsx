/* eslint-disable @typescript-eslint/no-explicit-any */

import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import Error from "./Error";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const BasicForm = () => {
  const { register, control, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const handleOnSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };
  return (
    <div>
      <h2>Basic Form</h2>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          {errors.username && <Error message={errors.username.message} />}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid Email Format",
              },
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>
        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            placeholder="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          {errors.email && <p>{errors.channel?.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default BasicForm;
