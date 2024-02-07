import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import config from "config";

export default (props) => {
  let debounceTimeout;

  const [myDefault, setMyDefault] = useState("");

  const onChange = (option) => setMyDefault(option);

  const promiseOptions = (inputValue) => {
    return new Promise((resolve, reject) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        console.log("Making server call with query:", inputValue);
        fetch(`${config.API_ROOT_PATH}/busstop/search?str=${inputValue}`)
          .then(response => response.json())
          .then(data => {
            if (props.defaultEnabled && !myDefault && data.length > 0) {
              setMyDefault(data[0]);
            }
            resolve(data);
          })
          .catch(error => {
            console.error("Error fetching options:", error);
            reject([]);
          });
      }, props.defaultEnabled && !myDefault ? 0 : 500); // First time no delay
    });
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