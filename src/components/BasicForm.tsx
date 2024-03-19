/* eslint-disable @typescript-eslint/no-explicit-any */

import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import Error from "./Error";
import { useEffect } from "react";

let incrementValue = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social_link: {
    facebook: string;
    twitter: string;
  };
  phoneNumber: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dateOfBirth: Date;
};

const BasicForm = () => {
  incrementValue++;
  const {
    register,
    control,
    handleSubmit,
    formState: { touchedFields, dirtyFields, errors, isDirty },
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    // setting default vlaues for synchorous value
    // setting default vlaues for synchorous value
    defaultValues: {
      username: "limon",
      email: "limon@gmail.com",
      channel: "web_dev",
      phNumbers: [{ number: "" }],
      age: 0,
      dateOfBirth: new Date(),
    },

    // setting default vlaues for async value from the api
    // defaultValues: async () => {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/users/1`
    //   );
    //   const data = await response.json();
    //   return {
    //     username: data?.name,
    //     email: data?.email,
    //     channel: "",
    //     social_link: {
    //       facebook: "",
    //       twitter: "",
    //     },
    //     phoneNumber: ['','']
    //   };
    // },
  });
  // const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const handleOnSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };
  const handleOnError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };
  console.log(isDirty);
  // const watchedValue = watch("username");
  // const watchForm = watch();
  // unsubscribe watch method
  // useEffect(() => {
  //   const subscribe = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => {
  //     subscribe.unsubscribe();
  //   };
  // }, []);
  const handleGetValues = () => {
    // console.log("Get values", getValues(["username", "channel"])); // we can pass this to get specific filed
    console.log("Get values", getValues()); // we can pass this to get all form field
  };
  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  return (
    <div>
      <h2>Basic Form ({incrementValue})</h2>
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} noValidate>
        <h3>watchedValue {}</h3>
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

        <div>
          <label htmlFor="primaryPhone">Primary Phone Number</label>
          <input
            type="text"
            id="primaryPhone"
            placeholder="Primary Phone"
            {...register("phoneNumber.0", {
              required: {
                value: true,
                message: "Primary phone is required",
              },
            })}
          />
          {errors.phoneNumber && (
            <Error message={errors.phoneNumber[0]?.message} />
          )}
        </div>
        <div>
          <label htmlFor="secondaryPhone">Secondary Phone</label>
          <input
            type="text"
            id="secondaryPhone"
            placeholder="secondary Phone"
            {...register("phoneNumber.1", {
              required: {
                value: true,
                message: "secondary phone is requried",
              },
            })}
          />
          {errors.phoneNumber && (
            <Error message={errors.phoneNumber[1]?.message} />
          )}
        </div>
        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add Phone number
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            placeholder="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />
          {errors.age && <Error message={errors.age.message} />}
        </div>
        <div>
          <label htmlFor="dob">Date Of Birth</label>
          <input
            type="date"
            id="dob"
            placeholder="date of birth"
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          {errors.dateOfBirth && <Error message={errors.dateOfBirth.message} />}
        </div>

        <button type="submit">Submit</button>
        <button onClick={handleGetValues} type="button">
          GetValues
        </button>
        <button onClick={handleSetValue} type="button">
          Set Value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default BasicForm;
