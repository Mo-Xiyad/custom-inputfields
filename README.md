## TO run the code follow the steps below

- Make a clone of this repo. top right coner where it says `code` press it and follow the instructions.
- Onece the repo is cloned open up the repo in your code editor
- If your using VSCode press `comand j` to opne the terminal within 
- Now assuming your in the project directory run the command depending on the packagemanager your using  `npm install` or `yarn install`
- Then run `npm start` this will run the project in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
````
 <TextInput
  onChangeFunc={(event) => {
    const value = event.target.value;
    setFormData(value);
  }}
  type={"text"} // input files type
  suffix={"username"} // input files suffix if you preffer this is optional
  label={{
  title: "Username"
  }}
  validated={checkValidation("username", formData.username)} // this should return true || false to get the validation classes to apply
  id={"username"} //ID is used as input ID and label FOR/NAME -- THIS SHOULD BE UNIQ
  validationMessage={validators.userNameValidationMsg}
  required={true} // this should be true if the field must be filed, if its optional it should be false
  />
