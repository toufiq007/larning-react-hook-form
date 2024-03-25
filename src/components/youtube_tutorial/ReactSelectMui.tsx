import { MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
};

const genderList = [
  {
    id: 1,
    value: "Male",
  },
  {
    id: 2,
    value: "Female",
  },
  {
    id: 3,
    value: "Other",
  },
];

const ReactMuiSelect = () => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  //   console.log(country[0]?.name?.common);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };
  return (
    <div>
      <h2>React hook form with mui</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="">First Name</label>
          <TextField
            label=""
            size="small"
            style={{ width: "400px" }}
            placeholder="first name"
            {...register("firstName")}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="">Last Name</label>
          <TextField
            label=""
            size="small"
            style={{ width: "400px" }}
            placeholder="last name"
            {...register("lastName")}
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="">Select Gender</label>
          <Controller
            control={control}
            name="gender"
            defaultValue=""
            render={({ field }) => (
              <>
                <Select
                  style={{ width: "400px" }}
                  labelId="gender"
                  id="gender"
                  size="small"
                  {...field}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select gender
                  </MenuItem>
                  {genderList.map((gender) => (
                    <MenuItem key={gender.id} value={gender.value}>
                      {gender.value}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          />
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label htmlFor="">Select Country</label>
          <Controller
            name="country"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="country"
                id="country"
                size="small"
                fullWidth
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "300px",
                      width: "200px",
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Country
                </MenuItem>
                {country.length > 1 &&
                  country.map((country, index) => (
                    <MenuItem key={index} value={country?.name?.common}>
                      {country?.name?.common}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </div>

        <button type="submit" style={{ color: "#fff" }}>
          Submit
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default ReactMuiSelect;
