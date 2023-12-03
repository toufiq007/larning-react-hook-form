import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValueType = {
  userName: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

const PracticeYoutubeForm = () => {
  // ! in this way we can loaded the previously saved data to our default value
  //   const form = useForm<FormValueType>({
  //     defaultValues: async () => {
  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/users/1"
  //       );
  //       const data = await response.json();
  //       return {
  //         userName: "limon",
  //         email: data.email,
  //         channel: "",
  //       };
  //     },
  //   });
  const form = useForm<FormValueType>({
    defaultValues: {
      userName: "limon",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },
  });
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValueType) => {
    console.log(data);
  };
  return (
    <div>
      <h2>Youtube From Count: {1 / 2}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            {...register("userName", {
              required: {
                value: true,
                message: "username is required!!",
              },
            })}
          />
          <p className="error">{errors.userName?.message}</p>
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
                message: "enter valid email!!",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "adming@gmail.com" ||
                    "enter a new email address"
                  );
                },
                notBadEmail: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "this domain is not valid"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
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
                message: "enter channel name",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div>
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            placeholder="twitterlink"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "twitter account needed",
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div>
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            placeholder="facebooklink"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "facebook acount needed",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div>
          <label htmlFor="primaryphone">Primary Phone number</label>
          <input
            type="text"
            id="primaryphone"
            placeholder="primary"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "primary phone required!!",
              },
            })}
          />
          <p className="error">
            {errors.phoneNumbers && errors.phoneNumbers[0]?.message}
          </p>
        </div>
        <div>
          <label htmlFor="secondaryPhone">Secondary Phone number</label>
          <input
            type="text"
            id="secondaryPhone"
            placeholder="secondary"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "secondary phone required!!",
              },
            })}
          />
          <p className="error">
            {errors.phoneNumbers && errors.phoneNumbers[1]?.message}
          </p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default PracticeYoutubeForm;
