import React, { useEffect, useState } from "react";
import vazifalar from "./data";

const App = () => {
  // localStorage kerak bolganda
  // let savedData = localStorage.getItem("mal");

  const [data, setData] = useState([]);
  const [getNewItem, setGetNewItem] = useState("");
  const [searched, setSearched] = useState("");
  const [allData, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newText, setNewText] = useState("");
  const [chose, setChose] = useState(null);
  const [ text, setText ] = useState("");

  // localStorage.setItem("mal", JSON.stringify(data));

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Apida xatolik bor");
        }
      })
      .then((info) => setAllData(info))
      // localStorage kerak bolganda
      // .then((info) => setData( savedData ? JSON.parse(savedData) : info ))
      .catch((Error) => console.log(Error));
  }, []);

  const deleteItem = (id) => {
    const newDate = allData.filter((value) => value.id != id);
    setAllData(newDate);
  };

  let filtered;

  if (searchQuery.length > 0) {
    filtered = allData.filter((value) =>
      value.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
  } else {
    filtered = allData;
  }

  const searchItem = (e) => {
    setSearchQuery(e.target.value);
  };

  const newTextChanged = (e) => {
    setNewText(e.target.value);
  };

  const addNewText = () => {
    setAllData([...allData, { id: allData.length + 1, title: newText }]);
    setNewText("");
  };

  const edit = (value) => {
    setChose(value.id);
    setText(value.title)
  };

  const getValue = (e) => {
    setText(e.target.value)
  }

  const saveInfo = () => {
    let newInfo = allData.map( (value) => value.id == chose ? { ...value, title: text } : value )
    setAllData(newInfo)
    setChose(null)
  }

  return (
    <div className="app">

      <section>
        <h1 className="text-white font-bold font-mono mb-5 text-2xl">
        Umumiy vazifalar soni: {allData.length} ta
        </h1>
        <input
          value={searchQuery}
        onChange={searchItem}
        type="text"
        placeholder="Vazifani qidirish"
        className="input input-bordered input-warning w-full max-w-xs mb-5"
        />
        <br />

      <input
        value={newText}
        onChange={newTextChanged}
        type="text"
        placeholder="Yangi Vazifa Qo'shish"
        className="input input-bordered input-warning w-full max-w-xs mb-5"
      />
      <button onClick={addNewText} className="btn btn-success ml-5 mb-5">
        Qo'shish
      </button>

      </section>

      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>Vazifa soni</th>
            <th>Vazifa haqida</th>
            <th>
              <button>Vazifani o'chirish</button>
            </th>
            <th>
              <button>Vazifani tahrirlash</button>
            </th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((value, index) => {
            return (
              <tr key={value.id}>
                <th>{index + 1}-vazifa</th>
                <th>
                  {
                    value.id == chose
                    ?
                    (<input onChange={getValue} value={text} type="text" className="input input-bordered input-info w-full max-w-xs"/>) 
                    :
                    value.title
                  }
                </th>
                <th><button onClick={() => deleteItem(value.id)}className="btn btn-error">Vazifani o'chirish</button></th>

                <th>
                  {
                    value.id == chose 
                    ? 
                    (<button onClick={saveInfo} className="btn btn-error">Saqlash</button>) 
                    : 
                    (<button onClick={() => edit(value)}className="btn btn-error">Vazifani Tahrirlash</button>)
                  }
                </th>
              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
};

export default App;
