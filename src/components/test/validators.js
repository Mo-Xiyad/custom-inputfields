import validator from "validator"; // https://github.com/validatorjs/validator.js
// https://pub.dev/documentation/validators/latest/validators/isIn.html
// https://github.com/validatorjs/validator.js

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { isPossiblePhoneNumber } from "libphonenumber-js"; // these are all validation that comes with the package

const nameValidationMsg = (value) => {
  if (
    value &&
    validator.matches(value, /^[a-z][a-z\s]*$/) &&
    validator.isLength(value, 3, 20)
  ) {
    return (
      <small className="text-white">
        Name is validated and with strings and white spaces{" "}
      </small>
    );
  }
  if (
    value &&
    !validator.isEmpty(value) &&
    !validator.matches(value, /^[a-z][a-z\s]*$/)
  ) {
    return (
      <small className="text-danger">Name cannot contain any numbers </small>
    );
  }
  if (value && !validator.isLength(value, 3, 20)) {
    return <small className="text-danger">Name is too short! </small>;
  }
};

const emailValidation = (value) => {
  if (value && validator.isEmail(value)) {
    return <small className="text-white">Valid Email</small>;
  }
  if (
    !validator.isEmpty(value) &&
    !validator.isEmail(value) &&
    validator.isLength(value, 3)
  ) {
    return <small className="text-danger">Invalid Email</small>;
  }
};
const userNameValidationMsg = (value) => {
  if (
    value &&
    validator.matches(value, /^[0-9a-zA-Z]+$/) &&
    validator.isLength(value, 3, 20)
  ) {
    return (
      <small className="text-white">
        Username is validated without any white spaces{" "}
      </small>
    );
  }
  if (
    !validator.isEmpty(value) &&
    !validator.matches(value, /^[0-9a-zA-Z]+$/) &&
    validator.isLength(value, 3)
  ) {
    return (
      <small className="text-danger">
        Invalid Username Try without any white spaces
      </small>
    );
  }
};

const phoneValidationMsg = (value) => {
  if (value && isPossiblePhoneNumber(value)) {
    return (
      <small className="text-white">This is a possible phone number</small>
    );
  }
  if (value && !isPossiblePhoneNumber(value)) {
    return (
      <small className="text-danger">
        {" "}
        Phone number is Incomplete or Invalid!
      </small>
    );
  }
};

const singleSelectValidationMsg = (value, arrayOfOptions) => {
  /*
    !For all the dropdown components i have implemented the function to receive two parameters 
    ?VALUE --> "value" is the current selected value in this case
    ?ARRAY --> "arrayOfOptions" is whatever array you pass into the component, you will receive that here for the purpose of making the validation easier. you dont have to do anything with it if you dont want to.
     */
  if (value) {
    if (
      //!here im using this "isIn" method to check if value is in the array i have provided
      // isIn(str, values)	check if the string is in a array of allowed values.
      validator.isIn(
        value.toLowerCase(),
        arrayOfOptions.map((opt) => opt.toLowerCase())
      )
    ) {
      return <small className="text-white">Selected option is Valid!</small>;
    } else {
      return (
        <small className="text-danger">
          Selected option doesn't seems to be an option!
        </small>
      );
    }
  } else {
    // this is going to show only after you have focused into the filed and if its not filed and you have set REQUIRED to be true.
    // Check inside "VbDropdown" the the component line "209" that where im checking if you have focused into the filed or not
    //   "hasChanged"
    return <small className="text-danger">This is a required field!</small>;
  }
};
const multiOptionValidationMsg = (selectedArray, arrayOfOptions) => {
  if (selectedArray && selectedArray.length > 0) {
    return <small className="text-white">Multiple options are selected </small>;
  } else {
    // this is going to show only after you have focused into the filed and if its not filed and you have set REQUIRED to be true.
    // Check inside "VbMultiSelect" the the component line "328" that where im checking if you have focused into the filed or not
    // "hasChanged"
    return (
      <small className="text-danger">Please select at least one option!</small>
    );
  }
};

const validators = {
  nameValidationMsg,
  emailValidation,
  userNameValidationMsg,
  phoneValidationMsg,
  singleSelectValidationMsg,
  multiOptionValidationMsg,
};

export default validators;

