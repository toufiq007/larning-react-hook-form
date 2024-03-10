/* eslint-disable @typescript-eslint/no-explicit-any */

import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import Error from "./Error";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social_link: {
    facebook: string;
    twitter: string;
  };
};

const BasicForm = () => {
  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    // setting default vlaues for synchorous value
    // setting default vlaues for synchorous value
    // defaultValues: {
    //   username: "limon",
    //   email: "limon@gmail.com",
    //   channel: "web_dev",
    // },

    // setting default vlaues for async value from the api
    defaultValues: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/1`
      );
      const data = await response.json();
      return {
        username: data?.name,
        email: data?.email,
        channel: "",
        social_link: {
          facebook: "",
          twitter: "",
        },
      };
    },
  });
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
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListedDomain: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          {errors.email && <Error message={errors.email?.message} />}
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
          {errors.channel && <Error message={errors.channel.message} />}
        </div>

        <div>
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            placeholder="facebook"
            {...register("social_link.facebook", {
              required: {
                value: true,
                message: "facebook link is required",
              },
            })}
          />
          {errors.social_link?.facebook && (
            <Error message={errors.social_link.facebook.message} />
          )}
        </div>
        <div>
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            placeholder="twitter"
            {...register("social_link.twitter", {
              required: {
                value: true,
                message: "Twitter link is required",
              },
            })}
          />
          {errors.social_link?.twitter && (
            <Error message={errors.social_link.twitter.message} />
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default BasicForm;
