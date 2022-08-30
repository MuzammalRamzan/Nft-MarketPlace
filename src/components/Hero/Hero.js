import React, { Component } from "react";

const initData = {
  pre_heading: "NetStorm",
  heading: "Discover, collect, and sell extraordinary NFTs",
  content: "Explore on the world's best & largest NFT marketplace",
  btn_1: "Explore",
  btn_2: "Create",
};

class Hero extends Component {
  state = {
    data: {},
  };
  componentDidMount() {
    this.setState({
      data: initData,
    });
  }
  render() {
    return (
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Hidden Warriors is now recruiting</h5>
              <h2>
                TRON’s first original generative NFT project, driven by DAOs and
                powered by true utility
              </h2>
              <p>
                Hidden Warriors is a collection of 3,000 unique NFTs fighting
                for Peace on the TRON blockchain. Our ninjas represent hope and
                unity for TRON token holders. MINTING BEGINS 9/10/21
              </p>
              <div className="heroExplore">
                <a href="#">Explore</a>
              </div>
            </div>
            <div className="col-md-6">
              <img src="./img/nft.png"></img>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
