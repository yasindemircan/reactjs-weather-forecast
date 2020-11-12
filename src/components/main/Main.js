import React, { Component } from "react";
import loadingGif from "../../img/loading.gif";
import "../../App.css";
export default class Main extends Component {
  state = {
    city: null,
  };
  emptyRender() {

    return (
      <div>
        <div style={{ position: "relative", width: "100%" }}>
          {" "}
          <img
            src={loadingGif}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            width="60%"
            alt="loading"
          />{" "}
        </div>
      </div>
    );
  }
  date(time) {
    const localTime = new Date(time);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      localTime.getDate() +
      "-" +
      months[localTime.getMonth()] +
      "\n" +
      localTime.getHours() +
      ":" +
      localTime.getMinutes()
    ); // for data div
  }
  systemdate() {
    const date = new Date();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return (
      date.getHours() +
      ":" +
      date.getUTCMinutes() +
      " " +
      days[date.getDay()] +
      " " +
      date.getDate() +
      "/" +
      date.getMonth()
    ); //for last update time
  }
  writeData() {
    return this.state.city.map((city) => (
      <div
        key={city.location["name"]}
        className={[
          "WeatherBox-outside",
          city.current.temperature < 15 ? "Snow" : "Sunny",
        ].join(" ")}
      >
        <strong style={{ fontSize: "calc(1vmin + 8px)" }}>Today</strong> <br />
        {this.date(city.location["localtime"])}
        <div>
          <img
            style={{}}
            className="Pictures"
            src={city.current.weather_icons}
            alt={city.current.weather_descriptions}
          />
        </div>
        <div>
          <i>{city.current.weather_descriptions}</i>
          <p style={{ fontSize: "calc(2vmin + 8px)", fontWeight: "bold" }}>
            {" "}
            {city.current.temperature}°C
          </p>
          <strong style={{ fontSize: "calc(1vmin + 5px)" }}>
            {city.location["name"]} <br />
            {city.location["country"]}
          </strong>
          <p>Real feel: {city.current.feelslike}°C</p>
          Humidity: {city.current.humidity}%
          <div
            className="progress"
            style={{
              maxWidth: "70%",
              height: "5px",
              backgroundColor: "white",
              margin: "auto",
            }}
          >
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: city.current.humidity + "%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    ));
  }
  dataRender() {
    return (
      <div style={{ width: "100%", height: "85vh", fontSize: "80%" }}>
        <div className="text-center badge-success ">
          {" "}
          <span> Last Update Time: {this.systemdate()}</span>{" "}
        </div>
        <div style={{ width: "100%", flexDirection: "row" }}></div>
        <div className="App-main-WeatherBox-All">{this.writeData()}</div>
      </div>
    );
  }

  async response() {
    const BASE_URL = "http://api.weatherstack.com/";
    const TOKEN = "token";
    const CITYS = [
      "istanbul",
      "Ankara",
      "izmir",
      "Bursa",
      "vancouver",
      "paris",
      "new york",
    ];

    const url_creator = (location) => {
      return `${BASE_URL}forecast?access_key=${TOKEN}&query=${location}`;
    };

    const getWeatherByCity = async (city) => {
      let url = url_creator(city);
      let response = await fetch(url);

      const { location, current } = await response.json();

      return { location, current };
    };
    const result = await Promise.all(
      CITYS.map((city) => getWeatherByCity(city))
    );
    return result;
  }
  async componentDidMount() {
    let list = await this.response();
    this.setState({ city: list });
  }

  render() {
    return (
      <div>{!this.state.city ? this.emptyRender() : this.dataRender()}</div>
    );
  }
}
