import React, { useState, useEffect } from "react";
import autosuggestData from "../../airports.json";
import Select from "react-select";
const Flight = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedClass, setSelectedClass] = useState("economy");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [filteredDepartureResults, setFilteredDepartureResults] = useState([]);
  const [filteredArrivalResults, setFilteredArrivalResults] = useState([]);
  const [clientCountry, setClientCountry] = useState("");

  const incrementAdults = () => {
    setAdults(adults + 1);
  };

  const decrementAdults = () => {
    if (adults > 1) {
      setAdults(adults - 1);
    }
  };

  const incrementChildren = () => {
    setChildren(children + 1);
  };

  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  useEffect(() => {
    getClientCountry()
      .then((country) => {
        setClientCountry(country);
      })
      .catch((error) => {
        console.error("Error fetching client country:", error);
      });
  }, []);

  const getClientIP = async () => {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    return data.ip;
  };

  const getClientCountry = async () => {
    try {
      const clientIP = await getClientIP();
      const response = await fetch(`https://ipapi.co/${clientIP}/json/`);
      const data = await response.json();
      return data.country;
    } catch (error) {
      throw new Error("Error getting client country");
    }
  };

  const handleDepartureChange = (event) => {
    const inputValue = event.target.value;
    setDeparture(inputValue);
    if (inputValue.trim() === "") {
      setFilteredDepartureResults([]);
    } else {
      filterAndSortDepartureAutosuggestData(inputValue);
    }
  };

  const handleArrivalChange = (event) => {
    const inputValue = event.target.value;
    setArrival(inputValue);
    if (inputValue.trim() === "") {
      setFilteredArrivalResults([]);
    } else {
      filterAndSortArrivalAutosuggestData(inputValue);
    }
  };

  const filterAndSortDepartureAutosuggestData = (departureValue) => {
    const filteredData = autosuggestData.filter((airport) =>
      airport.cityName.toLowerCase().includes(departureValue.toLowerCase())
    );
    setFilteredDepartureResults(filteredData);
  };

  const filterAndSortArrivalAutosuggestData = (arrivalValue) => {
    const filteredData = autosuggestData.filter((airport) =>
      airport.cityName.toLowerCase().includes(arrivalValue.toLowerCase())
    );
    setFilteredArrivalResults(filteredData);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Flight Booking</h2>
      <div>
        <div className="flight-container mb-5 row">
          <div className="form-group col-lg-6">
            <label htmlFor="departure">Depart From</label>
            <input
              type="text"
              id="departure"
              className="form-control"
              value={departure}
              onChange={handleDepartureChange}
              placeholder="Departure"
            />
            <ul className="autosuggest-list">
              {filteredDepartureResults.map((airport, index) => (
                <li key={index}>
                  {airport.cityName}, {airport.countryName},{" "}
                  {airport.airportName}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group col-lg-6">
            <label htmlFor="arrival">Going TO</label>
            <input
              type="text"
              id="arrival"
              className="form-control"
              value={arrival}
              onChange={handleArrivalChange}
              placeholder="Arrival"
            />
            <ul className="autosuggest-list">
              {filteredArrivalResults.map((airport, index) => (
                <li key={index}>
                  {airport.cityName}, {airport.countryName},{" "}
                  {airport.airportName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="form-group col-lg-6 mb-5">
        <label htmlFor="arrival">Traveller Class</label>
        <Select
          id="arrival"
          value={[
            {
              value: "Traveller",
              label: "Economy",
            },
            {
              value: "Traveller",
              label: "Business",
            },
          ]}
          placeholder="Arrival"
        />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-around">
            <div>
              <label>Adults:</label>
              <button
                onClick={decrementAdults}
                className="btn btn-secondary mx-2"
              >
                -
              </button>
              <span>{adults}</span>
              <button
                onClick={incrementAdults}
                className="btn btn-secondary mx-2"
              >
                +
              </button>
            </div>
            <div>
              <label>Children:</label>
              <button
                onClick={decrementChildren}
                className="btn btn-secondary mx-2"
              >
                -
              </button>
              <span>{children}</span>
              <button
                onClick={incrementChildren}
                className="btn btn-secondary mx-2"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-3">
            <label className="Class_heading">Class:</label>
            <input
              type="radio"
              id="economy"
              name="class"
              value="economy"
              checked={selectedClass === "economy"}
              onChange={handleClassChange}
            />
            <label htmlFor="economy">Economy</label>

            <input
              type="radio"
              id="business"
              name="class"
              value="business"
              checked={selectedClass === "business"}
              onChange={handleClassChange}
            />
            <label htmlFor="business">Business</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
