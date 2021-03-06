import React, { Component } from 'react';
import "../stylesheets/BgItem.css";
import axios from "../utils/axios";
import LazyLoad from 'react-lazy-load';

export default class BgItem extends Component {

  constructor(props){
    super(props);

    this.state = {
      error: null,
      loaded: false
    }
    this.chooseBackground = this.chooseBackground.bind(this);
    this.loadHandler = this.loadHandler.bind(this)
  }

  loadHandler() {
    this.setState({loaded:true})
  }

  chooseBackground() {
    // STEP 1 : SEND CHOSEN BACKGROUND TO THE BACKEND
    return axios({
      method: "POST",
      baseURL: process.env.REACT_APP_API,
			url: "/exhibition/create",
      data: {background_image: this.props.embedUrl}
    })
    // STEP 3 : WITH ACT ACCORDINGLY TO WHAT THE BACKEND SENT US
      .then(()=> {
        this.setState({error: ""});
        this.props.history.push("/images"); // to redirect
      })
      .catch((err)=> {
        this.setState({error: err.response.data.message});
        if (err.response.data.message === "Forbidden") {
          this.props.history.push("/login"); // to redirect
        }
      })
  }

  render() {
    return (
      <div className="BgItem">
        <LazyLoad>
          <iframe 
            height="250px" 
            scrolling="no" 
            style={{display: this.state.loaded ? "block": "none"}} 
            onLoad={this.loadHandler}
            src={this.props.embedUrl} 
            frameborder="0" 
            allowvr="yes" 
            allow="vr; xr; accelerometer; magnetometer; gyroscope; autoplay;" 
            allowfullscreen mozallowfullscreen="true" 
            webkitallowfullscreen="true" 
            onmousewheel="">
          </iframe>        
        </LazyLoad> 
        <button className="bg-btn" onClick={this.chooseBackground}>select</button>
      </div>
    )
  }

}