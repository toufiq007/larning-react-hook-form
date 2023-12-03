import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderdCount = 0;
type FromValues = {
  username: string;
  email: string;
  channel: string;
};
const YoutubeFrom = () => {

  const form = useForm<FromValues>(); // using react hook form
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  renderdCount++;
  //   const { name, ref, onChange, onBlur } = register();

  // handleSubmit
  const onSubmit = (data: FromValues) => {
    console.log("form submited", data);
  };

  return (
    <div>
      <h2>Youtube From Count: {renderdCount / 2}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="username"
            //   name={name}
            //   ref={ref}
            //   onChange={onchange}
            //   onBlur={onBlur}
            //   we can write also this  ...
            //   {...register("username")}
            {...register("username", {
              required: { value: true, message: "username is required!!" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
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
                message: "invalid input email",
              },
              // for our custom email message
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "enter a different email"
                  );
                },
                notBadEmail: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "this domain is not supported"
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
            {...register("channel", { required: "channel is required" })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeFrom;
