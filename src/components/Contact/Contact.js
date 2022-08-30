import React, { Component } from "react";

import { contractAddress, refDefaultAddress } from "../constant";
const initData = {
  pre_heading: "Profile",
  heading: "Get In Touch",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainAccount: "",
      balance: "",
      mint: "",
      userBalance: "",
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
        console.log(
          "Tron is not installed, please install it on your browser to connect."
        );
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

  getBalanceOfAccount = async () => {
    try {
      let data = await window.tronWeb.trx.getAccount(this.state.mainAccount);
      let tronbalance;
      await window.tronWeb.trx.getBalance(
        "TJ3cWF1eh3tJdN2Eb51wYijAbJzjq4WKin",
        function (err, res) {
          let blnc = parseInt(res) / 1000000;
          tronbalance = blnc;
        }
      );

      let contract = await window?.tronWeb.contract().at(contractAddress);
      const balanceof = await contract.balanceOf(this.state.mainAccount).call();
      this.setState({ userBalance: balanceof.toString() });
      localStorage.setItem("balanceOff", balanceof.toString());
      this.setState({ balance: tronbalance });
    } catch (e) {
      console.log("blnc", e);
    }
  };

  componentDidMount() {
    this.setState({
      initData: initData,
    });
    setInterval(() => {
      this.loadWeb3();
      this.getBalanceOfAccount();
    }, 1000);
  }

  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              <form
                id="contact-form"
                className="item-form card no-hover"
                method="POST"
                action="assets/php/mail.php"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <span>Your Wallet</span>
                      <input
                        type="text"
                        value={this.state.mainAccount}
                        className="form-control"
                        name="Your Wallet"
                        placeholder="Your Wallet"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <span>Your Balance</span>
                      <input
                        type="email"
                        value={this.state.balance}
                        className="form-control"
                        name="email"
                        placeholder="0.00"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <span>Total Mint</span>
                      <input
                        type="text"
                        value={this.state.userBalance}
                        className="form-control"
                        name="totalMint"
                        placeholder="0"
                        required="required"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <p className="form-message" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
