/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import BasicSelect from "./Select";

type FormValues = {
  firstName: string;
  lastName: string;
  gender: string;
  country: string;
  courses: string[];
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

const courseList = [
  {
    id: 1,
    value: "JS",
  },
  {
    id: 2,
    value: "React",
  },
  {
    id: 3,
    value: "Node",
  },
  {
    id: 4,
    value: "NextJs",
  },
];

const skills = ["js", "react", "node", "express", "nextjs", "mongodb"];

const skillOptions = skills.map((skill, index) => {
  return {
    id: index,
    value: skill,
  };
});
console.log(skillOptions);
type skill = {
  id: number;
  value: string;
};

const ReactMuiSelect = () => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>();
  const [country, setCountry] = useState([]);
  const [value, setValue] = useState<string | null>(null);
  const [skills, setSkills] = useState<skill | null>(null);

  // console.log({ value });

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  // console.log(country[0]?.flags?.png);

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
                <BasicSelect
                  id="gender"
                  field={field}
                  options={genderList}
                  placeholder={"Select Gender"}
                />
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
              // <BasicSelect id="country" field={field} options={country} placeholder={"Select Country"} />
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
                      <img
                        src={country?.flags?.png}
                        alt="country"
                        width={20}
                        height={20}
                        style={{ marginRight: "1rem" }}
                      />
                      {country?.name?.common}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </div>

        {/* <div>
          <label htmlFor="">Choose your course</label>
          <Controller
            control={control}
            name="course"
            defaultValue={[{ id: 0, value: "html" }]}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                id="tags-standard"
                options={courseList}
                getOptionLabel={(option) => option.value}
                value={value}
                onChange={(e, newValue) => onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Favorites"
                  />
                )}
              />
            )}
          />
        </div> */}

        <button type="submit" style={{ color: "#fff" }}>
          Submit
        </button>
      </form>
      <div></div>
    </div>
  );
};

export default ReactMuiSelect;
