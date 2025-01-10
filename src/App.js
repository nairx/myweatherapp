import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [city, setCity] = useState("Bangalore");
  const [flag,setFlag] = useState(false)
  const [data, setData] = useState({});
  const apikey = process.env.REACT_APP_APIKEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const showData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    if (data.cod===200) setFlag(true) 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Weather App</h1>
        <div>
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setCity(e.target.value)}
          ></input>{" "}
          <button onClick={showData}>Fetch</button>
        </div>

        {flag && (
          <div>
            <div>
              {data.name}, {data.sys.country}{" "}
            </div>
            <div>Temperature: {Math.round(data.main.temp - 273.15)} °C</div>
            <div>{data.weather[0].description}</div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
