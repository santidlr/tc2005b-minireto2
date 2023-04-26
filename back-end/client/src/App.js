import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {

  const [data, setData] = React.useState(null);
  const [dataDB, setDataDB] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message))
  },[])

  React.useEffect(() => {
    fetch("/api/basededatos")
      .then((res) => res.json())
      .then((dataDB) => setDataDB(dataDB.result))
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <p>{!dataDB ? "Loading DB Data..." : dataDB}</p>
      </header>
    </div>
  );
}

export default App;
