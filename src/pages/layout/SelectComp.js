import React from "react";
import AsyncSelect from "react-select/async";
import { useState } from "react";

export default (props) => {
  const [myDefault, setMyDefault] = useState("");

  const onChange = (option) => setMyDefault(option);

  console.log("select-react component triggered, myDefault: ", myDefault);

  const promiseOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `http://localhost:8080/busstop/search?str=${inputValue}`
      );
      let data = await response.json();
      if (props.defaultEnabled && !myDefault && data) {
        setMyDefault(data[0]);
      }

      return data;
    } catch (error) {
      console.error("Error fetching options:", error);
      return [];
    }
  };

  return (
    <div className={props.className}>
      <p>{props.hello.label}</p>
      <AsyncSelect
        cacheOptions
        defaultOptions
        defaultValue={props.hello}
        loadOptions={promiseOptions}
        value={myDefault}
        onChange={onChange}
        isClearable={true}
      />
    </div>
  );
};
