import React, { useEffect } from "react";
import { useState } from "react";

/*

!---PROPS----PROPS that is a must to be provided 

?   validated   ---------> // this is should TRUE when your validations satisfied 
?                          // if its return true "ok-check" class will be applied to input field || if it return false it will apply "ok-failed" 

?   type     ------------> // Type should be defined as depending on the type of input field Ex: Text || Email.  

?   required     --------> // if TRUE validation error class will be give by default || 
?                          // this should be true if the field must be filed, if its optional it should be false

?   validationMessage ---> // This function will receive one parameter (value)=>{} 
?                          // This should be a function that only returns HTML tag with your own validation text 
?                          // eg: return (<small className="text-success"> Your Massage goes here!!!! </small>)

?   id          ---------> // ID is used here as input ID & NAME and also label FOR so this should be uniq to itself

?   label       ---------> // This is going to be an Object {class: "", title: ""} Since in this component label is used as the placeholder it is required to send a label along with the ID as mentioned above
*/
const VbTextInput = ({
  type,
  validationMessage,
  disabled,
  suffix,
  id, // ID is used here as input id and also label NAME & FOR so this should uniq to itself
  label,
  validated, // this is to be TRUE when your validations satisfied || // this should return true || false to get the validation classes to apply
  required, // if TRUE validation error class will be give by default || // this should be true if the field must be filed, if its optional it should be false
  onChangeFunc,
  onBlurFunc,
}) => {
  const [value, setOnchangeValue] = useState("");

  const onChangeHandler = (e) => {
    setOnchangeValue(e.target.value);
    if (validated) {
      e.target.classList.remove("ok-failed");
      e.target.classList.add("ok-check");
    }
    if (!validated && required) {
      e.target.classList.add("ok-failed");
      e.target.classList.remove("ok-check");
    }
    if (onChangeFunc) {
      onChangeFunc(e);
    }
  };

  const onBlurHandler = (e) => {
    if (!onBlurFunc && e.target.value === "" && required) {
      e.target.classList.add("ok-failed");
    }
    if (!onBlurFunc && validated) {
      e.target.classList.remove("ok-failed");
      e.target.classList.add("ok-check");
    }
    if (!onBlurFunc && !validated && required) {
      e.target.classList.add("ok-failed");
      e.target.classList.remove("ok-check");
    }
    if (onBlurFunc) {
      onBlurFunc(e);
    }
  };

  const onFocusHandler = (e) => {
    if (validated) {
      e.target.classList.remove("ok-failed");
      e.target.classList.add("ok-check");
    }
    if (!validated && required) {
      e.target.classList.add("ok-failed");
      e.target.classList.remove("ok-check");
    }
  };

  useEffect(() => {
    const input = document.querySelector("input[id=" + id + "]");
    const mainDive = document
      .querySelector("input[id=" + id + "]")
      .closest(".new-input");
    if (validated && value) {
      input.classList.add("ok-check");
      mainDive.classList.add("ok-check");
      input.classList.remove("ok-failed");
    }
    if (value && !validated && required) {
      input.classList.remove("ok-check");
      mainDive.classList.remove("ok-check");
      input.classList.add("ok-failed");
    }
    if (!validated) {
      input.classList.remove("ok-check");
      mainDive.classList.remove("ok-check");
    }
  }, [validated]);

  return (
    <div className={"w-100 new-input "}>
      <input
        type={type}
        name={id}
        id={id}
        onChange={(e) => onChangeHandler(e)}
        onBlur={(e) => onBlurHandler(e)}
        onFocus={(e) => onFocusHandler(e)}
        placeholder={" "}
        value={value}
        disabled={disabled}
        required={required ? required : false}
      />
      <label htmlFor={id} className={label?.class}>
        {label?.title && label.title}
      </label>
      {suffix ? <span className="input-suffix">{suffix}</span> : null}
      <div className="w-100 d-inline">
        {validationMessage ? validationMessage(value) : null}
      </div>
    </div>
  );
};
export default VbTextInput;
