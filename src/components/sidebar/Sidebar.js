import React, { Component } from "react";
import logo from "../../img/logo.png";
import "../../App.css";
import loadingGif from "../../img/loading.gif";

export default class Sidebar extends Component {
  state = {
    city: null,
    latitude: null,
    longitude: null,
    search: null,
    error: false,
  };
  async response() {
    const BASE_URL = "http://api.weatherstack.com/";
    const TOKEN = "Token";
    const lati = this.state.latitude;
    const longi = this.state.longitude;
    const url_creator = (lati, longi) => {
      return `${BASE_URL}forecast?access_key=${TOKEN}&query=${lati},${longi}`;
    };

    const getWeatherByCity = async (city) => {
      let url = url_creator(lati, longi);
      let response = await fetch(url);

      const { location, current } = await response.json();
      return { location, current };
    };
    const result = await getWeatherByCity();
    return result;
  }
  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition((position) => {
      try {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        alert("we dont find you");
        this.setState({ error: true });
      }
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    let list = await this.response();
    this.setState({ city: list });
  }

  bar = async (data) => {
    const BASE_URL = "http://api.weatherstack.com/";
    const TOKEN = "token";
    try {
      let response = await fetch(
        `${BASE_URL}forecast?access_key=${TOKEN}&query=${data}`
      );
      const { location, current } = await response.json();
      let list = { location, current };
      this.setState({ city: list, search: data });
    } catch {
      alert("Uppps");
      this.setState({ error: true });
    }
  };
  search() {
    const search = this.props.valueFromParent;

    try {
      if (
        search &&
        this.state.city.location["name"].toLowerCase() !==
          search.toLowerCase().trim()
      ) {
        if (search !== this.state.search) {
          this.bar(search);
        }
      }
    } catch {
      this.setState({ error: true });
      return (
        <div className="WeatherBox-outside" style={{ width: "100%" }}>
          {" "}
          Oppps We Cant find this city
        </div>
      );
    }
  }
  dataDiv(city) {
    return (
      <div>
        {this.search()}
        {this.state.error ? (
          <div> Biseyler Yanlıs oldu</div>
        ) : (
          <div
            key={city.location["name"]}
            className={[
              "WeatherBox-outside",
              city.current.temperature < 15 ? "Snow" : "Sunny",
            ].join(" ")}
            style={{
              width: "100%",
              borderRadius: "2vh",
              padding: "1%",
              marginLeft: "1%",
            }}
          >
            <strong style={{ fontSize: "calc(1vmin + 8px)" }}>Today</strong>{" "}
            <br />
            {this.date(city.location["localtime"])}
            <div>
              <img
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
                  maxWidth: "60%",
                  height: "5px",
                  backgroundColor: "white",
                  margin: "auto",
                  marginBottom: "8%",
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
        )}
      </div>
    );
  }
  emptyrender() {
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
      " " +
      localTime.getHours() +
      ":" +
      localTime.getMinutes()
    );
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "auto",
          fontSize: "70%",
          borderWidth: "1px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <div className="Logo" style={{ width: "80%", margin: "auto" }}>
            <div>
              <img alt="logo" src={logo} className="Logo" />
            </div>
            <div style={{ width: "100%" }}>
              <strong> METEOROLOG</strong>
            </div>
          </div>

          <h6 style={{ paddingTop: "10%" }}>
            <strong> Your Locations</strong>
          </h6>
        </div>
        <div
          style={{
            width: "80%",
            height: "auto",
            color: "black",
            margin: "auto",
          }}
        >
          {this.state.latitude == null && this.props.valueFromParent === "" ? (
            <div className="badge badge-danger">
              'WE CANT FİND YOUR LOCATİON'{" "}
            </div>
          ) : !this.state.city ? (
            this.emptyrender()
          ) : (
            this.dataDiv(this.state.city)
          )}
        </div>
      </div>
    );
  }
}
