import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProf, getAllReviews } from "./api.js";
import "./Prof.css";

function debug(obj) {
  return (
    <div>
      <pre>
        {JSON.stringify(obj, null, 4)}
      </pre>
    </div>
  );
}

class Prof extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {},
      reviews: [],
      moduleDictionary: {},
      moduleFilter: "",
      tagList: [],
      tagCount: {},
      isOver: false,
      isProfData: false,
      isCommentsData: false
    };

    this.checkOver = this.checkOver.bind(this);
  }

  componentDidMount() {
    const profID = this.props.match.params.profID;
    getProf(profID).then(res => {
      this.setState({
        prof: res,
        isProfData: true,
        moduleDictionary: res.modules.reduce((obj, data, idx) => {
          obj[data[1]] = data[2];
          return obj;
        }, {})
      });
      this.checkOver();
    });
    getAllReviews(profID).then(res => {
      this.setState({
        reviews: res,
        isCommentsData: true,
        tagList: res.reduce((arr, data, idx) => {
          for (let tagIdx in data.tags) {
            let tag = data.tags[tagIdx];
            if(!(tag in arr)) {
              arr.push(tag);
            }
          }
          return arr;
        }, []),
        tagCount: res.reduce((obj, data, idx) => {
          for (let tagIdx in data.tags) {
            let tag = data.tags[tagIdx];
            if(tag in obj) {
              obj[tag]++;
            } else {
              obj[tag] = 1;
            }
          }
          return obj;
        }, {})
      });
      this.checkOver();
    });
  }
  
  checkOver() {
    if(this.state.isProfData && this.state.isCommentsData) {
      this.setState({
        isOver: true
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isOver;
  }

  componentDidUpdate() {
    console.log(this.state.prof);
    console.log(this.state.reviews);
    console.log(this.state.tagCount);
    if(this.state.isOver) {
      window.dispatchEvent(new Event('resize'));
      setTimeout(function(){
        window.dispatchEvent(new Event('resize'));
      }, 50);
    }
  }

  renderProfDetails() {
    const { id, first_name, last_name, department, rating } = this.state.prof;
    return (
      <div className="prof-details">
        <div className="col-12 col-sm-4 col-xl-3 prof-details__image">
          <img className="prof-photo" src={"/img/" + (first_name+" "+last_name).toLowerCase().split(" ").join("_") + ".jpg"}/>
        </div>

        <div className="col-12 col-sm-8 col-xl-9 prof-details__text prof-data">
          <div className="prof-data__name prof-page__font--tier-1">
            {first_name + " " + last_name}
          </div>
          <span className="prof-data__department prof-page__font--tier-3">
            {department}
          </span>
          <br/>
          <span className="prof-data__rating prof-rating  prof-page__font--tier-3">
            Average Rating:&nbsp;
            {this.renderStars(rating.toFixed(2))} (
            <span className="prof-rating__value">
              {rating}
            </span>)
          </span>
          <br/>
          <span className="prof-data__tags prof-page__font--tier-4">
            Related tags:
            <div className="prof-data__taglist font-size--xs">
              {this.state.tagList.map((tag)=> {
                return (
                  <span>
                    <span className="prof-data__tag">
                      {tag}({this.state.tagCount[tag]})
                    </span> &nbsp;
                  </span>
                );
              })}
            </div>
          </span>
        </div>
      </div>
    );
  }
  
  renderButtons() {
    const { id, first_name, last_name, department, rating } = this.state.prof;

    return (
        <div className="prof-buttons">
          <div className="col-6 prof-buttons__dropdown no_padding">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">CS1010X</a>
              <a className="dropdown-item" href="#">CS1101S</a>
              <a className="dropdown-item" href="#">CS3216</a>
            </div>
          </div>

          <div className="col-6 prof-buttons__rate">
            <Link to={`/profs/${id}/rate`}>
              <button type="button" className="btn btn-secondary">
                Rate This Prof!
              </button>
            </Link>
          </div>
        </div>
    );
  }
  
  renderFires(difficulty) {
    const darkFire = i => <i key={i+100} className="fab fa-hotjar fire--dark"></i>
    const brightFire = i => <i key={i+200} className="fab fa-hotjar fire--bright"></i>
    const style = { width: (difficulty * 20.0).toFixed(2) + '%' }
    return (
      <span className="rate-value">
        {[1, 2, 3, 4, 5].map(darkFire)}
        <span 
          className="rate-value--coloured fire--dark"
          style={style}
        >
          {[1, 2, 3, 4, 5].map(brightFire)}
        </span>
      </span>
    )
  }
  
  renderDifficulty(difficulty) {
    return (
      <div className="prof-comment__difficulty">
        <div className="col-5 col-md-4 prof-comment__overview-title">
          Difficulty
        </div>
        <div className="col-7 col-md-8 prof-comment__overview-content">
          :
          {this.renderFires(difficulty)}
        </div>
      </div>
    )
  }
  
  renderStars(rating) {
    const darkStar = i => <i key={i} className="fas fa-star star--dark"></i>
    const brightStar = i => <i key={i} className="fas fa-star star--bright"></i>
    const style = { width: (rating * 20.0).toFixed(2) + '%' }
    
    return (
      <span className="rate-value">
        {[1, 2, 3, 4, 5].map(darkStar)}
        <span className="rate-value--coloured" style={style}>
          {[1, 2, 3, 4, 5].map(brightStar)}
        </span>
      </span>
    )
  }
  
  renderRating(rating) {
    return (
      <div className="prof-comment__rating">
        <div className="col-5 col-md-4 prof-comment__overview-title">
          Rating
        </div>
        <div className="col-7 col-md-8 prof-comment__overview-content">
          :
          <span className="prof-rating">
            {this.renderStars(rating)}
          </span>
        </div>
      </div>
    )
  }
  
  renderReviewTags(tags) {
    const renderTag = tag => <span>
      <span className="prof-comment__tag">{tag}</span>
      &nbsp;
    </span>
    
    return (
      <div className="prof-comment__tags font-size--s background--grey">
        <div className="col-3 col-sm-2 prof-comment__tags-title">
          Tags:
        </div>
        <div className="col-9 col-sm-10 prof-comment__taglist font-size--xxs">
          {tags.map(renderTag)}
        </div>
      </div>
    )
  }
  
  renderReviewTitle(module) {
    return (
      <div className="prof-comment__module font-size--m background--grey">
          {module} "(TODO)"
      </div>
    )
  }
  
  renderReviewGrade(grade) {
    return (
      <div className="prof-comment__grade">
        <div className="col-5 col-md-4 prof-comment__overview-title">
          Grade
        </div>
        <div className="col-7 col-md-8 prof-comment__overview-content">
          : {"TODO" + grade}
        </div>
      </div>
    )
  }
  
  renderReviewVote(upvote, downvote) {
    return (
      <div className="col-5 prof-comment__vote">
        <span className="prof-comment__thumbs-up">
          <i className="fas fa-thumbs-up"></i>
        </span>
        <span className="prof-comment__upvoted">
          {upvote}
        </span>
        <span className="prof-comment__thumbs-down">
          <i className="fas fa-thumbs-down"></i>
        </span>
        <span className="prof-comment__downvoted">
          {downvote}
        </span>
      </div>
    )
  }
  
  renderReviewContent(content) {
    return (
      <div className="col-7 col-sm-8 prof-comment__essay font-size--xs">
        {content}
      </div>
    )
  }
  
  renderReviewTimestamp(time_posted) {
    return (
      <div className="col-7 prof-comment__timestamp font--grey">
        Created on {time_posted}
      </div>
    )
  }
  
  renderReview(review) {
    const {
      rating, difficulty, grade, content, time_posted,
      upvote, downvote, module, tags
    } = review;
    
    return (
      <div className="prof-comment background--lightgrey">
        {this.renderReviewTitle(module)}
        {this.renderReviewTags(tags)}
        <div className="prof-comment__details">
          <div className="col-5 col-sm-4 prof-comment__overview font-size--xs">
            {this.renderRating(rating)}
            {this.renderDifficulty(difficulty)}
            {this.renderReviewGrade(grade)}
          </div>
          {this.renderReviewContent(content)}
        </div>
        <div className="prof-comment__data font-size--xs">
          {this.renderReviewTimestamp(time_posted)}
          {this.renderReviewVote(upvote, downvote)}
        </div>
        {debug(review)}
      </div>
    )
  }
  
  renderReviews() {
    return (
      <div className="prof-commentlist">
        {this.state.reviews.map(this.renderReview.bind(this))}
      </div>
    )
  }

  render() {
    const { id, first_name, last_name, department, rating } = this.state.prof;
    return (
      <div className="page prof-page">
      {this.state.isOver ? (
          <div>
            {this.renderProfDetails()}
            {this.renderButtons()}
            {this.renderReviews()}
          </div>
        ) : (<div></div>)
      }
      </div>
    );
  }
}

export default Prof;
