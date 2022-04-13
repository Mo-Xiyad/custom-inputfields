import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

import React, { useEffect, useState } from "react";

/*
SEE THE BOTTOM OF THE COMPONENT FOR DOC LINKS:


!---PROPS----PROPS that is a must to be provided 

?   id (string)                   ---------> // ID is used here as input ID & NAME and also label FOR so this should be uniq to itself

?   label (string)                  ---------> // Since in this component label is used as the placeholder it is required to send a label along with the ID as mentioned above

?   validated (bool)             --------->  // this is should TRUE when your validations satisfied 
?                                            // if its return true "PhoneNumber-Validated" class will be applied to input field || if it return false it will apply "PhoneInputInputOnFocusError" 

?   required (bool)               -------->  // if TRUE validation error class will be give by default || 
?                                            // this should be true if the field must be filed, if its optional it should be false

?   validationMessage (function)       --->  // This function will receive one parameter (value)=>{} 
?                                            // This should be a function that only returns HTML tag with your own validation text 
?                                            // eg: return (<small className="text-success"> Your Massage goes here!!!! </small>)

*/

const VbPhoneNumberInput = ({
  onBlurFunc,
  onChangeFunc,
  required,
  label,
  id,
  validated,
  validationMessage,
  suffix,
}) => {
  const [value, setValue] = useState();

  // "labelFocused" When input label is on focus it will animate the labe to the top of the inout field box,
  const labelFocused = (e) => {
    const parent = e.target.closest("div");
    parent.classList.add("phone-field-label");
  };
  // if the input field is clicked this function will apply the class to animate the label to top of the input field
  const onFocusHandler = (e) => {
    const parent = e.target.closest(".vb-phone-field");
    parent.classList.add("phone-field-label");
  };

  const onBlurHandler = (e) => {
    if (e.target.value === "") {
      // moving the label above the input field if the its been clicked and while its empty
      const parent = e.target.closest(".vb-phone-field");
      parent.classList.remove("phone-field-label");
    }
    if (!onBlurFunc && required && !validated) {
      e.target.classList.add("PhoneInputInputOnFocusError");
    }
    if (!onBlurFunc && validated && required) {
      e.target.classList.remove("PhoneInputInputOnFocusError");
    }
    if (onBlurFunc) {
      onBlurFunc(e);
    }
  };

  const onChangeHandler = (value) => {
    setValue(value); // this will keep on updating the value continuously

    if (onChangeFunc) {
      onChangeFunc(value); // here we are sending the input value,
    }
  };
  useEffect(() => {
    let inputTagNode = document.querySelector("input[name=" + id + "]");
    let inputParentDiv = document
      .querySelector("input[name=" + id + "]")
      .closest(".vb-phone-field");
    if (validated && value) {
      inputTagNode.classList.remove("PhoneInputInputOnFocusError");
      inputTagNode.classList.add("PhoneNumber-Validated"); // validation success
      inputParentDiv.classList.add("ok-check"); // validation success
    }
    if (value && !validated && required) {
      inputTagNode.classList.remove("PhoneNumber-Validated");
      inputParentDiv.classList.remove("ok-check");
      inputTagNode.classList.add("PhoneInputInputOnFocusError"); // validation error
    }
    if (!validated) {
      inputTagNode.classList.remove("PhoneNumber-Validated");
      inputParentDiv.classList.remove("ok-check");
    }
    // if(value && value.length > 0 && !validated){
    //   // inputTagNode.classList.add("PhoneInputInputOnFocusError") // suggesting the number entered is not valid
    // }
    if (!value && !required) {
      inputTagNode.classList.remove("PhoneInputInputOnFocusError"); // if the field is not required Error class will not be applied when its empty
    }
  }, [validated, value]);

  return (
    <div className="position-relative vb-phone-field">
      <PhoneInput
        defaultCountry="SE"
        value={value}
        onChange={(value) => onChangeHandler(value)}
        required={required}
        onFocus={(event) => onFocusHandler(event)}
        onBlur={(event) => onBlurHandler(event)}
        id={id}
        name={id}
      />
      <label
        onClick={(event) => labelFocused(event)}
        className={`PhoneInputLabel ${label?.class}`}
        htmlFor={id}
      >
        {label?.title && label.title}
      </label>
      {suffix ? <span className="phone-input-suffix">{suffix}</span> : null}
      <div className="w-100 d-inline">
        {validationMessage ? validationMessage(value) : null}
      </div>
    </div>
  );
};

export default VbPhoneNumberInput;

/*
https://bestofreactjs.com/repo/catamphetamine-react-phone-number-input--react-masked-input#utility
https://github.com/catamphetamine/libphonenumber-js#using-phone-number-validation-feature

----- Validation ------

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { isPossiblePhoneNumber } from "libphonenumber-js";

Is possible: {value && isPossiblePhoneNumber(value) ? 'true' : 'false'}
Is valid: {value && isValidPhoneNumber(value) ? 'true' : 'false'}
National: {value && formatPhoneNumber(value)}
International: {value && formatPhoneNumberIntl(value)}

*/
