import "./App.scss";
import Form from "./components/test/Form";
const dropDownList = ["apple", "android", "chrome", "nokia", "windows", "next"];
function App() {
  return (
    <div className="flex-row justify-center bg-primaryBG-1">
      {/* with validation */}
      <div className="flex-row pt-5">
        <h1 className="flex text-3xl font-bold text-primaryText-1 justify-center">
          Custom Input fields
        </h1>
        <p className="flex text-sm font-bold text-primaryText-1 justify-center pt-5">
          How this works?
        </p>
        <p className="flex text-sm font-bold text-primaryText-1 justify-center p-2">
          Keep in mind this is a work in progress.
        </p>
        <p className="flex text-sm text-primaryText-1 justify-center p-2">
          This is has been created using ReactJS and TailwindCSS. The input
          field is about creating a custom input field with validation. I will
          be adding a custom drop down here as well.
        </p>
      </div>
      <div className="flex justify-center items-center h-screen">
        <Form dropDownList={dropDownList} />
      </div>
      {/* without validation */}
      {/* <div className="flex justify-center items-center h-screen">
        <NoValidationForm dropDownList={dropDownList} />
      </div> */}
    </div>
  );
}

export default App;
