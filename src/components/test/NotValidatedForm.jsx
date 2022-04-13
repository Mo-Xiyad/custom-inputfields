import React, { useState, useEffect } from "react";

import VbTextInput from "../inputs/TextInput.jsx";
import VbPhoneNumberInput from "../inputs/PhoneNumber.jsx";
// import VbDropdown from "../inputs/SingleSelect.jsx";
// import VbMultiSelect from "../inputs/MultiOptions.jsx";

const NoValidationForm = ({ munis }) => {
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
    <div className="container mt-3">
      <div className="d-flex justify-content-center pt-3">
        <h1 className="text-blue text-bold">Without Validation</h1>
      </div>
      <div className="d-flex justify-content-center">
        <p className="text-blue text-bold">
          This form is to show how you can use components without any
          requirements. meaning no "required === false" AND "validated===false"
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
              label={{
                class: "",
                title: "Full name",
              }}
              id={"fullNameNovalidation"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
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
              label={{
                class: "",
                title: "Username",
              }}
              id={"usernameNovalidation"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
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
              label={{
                class: "",
                title: "Email",
              }}
              id={"emailNovalidation"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
            />
          </div>
          <div className="col-sm-6 col-12">
            <VbPhoneNumberInput
              id={"home-phoneNovalidation"} //id is used as input ID and label FOR -- THIS SHOULD BE UNIQ
              label={{
                class: "",
                title: "Home phone",
              }}
              onChangeFunc={(value) => {
                // here it is only receiving the value not the event
                setFormData((prevState) => {
                  return { ...prevState, phoneNumber: value };
                });
              }}
            />
          </div>
          {/* <div className="col-sm-6 col-12">
            <VbDropdown
              options={munis.map((data) => data.label)} // here this array is coming as a prop
              label={{
                class: "",
                title: "Single select",
              }}
              id={"singleSelectDropdownNovalidation"} // ID should be uniq to itself
              onChangeFunc={(value) => {
                // here it is only receiving the value not the event
                setFormData((prevState) => {
                  return { ...prevState, singleOption: value };
                });
              }}
            />
          </div>
          <div className="col-sm-6 col-12">
            <VbMultiSelect
              label={{
                class: "",
                title: "Multiple select",
              }}
              id={"multi-select-optionsNovalidation"} // ID should be uniq to itself
              options={munis.map((data) => data.label)}
              onChangeFunc={(value) => {
                // here it is only receiving the value not the event
                // This value is a array, that is the selected options
                setFormData((prevState) => {
                  return { ...prevState, multiOption: value };
                });
              }}
            />
          </div> */}
          <div className="d-flex justify-content-center pt-5">
            <button
              className="btn btn-orange"
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
export default NoValidationForm;
