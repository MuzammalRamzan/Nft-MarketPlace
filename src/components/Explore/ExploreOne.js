import React, { Component } from "react";
import axios from "axios";
import { contractAddress, refDefaultAddress } from "../constant";

const initData = {
  pre_heading: "",
  heading: "My Mints",
  btn_1: "View All",
  btn_2: "Load More",
};

// const data = [
//     {
//         id: "1",
//         img: "./img/test.png",
//         title: "#1",
//         owner: "Richard",
//         price: "1.5 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "2",
//         img: "./img/test2 (1).png",
//         title: "#2",
//         owner: "John Deo",
//         price: "2.7 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "3",
//         img: "./img/test2 (2).png",
//         title: "#3",
//         owner: "Arham",
//         price: "2.3 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "4",
//         img: "./img/test2 (3).png",
//         title: "#4",
//         owner: "Yasmin",
//         price: "1.8 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "5",
//         img: "./img/test2 (4).png",
//         title: "#5",
//         owner: "Junaid",
//         price: "1.7 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "6",
//         img: "./img/test.png",
//         title: "Sports",
//         owner: "ArtNox",
//         price: "1.9 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "7",
//         img: "/img/auction_7.jpg",
//         title: "Cartoon Heroes",
//         owner: "Junaid",
//         price: "3.2 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "8",
//         img: "/img/auction_8.jpg",
//         title: "Gaming Chair",
//         owner: "Johnson",
//         price: "0.69 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "9",
//         img: "/img/auction_9.jpg",
//         title: "Photography",
//         owner: "Sara",
//         price: "2.3 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "10",
//         img: "/img/auction_10.jpg",
//         title: "Zed Run",
//         owner: "SpaceMan",
//         price: "3.7 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "11",
//         img: "/img/auction_11.jpg",
//         title: "Rare Tyres",
//         owner: "Monas",
//         price: "2.2 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     },
//     {
//         id: "12",
//         img: "/img/auction_12.jpg",
//         title: "World of Women",
//         owner: "Victor",
//         price: "4.3 ETH",
//         count: "1 of 1",
//         btnText: "Place a Bid"
//     }
// ]

class ExploreOne extends Component {
  // state = {
  //     initData: {},
  //     data: []
  // }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  loadWeb3 = async () => {
    let windows = {};
    let mainAccount;
    let isConnected = false;
    let connection;
    try {
      // console.log("log", window.tronWeb);
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

        console.log("mainAccount", mainAccount);
        this.fetchData();
        if (mainAccount) {
          if (isConnected === true) {
            let accountDetails = null;
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
  openDetails = async (e) => {
    try {
      localStorage.setItem("namecount", e.target.name);
      window.location.href = "/item-details";
    } catch (e) {
      console.log("blnc", e);
    }
  };
  fetchData = async () => {
    try {
      let windows = {};
      windows.tronWeb = await window.tronWeb;

      let main = localStorage.getItem("load");
      console.log("getmintedtoken", main);

      let balanceOff = localStorage.getItem("balanceOff");
      console.log("getmintedtoken", balanceOff);

      let newArr = [];

      for (let i = 1; i <= balanceOff; i++) {
        await axios
          .get(`https://sudeepojha.com.np/blockchain/api/v1/getjson/${i}`)
          .then((response) => {
            newArr.push(response.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
      this.setState({ data: newArr });
      console.log("response", newArr);
    } catch (e) {
      console.log("blnc", e);
    }
  };
  componentDidMount() {
    try {
      let mainArr = [];
      let maina = localStorage.getItem("newArr");
      mainArr.push(maina);

      console.log("getmintedtoken", maina);
      console.log("getmintedtoken", mainArr);
      console.log("getmintedtoken", typeof mainArr);
      this.setState({ data: mainArr });
      this.fetchData();
    } catch (e) {
      console.log("blnc", e);
    }
  }

  render() {
    return (
      <section className="explore-area load-more p-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <h3 className="mt-3 mb-0">My Mints</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row     ">
            {this.state.data.map((item) => {
              console.log("item", item);
              return (
                <div className="col-12 col-sm-6 col-lg-3 item">
                  <div className="card">
                    <div className="image-over">
                      <a onClick={this.openDetails}>
                        <img
                          className="card-img-top"
                          src={item.image}
                          value={item.edition}
                          name={item.edition}
                          // src="https://ipfs.io/ipfs/QmPLVWrCuW6Bp1s7G4djhsAKdRGMkkEGcw3Ss5ahhETcMA"
                          alt=""
                        />
                      </a>
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                      {/* Card Body */}
                      <div className="card-body">
                        <a onClick={this.openDetails}>
                          <h5 className="mb-0">{item.name}</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">
                Load More
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ExploreOne;
