import React from "react";
import axios from "axios";
export default class UserDashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      info: "Welcome to your Dashboard!",
      messages: [],
      redirectTo:""
    };
    this.getMessages = this.getMessages.bind(this);

  }

  
  //State for previously bought items
  previouslyBought = () => {
    this.setState({ info: "previously-bought" });
  };

  //State for current active selling post from the user
  mySelling = () => {
    this.setState({ info: "My Postings" });
  };

  //State for user profile account information, username, contact info, etc.
  userProfile = () => {
    this.setState({ info: "Messages" });
  };

  getMessages() {
    axios
      .get("/messages/allMessages/")
      .then(response => {
        if (response) {
          this.setState({
            messages: response.data
          });
        } else {
          console.log("No data found");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
      return (
        <div className="dash-menu">
          <div
            className="btn-group-vertical"
            role="group"
            aria-label="Dashboard Buttons"
          >
            <div className="dash-title">My Dashboard</div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.getMessages}
            >
              Messages
            </button>


            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.mySelling}
            >
              My Postings
            </button>
          </div>

          <h1 className="dashboardDisplay">{this.state.info}</h1>
          {this.state.messages ? (
            <div style={{ textAlign: "center" }}>
              {this.state.messages.map((message, k) => {
                return (
                  <div className="Message">
                    <h2>{message.subject}</h2>
                    <p>From {message.sentFrom}</p>
                    <p>{message.text}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>You have no messages</div>
          )}
        </div>
      );
    }

  }

// div, className = "dashboardDisplay" is a state that can be changed
// temporary info, to be changed by back end to reflect results
