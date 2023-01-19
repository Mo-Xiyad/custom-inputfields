import React, { useState } from "react";
import PhoneNumberInput from "../inputs/PhoneNumber.jsx";
// import SingleDropdown from "../inputs/SingleSelect.jsx";
// import MultiSelect from "../inputs/MultiOptions.jsx";
import TextInput from "../inputs/TextInput.jsx";

import { isPossiblePhoneNumber } from "libphonenumber-js";
import validator from "validator"; // https://github.com/validatorjs/validator.js
import validators from "./validators";

const Form = ({ dropDownList }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    singleOption: "",
    multiOption: []
  });

  // check validation for each field
  const checkValidation = (field, value) => {
    switch (field) {
      case "name":
        return (
          validator.matches(value, /^[a-z][a-z\s]*$/) &&
          validator.isLength(value, 3, 20)
        );
      case "username":
        return validator.isLength(value, 3, 20);
      case "email":
        return validator.isEmail(value);
      case "phoneNumber":
        return isPossiblePhoneNumber(value);
      case "singleOption":
        return value !== "";
      case "multiOption":
        return value.length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      alert(JSON.stringify(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primaryBG-2 mt-3 p-3">
      <div className="flex-1 item-center pb-5 p-3">
        <h1 className="text-center text-primaryText-1 font-bold">
          With Validation
        </h1>
        <p className="text-[#4752AE] font-bold">
          Check out how all the validations is done in the extra file that
          contains all the functions
        </p>
      </div>

      <form>
        <div className="flex-row pb-5">
          <TextInput
            onChangeFunc={(e) => {
              const val = e.target.value;
              setFormData((prevState) => {
                return { ...prevState, name: val };
              });
            }}
            type={"text"}
            suffix={"name"}
            label={{
              class: "orange",
              title: "Full name"
            }}
            validated={checkValidation("name", formData.name)}
            id={"fullName"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
            validationMessage={validators.nameValidationMsg}
            required={true} // this should be true if the field must be filed, if its optional it should be false
          />

          <TextInput
            onChangeFunc={(e) => {
              const val = e.target.value;
              setFormData((prevState) => {
                return { ...prevState, username: val };
              });
            }}
            type={"text"}
            suffix={"username"}
            label={{
              class: "orange",
              title: "Username"
            }}
            validated={checkValidation("username", formData.username)} // this should return true || false to get the validation classes to apply
            id={"username"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
            validationMessage={validators.userNameValidationMsg}
            required={true} // this should be true if the field must be filed, if its optional it should be false
          />

          <TextInput
            onChangeFunc={(e) => {
              const val = e.target.value;
              setFormData((prevState) => {
                return { ...prevState, email: val };
              });
            }}
            type={"email"}
            suffix={"email"}
            label={{
              class: "orange",
              title: "Email"
            }}
            id={"email"}
            validationMessage={validators.emailValidation}
            validated={checkValidation("email", formData.email)}
            required={true}
          />

          <div className="relative mt-8">
            <PhoneNumberInput
              id={"home-phone"}
              label={{
                class: "orange",
                title: "Home phone"
              }}
              onChangeFunc={(value) => {
                // here it is only receiving the value not the event
                setFormData((prevState) => {
                  return { ...prevState, phoneNumber: value };
                });
              }}
              required={true}
              validated={
                formData.phoneNumber &&
                isPossiblePhoneNumber(formData.phoneNumber.toLocaleString())
              } //here if you try without converting toLocal your going to get error
              validationMessage={validators.phoneValidationMsg}
              suffix={"tel-home"}
            />
          </div>

          {/* <SingleDropdown
            options={dropDownList} // here this array is coming as a prop
            label={{
              class: "orange",
              title: "Single select"
            }}
            id={"singleSelectDropdown"} // ID should be uniq to itself
            validated={
              // isIn(str, values)	check if the string is in a array of allowed values.
              formData.singleOption &&
              validator.isIn(
                formData.singleOption.toLowerCase(),
                dropDownList.toLowerCase()
              )
            }
            required={true}
            onChangeFunc={(value) => {
              // here it is only receiving the value not the event
              setFormData((prevState) => {
                return { ...prevState, singleOption: value };
              });
            }}
            // in all the dropdown fields "validationMessage" will receive two parameters "value" and "options[]"
            //! Check the function for more info references
            validationMessage={validators.singleSelectValidationMsg}
          /> */}

          {/* <MultiSelect
            label={{
              class: "orange",
              title: "Multiple select"
            }}
            id={"multi-select-options"} // ID should be uniq to itself
            options={dropDownList}
            onChangeFunc={(value) => {
              // here it is only receiving the value not the event
              // This value is a array, that is the selected options
              setFormData((prevState) => {
                return { ...prevState, multiOption: value };
              });
            }}
            required={true} // if you set "required" to TRUE you must also provide "validated" as a boolean.
            validated={formData.multiOption.length} // if the length of the array is longer than 1. return TRUE
            validationMessage={validators.multiOptionValidationMsg}
          /> */}

          {/* Submit button */}

          <div className="flex justify-center p-2 mt-5 bg-[#6974CA] rounded-lg">
            <button className="text-white" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
