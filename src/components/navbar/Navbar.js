import React, { Component } from "react";
import Search from "../../img/search.png";
import "../../App.css";

export default class Navbar extends Component {
    state = {
        CityValue: "",
    };
    childFunction = () => {
        this.props.functionCallFromParent(this.state.CityValue);
    };
    handleChange = (e) => {
        this.setState({ CityValue: this.slugify(e.target.value) });
    };
    handleKey = (e) => {
        if (e.key === "Enter") {
            this.childFunction();
        }
    };
    handleClick = (e) => {
        this.setState({ CityValue: e });

    }
    FastCity = () => {
        const CITYS = ['Sile', 'Canakkale', 'Adana', 'Denizli', 'Aydin', 'Mersin', 'Edirne'];
        return (CITYS.map(city => (
            <button className="btn btn-warning" key={city} style={{ width: '14%', fontSize: '70%', overflow: "visible" }} value={city} onClick={(e) => this.handleClick(e.target.value)}>{city}</button>
        ))
        )
    }
    slugify = function (text) {
        var trMap = {
            'çÇ': 'c',
            'ğĞ': 'g',
            'şŞ': 's',
            'üÜ': 'u',
            'ıİ': 'i',
            'öÖ': 'o'
        };
        for (var key in trMap) {
            text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
        }
        return text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
            .replace(/\s/gi, "-") // convert spaces to dashes
            .replace(/[-]+/gi, "-") // trim repeated dashes
            .toLowerCase();
    }
    render() {
        return (
            <div>
                <div
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        marginTop: "1%",
                    }}
                >
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    ></link>
                    <div
                        style={{
                            justifyContent: "center",
                            margin: "1%",
                        }}
                    >
                        <button
                            onClick={this.childFunction.bind(this)}
                            style={{
                                border: "none",
                                borderRadius: "10px",
                                backgroundColor: "#CAD1EC",
                                width: "4vh",
                                padding: "10%",
                                margin: "0%",
                            }}
                            type="submit"
                        >
                            <img
                                src={Search}
                                alt="Search"
                                width="70%"
                                style={{ backgroundColor: "#CAD1EC" }}
                            />
                        </button>
                    </div>
                    <div style={{ margin: "1%", width: "100%" }}>
                        <input
                            type="text"
                            placeholder="Search.."
                            style={{ paddingLeft: 10 }}
                            onKeyPress={this.handleKey}
                            className="inputBox"
                            onChange={this.handleChange}
                            value={this.state.CityValue}
                        />
                    </div>

                </div>
                <div style={{ marginLeft: 0, marginRight: 0, textAlign: "center" }}>

                    {this.FastCity()}
                </div>
            </div>

        );
    }
}
