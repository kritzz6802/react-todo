import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

function Todo1() {
    const [inputdata, setInputData] = useState({});
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const inputFieldNames = ["input1", "input2", "input3"];

    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
          return curElem.id === index;
        });
        setInputData(item_todo_edited.input1);
        setInputData(item_todo_edited.input2);
        setInputData(item_todo_edited.input3);
        setIsEditItem(index);
        setToggleButton(true);
      };



    // how to delete items section
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    // remove all the elements
    const removeAll = () => {
        setItems([]);
    };

    // adding localStorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // const inputDataValues = Object.values(inputdata);
    // const inputdataString = inputDataValues.join(" ");
//     const addItem = () => {
//     if (!inputdataString) {
//         alert("plz fill the data");
//     } else if (inputdataString && toggleButton) {
//         setItems(
//             items.map((curElem) => {
//                 if (curElem.id === isEditItem) {
//                     return { ...curElem, name: inputdataString };
//                 }
//                 return curElem;
//             })
//         );

//         setInputData({
//             input1: "",
//             input2: "",
//             input3: ""
//         });
//         setIsEditItem(null);
//         setToggleButton(false);
//     } else {
//         const myNewInputData = {
//             id: new Date().getTime().toString(),
//             name: inputdataString
//         };
//         setItems([...items, myNewInputData]);
//         setInputData({
//             input1: "",
//             input2: "",
//             input3: ""
//         });
//     }
// };
const addItem = () => {
    if (!Object.values(inputdata).every(Boolean)) {
      alert("Please fill all the fields");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, ...inputdata };
          }
          return curElem;
        })
      );
      setInputData({});
      setIsEditItem("");
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        ...inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData({});
    }
  };

return (
    <>
        <div>
            <div className="main-div">
                <div className="child-div">
                    {inputFieldNames.map((name) => (
                        <div key={name} className="addItems">
                            <label>{name}:</label>
                            <input
                                type="text"
                                placeholder="✍ Add Email"
                                name={name}
                                value={inputdata[name] || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                    <div>
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>
                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                <div className="rowitem">
                                    <h3>{curElem.input1}</h3>
                                    <h3>{curElem.input2}</h3>
                                    <h3>{curElem.input3}</h3>
                                    </div>
                                    <div className="todo-btn">
                                        <i
                                            className="far fa-edit add-btn"
                                            onClick={() => editItem(curElem.id)}
                                        ></i>
                                        <i
                                            className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(curElem.id)}
                                        ></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={removeAll}
                        >
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default Todo1;
