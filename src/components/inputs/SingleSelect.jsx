import React, { useEffect, useState, useLayoutEffect, useRef } from "react";

/*
!---PROPS----PROPS that is a must to be provided 

?   validated   ---------> // this is should TRUE when your validation is satisfied 
?                          // if its return true "ok-check" class will be applied || if it return false it will apply "ok-failed" 

?   required     --------> // if TRUE validation error class will be given by default || 
?                          // this should be true if the field must be filed, if its optional it should be false or dont provide any

?   validationMessage ---> // This function will receive two parameter (list of selected array, original list of all options)=>{} 
?                          // This should be a function that only returns HTML tag with your own validation text 
?                          // eg: return (<small className="text-success"> Your Massage goes here!!!! </small>)

?   id          ---------> // ID is used here as input ID & NAME and also label FOR so this should be uniq to itself

?   label       ---------> // This is going to be an Object {class: "", title: ""} Since in this component label is used as the placeholder it is required to send a label along with the ID as mentioned above
*/

// this is to check the window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
};

const VbDropdown = ({
  options,
  label,
  id,
  validated,
  validationMessage,
  suffix,
  required,
  onBlurFunc,
  onChangeFunc,
  onFocusFunc,
}) => {
  const hasChanged = useRef(false);
  const [inputValue, setInputValue] = useState();
  const [isActive, setActive] = useState(false);
  const mobileWidth = useWindowWidth();

  const dropDownActiveListener = (e) => {
    const inputTag = document.querySelector(`input[name=${id}]`);
    const list = document.querySelector(
      `input[name=${id}] ~ .search-dropdown-list`
    );
    const wrap = document.querySelector(`input[name=${id}] ~ .wrap`);
    const arrow = document.querySelector(`input[name=${id}] ~ .wrap .arrow`);
    const arrow1 = document.querySelector(
      `input[name=${id}] ~ .wrap .arrow .arrow1`
    );
    const arrow2 = document.querySelector(
      `input[name=${id}] ~ .wrap .arrow .arrow2`
    );
    if (
      e.target !== inputTag &&
      e.target !== list &&
      e.target !== wrap &&
      e.target !== arrow &&
      e.target !== arrow1 &&
      e.target !== arrow2
    ) {
      setActive(false);
    }
  };

  document.addEventListener("click", dropDownActiveListener);

  const handleToggle = (value) => {
    setActive(!isActive);
    if (value) {
      setInputValue(value);
    }
  };

  const addArrow = () => {
    const arrow = document.querySelector(`input[name=${id}] ~ .wrap .arrow`);
    if (arrow.classList.contains("active")) {
      arrow.classList.remove("active");
      setActive(false);
    } else {
      arrow.classList.add("active");
      setActive(true);
    }
  };

  const onBlurHandler = (e) => {
    if (!onBlurFunc && required && !validated) {
      e.target.classList.add("ok-failed");
    }
    if (!onBlurFunc && validated && required) {
      e.target.classList.remove("ok-failed");
    }
    if (onBlurFunc) {
      onBlurFunc(e);
    }
  };

  const onFocusHandler = (e) => {
    if (onFocusFunc) {
      onFocusFunc(e);
    }
  };

  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
    if (onChangeFunc) {
      onChangeFunc(e.target.value);
    }
  };

  const keyDownHandler = (e) => {
    let tab = e.which || e.keyCode;
    setActive(true);
    let listItems = Array.prototype.slice.call(
      document.querySelectorAll("div.search-dropdown-list.d-block ul li")
    );
    const current = document.querySelector(".hover");
    let index = listItems.indexOf(current);
    if (tab === 9) {
      if (listItems.length === 0 && !current && inputValue.length > 0) {
        setActive(false);
        return;
      }
      if (index == listItems.length - 1) {
        current.classList.remove("hover");
        setActive(false);
        return;
      }
      if (current) {
        current.classList.remove("hover");
        listItems[index + 1].classList.add("hover");
        // $("ul").animate(
        //   {
        //     scrollTop: current.offsetHeight * (index + 1),
        //   },
        //   0
        // );
      } else {
        listItems[0].classList.add("hover");
      }
      e.preventDefault();
    }
    if (e.keyCode === 40) {
      // arrow down
      if (index == listItems.length - 1) {
        current.classList.remove("hover");
        index = 0;
        // $("ul").animate(
        //   {
        //     scrollTop: current.offsetHeight * index,
        //   },
        //   0
        // );
        return;
      }
      if (current) {
        current.classList.remove("hover");
        listItems[index + 1].classList.add("hover");
        // $("ul").animate(
        //   {
        //     scrollTop: current.offsetHeight * (index + 1),
        //   },
        //   0
        // );
      } else {
        listItems[0].classList.add("hover");
      }
    }
    if (e.keyCode === 38) {
      // arrow up
      if (index == 0) {
        current.classList.remove("hover");
        index = listItems.length - 1;
        // $("ul").animate(
        //   {
        //     scrollTop: current.offsetHeight * index,
        //   },
        //   0
        // );
        return;
      }
      if (current) {
        current.classList.remove("hover");
        listItems[index - 1].classList.add("hover");
        // $("ul").animate(
        //   {
        //     scrollTop: current.offsetHeight * (index - 1),
        //   },
        //   0
        // );
      } else {
        listItems[listItems.length - 1].classList.add("hover");
      }
    }
    if (e.keyCode === 13) {
      // Enter
      if (current) {
        setInputValue(current.innerText);
        setActive(false);
        e.target.blur();
      }
    }
    if (e.keyCode === 27) {
      setActive(false);
      e.target.blur();
    }
  };

  const keyUpHandler = (e) => {
    let tab = e.which || e.keyCode;
    if (tab === 9) {
      setActive(true);
    }
  };

  useEffect(() => {
    const arrow = document.querySelector(`input[name=${id}] ~ .wrap .arrow`);
    const inputTag = document.querySelector(`input[id=${id}]`);
    if (isActive) {
      arrow.classList.add("active");
      inputTag.focus();
      if (mobileWidth == 480 || mobileWidth < 480) {
        // $("body").animate(
        //   {
        //     scrollTop: $(`#${id}`).offset().top - 100,
        //   },
        //   "slow"
        // );
      }
    } else {
      arrow.classList.remove("active");
    }
    if (isActive) {
      if (!hasChanged.current) {
        hasChanged.current = true;
      }
    }
  }, [isActive]);

  // validation
  useEffect(() => {
    const inputTag = document.querySelector(`input[name=${id}]`);
    const mainD = document
      .querySelector(`input[name=${id}]`)
      .closest(".vb-select");
    if (inputValue) {
      // let match = options.filter((el)=> el.toLowerCase() === inputValue.toLowerCase()).toLocaleString()
      // if(match.toLowerCase() === inputValue.toLowerCase()){
      if (validated) {
        inputTag.classList.add("ok-check");
        mainD.classList.add("ok-check");
      } else {
        inputTag.classList.remove("ok-check");
        mainD.classList.remove("ok-check");
      }
    }
    if (inputValue && required && !validated) {
      inputTag.classList.add("ok-failed");
    } else {
      inputTag.classList.remove("ok-failed");
    }
    onChangeFunc(inputValue);
  }, [inputValue, validated]);

  return (
    <div className="vb-select">
      <input
        className={"dropdown"}
        id={id}
        name={id}
        onClick={() => setActive(true)}
        value={inputValue ? inputValue : null}
        onFocus={(e) => onFocusHandler(e)}
        onBlur={(e) => onBlurHandler(e)}
        onChange={(e) => onChangeHandler(e)}
        onKeyDown={(e) => keyDownHandler(e)}
        onKeyUp={(e) => keyUpHandler(e)}
        autoComplete="off"
        placeholder={" "}
        required={required}
      />
      <label className={`${label?.class}`} htmlFor={id}>
        {label?.title && label.title}
      </label>
      {suffix ? <span className="dropdown-suffix">{suffix}</span> : null}

      {/* validation message */}
      {isActive === false && hasChanged.current === true && (
        <div className="w-100 d-inline">
          {validationMessage ? validationMessage(inputValue, options) : null}
        </div>
      )}

      <div className="wrap" onClick={() => addArrow()}>
        <span className="arrow">
          <span className="arrow1"></span>
          <span className="arrow2"></span>
        </span>
      </div>

      <div
        className={
          isActive
            ? "d-block search-dropdown-list"
            : "d-none search-dropdown-list"
        }
      >
        <ul>
          {!inputValue &&
            options.map((opt,i) => (
              <li
              key={i}
                className={!isActive ? null : ""}
                onClick={() => handleToggle(opt)}
              >
                {opt}
              </li>
            ))}
          {inputValue &&
            options
              .filter((data) =>
                data.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((opt,i) => (
                <li
                key={i}
                  className={!isActive ? null : ""}
                  onClick={() => handleToggle(opt)}
                >
                  {opt}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default VbDropdown;
