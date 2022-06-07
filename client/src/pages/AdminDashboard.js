import React from "react";

//Admin dashboard

export default class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.state = { info: "Press menu selection to change" };
  }

//pending listings for approval or denial
  pendingListings = () => {
    this.setState({ info: "pending-listings" });
  };

  //admin profile information, username, contact info, etc.
  adminProfile = () => {
    this.setState({ info: "admin-profile" });
  };

  render() {
    return (
      <div classname="dash-menu">
        <div
          class="btn-group-vertical"
          role="group"
          aria-label="Dashboard Buttons"
        >
          <div class="dash-title">Admin Dashboard</div>

          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.pendingListings}
          >
            Pending Listings
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            onClick={this.adminProfile}
          >
            Admin Profile
          </button>


          
        </div>

        <div className="dashboardDisplay">{this.state.info}</div>
      </div>
    );
  }
}

// div, className = "dashboardDisplay" is a state that can be changed
// temporary info, to be changed by back end to reflect results