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

const VbMultiSelect = ({
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
  const isMounted = useRef(false);
  const hasChanged = useRef(false);

  const [data, setData] = useState(options || []); // Array that is coming from parent
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState();

  const [isActive, setActive] = useState(false);
  const mobileWidth = useWindowWidth();

  const handleToggle = (e) => {
    const inputTag = document.querySelector(`input[name=${id}]`);
    setActive(true);
    inputTag.focus();
    if (e) {
      setSelected([...selected, e.target.innerHTML]);
      let span = document.createElement("span");
      const value = e.target.innerHTML;
      span.innerHTML = value;
      let pTag = document.querySelector(`#multiOption${id} .selected-items`);
      pTag.appendChild(span);
      inputTag.focus();
    }
  };

  let selectedItems = document.querySelectorAll(
    `.vb-multSelect #multiOption${id} span.selected-items span`
  );
  selectedItems.forEach((span) => {
    span.addEventListener("click", (e) => {
      let value = span.innerHTML;
      setSelected(
        selected.filter(
          (data) =>
            data?.toString().toLowerCase()||"" !== value?.toString().toLowerCase()||""
        )
      );
      span.remove();
    });
  });

  const dropDownActiveListener = (e) => {
    const wrap = document.querySelector(`input[name=${id}] ~ .wrap`);
    const arrow = document.querySelector(`input[name=${id}] ~ .wrap .arrow`);
    const arrow1 = document.querySelector(
      `input[name=${id}] ~ .wrap .arrow .arrow1`
    );
    const arrow2 = document.querySelector(
      `input[name=${id}] ~ .wrap .arrow .arrow2`
    );
    let label = document.querySelector(`[for=${id}]`);
    let mainDiv = document.querySelector(`#multiOption${id}`);
    let selectedItems = document.querySelector(
      `#multiOption${id} .selected-items`
    );
    const inputTag = document.querySelector(`input[name=${id}]`);

    if (
      e.target !== label &&
      e.target !== mainDiv &&
      e.target !== selectedItems &&
      e.target !== wrap &&
      e.target !== arrow &&
      e.target !== arrow1 &&
      e.target !== arrow2 &&
      e.target !== inputTag
    ) {
      const li = e.target.closest("li");
      if (li) {
        return null;
      } else {
        setActive(false);
      }
    }
  };

  document.addEventListener("click", dropDownActiveListener);

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
      onChangeFunc(selected);
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
      if (listItems.length === 0 && !current && selected.length > 0) {
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
        let value = current.innerHTML;
        setSelected([...selected, value]);
        let span = document.createElement("span");
        span.innerHTML = value;
        let pTag = document.querySelector(`#multiOption${id} .selected-items`);
        pTag.appendChild(span);
        setData(
          data.filter(
            (data) => data?.toString().toLowerCase() !== value.toLowerCase()||""
          )
        );
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

  const keyDownOnMain = (e) => {
    let tab = e.which || e.keyCode;
    if (tab === 9) {
      setActive(true);
    }
  };

  //   remove from the array and adding back to the array
  useEffect(() => {
      if (selected){
          setData(
            options?.filter(
              (item) =>
                !selected
                  ?.toString()
                  .toLowerCase()
                  .includes(item.toString().toLowerCase()||"")
            )
          );
      }
    onChangeFunc(selected ? selected : []);
  }, [selected]);

  //   toggling the active state and adding smooth scrolling
  useEffect(() => {
    let mainDiv = document.querySelector(`#multiOption${id}`);
    const arrow = document.querySelector(`input[name=${id}] ~ .wrap .arrow`);
    const inputTag = document.querySelector(`input[id=${id}]`);
    if (isActive) {
      arrow.classList.add("active");
      inputTag.focus();
    //   if (mobileWidth == 480 || mobileWidth < 480) {
    //     $("body").animate(
    //       {
    //         scrollTop: $(`#${id}`).offset().top - 100,
    //       },
    //       "slow"
    //     );
    //   }
    } else {
      arrow.classList.remove("active");
    }
    if (isActive) {
      validation();
      mainDiv.classList.add("hideborders");
      if (!hasChanged.current) {
        hasChanged.current = true;
      }
    } else {
      mainDiv.classList.remove("hideborders");
    }
  }, [isActive]);

  //   // validation
  const validation = () => {
    const inputTag = document.querySelector(`input[id=${id}]`);
    const mainDiv = document.querySelector(`#multiOption${id}`);
    if (required && !validated) {
      mainDiv.classList.remove("ok-check");
      inputTag.classList.remove("ok-checked");
      mainDiv.classList.add("ok-failed");
      if (isActive) {
        inputTag.classList.add("ok-failed");
      }
    }

    if (validated && required) {
      mainDiv.classList.remove("ok-failed");
      inputTag.classList.remove("ok-failed");
      mainDiv.classList.add("ok-check");
      if (isActive) {
        inputTag.classList.add("ok-checked");
      }
    }
  };
  useEffect(() => {
    if (selected.length) {
      validation();
    }
    if (inputValue) {
      validation();
    }
    if (isMounted.current) {
      validation();
    } else {
      isMounted.current = true;
    }
  }, [validated, selected, inputValue]);

  return (
    <div className="vb-select vb-multSelect">
      <div
        tabIndex={"0"}
        onKeyDown={(e) => keyDownOnMain(e)}
        id={`multiOption${id}`}
        onBlur={(e) => onBlurHandler(e)}
        onFocus={(e) => onFocusHandler(e)}
        className={"mySelected"}
        onClick={() => {
          handleToggle();
        }}
      >
        <span className="selected-items"></span>
      </div>
      <input
        className={
          isActive ? "dropdown d-block hideBorders" : "dropdown d-none"
        }
        id={id}
        name={id}
        value={inputValue}
        onChange={(e) => onChangeHandler(e)}
        onKeyDown={(e) => keyDownHandler(e)}
        onKeyUp={(e) => keyUpHandler(e)}
        autoComplete="off"
        placeholder={" "}
        // required={required}
      />
      <label
        onClick={() => {
          setActive(true);
        }}
        className={
          selected.length > 0 ? `label-focused ${label?.class}` : label?.class
        }
        htmlFor={id}
      >
        {label?.title && label.title}
      </label>
      {/* {suffix ? <span className={isActive?"dropdown-suffix shuffix-in-active":"dropdown-suffix"}>{suffix}</span> : null} */}

      {/* validation message */}
      {isActive === false && hasChanged.current === true && (
        <div className="w-100 d-inline">
          {validationMessage ? validationMessage(selected, options) : null}
        </div>
      )}

      {/* open and close arrow */}
      <div className="wrap" onClick={() => addArrow()}>
        <span className="arrow">
          <span className="arrow1"></span>
          <span className="arrow2"></span>
        </span>
      </div>

      {/* DropDown */}
      <div
        className={
          isActive
            ? "d-block search-dropdown-list"
            : "d-none search-dropdown-list"
        }
      >
        <ul>
          {!inputValue &&
            data.map((opt, i) => (
              <li
                key={i}
                className={!isActive ? null : ""}
                onClick={(event) => handleToggle(event)}
              >
                {opt}
              </li>
            ))}
          {inputValue &&
            data
              .filter((ar) =>
                ar.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((opt, i) => (
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

export default VbMultiSelect;
