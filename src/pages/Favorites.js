import React, { Component } from 'react';
import axios from "../utils/axios";
import MainLayout from "../layout/MainLayout";
import ExhibitionItem from "../components/ExhibitionItem";
import "../stylesheets/Favorites.css";
import "../stylesheets/ExhibitionsList.css";
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Auth from "../utils/Auth";
const auth = new Auth();


export default class Favorites extends Component {

  constructor(props){
    super(props);

    this.state = { 
      exhibitions: [],
      error: null
    }
  }

  componentDidMount() {

    axios.get(`${process.env.REACT_APP_API}/exhibition/own-favorites`)
      .then((response)=>{
        this.setState({exhibitions:response.data})
      })
      .catch((error)=>{
        this.setState({error:error})
      })
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {

    let user = auth.getUser()
    let exhibitionImages = this.state.exhibitions.map((exhibition) => {
      let imgPath = ''
      if(exhibition.images.length) {
        imgPath = exhibition.images[0].imgPath
      } else {
        imgPath ="/images/default.jpg"
      }
      return (
        <div className="exhibition-details">
          <ExhibitionItem 
            key = {exhibition._id}
            id = {exhibition._id}
            name = {exhibition.name}
            description = {exhibition.description}
            creator = {exhibition.creator.username}
            image = {imgPath}
          />
        </div>
      )
    })

    return (
      <div>
        <MainLayout>
          <div className="FavoritesPage">
            {exhibitionImages.length > 0 ? 
            <React.Fragment>
              <h1>Here are your favorites, {user.username} !</h1>
              <div className="all-exhibitions-container">
                {exhibitionImages}
              </div>
              <button onClick={this.scrollToTop} className="scroll-btn">Up</button>
            </React.Fragment>
            :
            <h1 className="message-user">Hey {user.username}. You don't have any favorites for now. It's time to explore the gallery!</h1>
            }

          </div>
        </MainLayout>
      </div>
    )
  }
}

