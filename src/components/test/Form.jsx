import React, { useState, useEffect } from "react";

import VbTextInput from "../inputs/TextInput.jsx";
import VbPhoneNumberInput from "../inputs/PhoneNumber.jsx";
// import VbDropdown from "../inputs/SingleSelect.jsx";
// import VbMultiSelect from "../inputs/MultiOptions.jsx";

import { isPossiblePhoneNumber } from "libphonenumber-js";
import validators from "./validators";
import validator from "validator"; // https://github.com/validatorjs/validator.js

const Form = ({ munis }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    singleOption: "",
    multiOption: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      alert(JSON.stringify(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container bg-blue mt-3">
      <div className="d-flex justify-content-center pt-3">
        <h1 className="text-white text-bold">With Validation</h1>
      </div>
      <div className="d-flex justify-content-center">
        <p className="text-white text-bold">
          Check out how all the validations is done in the extra file that
          contains all the functions
        </p>
      </div>

      <form>
        <div className="row pb-5">
          <div className="col-sm-6 col-12">
            <VbTextInput
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
                title: "Full name",
              }}
              validated={
                validator.matches(formData.name, /^[a-z][a-z\s]*$/) &&
                validator.isLength(formData.name, 3, 20)
              } // this should return true || false to get the validation classes to apply
              id={"fullName"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
              validationMessage={validators.nameValidationMsg}
              required={true} // this should be true if the field must be filed, if its optional it should be false
            />
          </div>
          <div className="col-sm-6 col-12">
            <VbTextInput
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
                title: "Username",
              }}
              validated={
                validator.matches(formData.username, /^[0-9a-zA-Z]+$/) &&
                validator.isLength(formData.username, 3, 20)
              } // this should return true || false to get the validation classes to apply
              id={"username"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
              validationMessage={validators.userNameValidationMsg}
              required={true} // this should be true if the field must be filed, if its optional it should be false
            />
          </div>
          <div className="col-sm-6 col-12">
            <VbTextInput
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
                title: "Email",
              }}
              id={"email"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
              validationMessage={validators.emailValidation}
              validated={validator.isEmail(formData.email)} // this should return true || false to get the validation classes to apply
              required={true} // this should be true if the field must be filed, if its optional it should be false
            />
          </div>
          <div className="col-sm-6 col-12">
            <VbPhoneNumberInput
              id={"home-phone"} //id is used as input ID and label FOR -- THIS SHOULD BE UNIQ
              label={{
                class: "orange",
                title: "Home phone",
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
          <div className="col-sm-6 col-12">
            {/* <VbDropdown
              options={munis} // here this array is coming as a prop
              label={{
                class: "orange",
                title: "Single select",
              }}
              id={"singleSelectDropdown"} // ID should be uniq to itself
              validated={
                // isIn(str, values)	check if the string is in a array of allowed values.
                formData.singleOption &&
                validator.isIn(
                  formData.singleOption.toLowerCase(),
                  munis.toLowerCase()
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
          </div>
          <div className="col-sm-6 col-12">
            {/* <VbMultiSelect
              label={{
                class: "orange",
                title: "Multiple select",
              }}
              id={"multi-select-options"} // ID should be uniq to itself
              options={munis}
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
          </div>
          <div className="d-flex justify-content-center pt-5">
            <button
              className="btn btn-fill"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
