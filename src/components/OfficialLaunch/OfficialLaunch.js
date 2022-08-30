import React, { Component } from "react";

import { contractAddress, refDefaultAddress } from "../constant";

class OfficialLaunch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: "30",
      notminted: "",
      selected: "1",
    };
  }

  loadWeb3 = async () => {
    let windows = {};
    let mainAccount;
    let isConnected = false;
    let connection;
    try {
      windows.tronWeb = await window.tronWeb;
      if (
        windows.tronWeb &&
        windows.tronWeb.defaultAddress.base58 === "undefined"
      ) {
        connection = "TROn LINK is not available";
        isConnected = false;
      } else {
        connection = "Connected to Tron LINK.";
        isConnected = true;
        mainAccount = await windows.tronWeb.defaultAddress.base58;
        this.setState({ mainAccount: mainAccount });
        this.isLocked();
        if (mainAccount) {
          if (isConnected === true) {
            mainAccount = await windows.tronWeb.defaultAddress.base58;

            this.setState({ mainAccount: mainAccount });
            let accountDetails = null;
            localStorage.setItem("load", mainAccount);
          } else {
            console.log("Tron Not Connected");
          }
        } else {
          console.log("Please login or install tron wallet!");
        }
      }
    } catch (error) {
      console.log("error0", error);
    }
  };

  isLocked() {
    if (window.tronWeb.defaultAddress.base58 == null) {
      // console.log("error null");
    } else if (window.tronWeb.defaultAddress.base58 === 0) {
      // console.log("TRON LINK is locked");
    } else {
      // console.log("TRON LINK is unlocked");
    }
  }
  handleMint = async (event) => {
    try {
      let contract = await window?.tronWeb.contract().at(contractAddress);
      const getNotMintedAmount = await contract
        .mint()
        .send({
          callValue: window.tronWeb.toSun(this.state.totalPrice),
          shouldPollResponse: true,
        })
        .then((output) => {
          console.log("Transaction is complete");
        })
        .catch((e) => {
          console.log(e.message);
        });
      this.setState({ notminted: getNotMintedAmount.toString() });
    } catch (e) {
      console.log("blnc", e);
    }
  };
  handleChange = (event) => {
    try {
      console.log("event");
      this.setState({
        selected: event.target.name,
      });
      this.setState({
        totalPrice: 30 * event.target.name,
      });
    } catch (e) {
      console.log("blnc", e);
    }
  };

  getBalanceOfAccount = async () => {
    try {
      let data = await window.tronWeb.trx.getAccount(this.state.mainAccount);
      let tronbalance;
      await window.tronWeb.trx.getBalance(
        this.state.mainAccount,
        function (err, res) {
          let blnc = parseInt(res) / 1000000;
          tronbalance = blnc;
        }
      );

      let contract = await window?.tronWeb.contract().at(contractAddress);
      const getNotMintedAmount = await contract.getNotMintedAmount().call();
      this.setState({ notminted: getNotMintedAmount.toString() });
    } catch (e) {
      console.log("blnc", e);
    }
  };

  componentDidMount() {
    setInterval(() => {
      this.loadWeb3();
      this.getBalanceOfAccount();
    }, 1000);
  }

  render() {
    return (
      <div className="officialLaunch">
        <div>
          <h4>OFFICIAL LAUNCH IN</h4>
          <div className="officialCountDown">
            <div className="officialCountDays">0 DAYS</div>
            <div className="officialCountHrs">0 HRS</div>
            <div className="officialCountMin">0 MIN</div>
            <div className="officialCountSec">0 SEC</div>
          </div>

          <div className="officialLaunchChoice">
            <div onClick={this.handleMint}>
              <span>MINT</span>
            </div>

            <div>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  name="1"
                  onClick={this.handleChange}
                >
                  1
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    name="2"
                    onClick={this.handleChange}
                    href="#"
                  >
                    2
                  </a>
                  <a
                    class="dropdown-item"
                    name="3"
                    onClick={this.handleChange}
                    href="#"
                  >
                    3
                  </a>
                  <a
                    class="dropdown-item"
                    name="4"
                    onClick={this.handleChange}
                    href="#"
                  >
                    4
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="officialLaunchEnd">
            <span>{this.state.totalPrice}</span>
            <span>{this.state.notminted} Left</span>
            <span>20 Max</span>
          </div>
        </div>
        <p id="demo"></p>
      </div>
    );
  }
}

export default OfficialLaunch;
