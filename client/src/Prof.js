import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProf, getAllReviews, upvoteReview, downvoteReview } from "./api.js";
import "./Prof.css";

class Prof extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {},
      reviews: [],
      reviewsVote: {},
      moduleDictionary: {},
      moduleFilter: "",
      tagList: [],
      tagCount: {},
      isOver: false,
      isProfData: false,
      isCommentsData: false
    };

    this.checkOver = this.checkOver.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
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
            if(!(arr.includes(tag))) {
              arr.push(tag);
            }
          }
          return arr;
        }, []),
        tagCount: res.reduce((obj, data, idx) => {
          for (let tagIdx in data.tags) {
            let tag = data.tags[tagIdx];
            if(obj[tag]) {
              obj[tag]++;
            } else {
              obj[tag] = 1;
            }
          }
          return obj;
        }, {}),
        reviewsVote: res.reduce((obj, data, idx)=> {
          let reviewID = data.id;
          obj[reviewID.toString() + "1"] = 0;
          obj[reviewID.toString() + "0"] = 0;
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
    if(this.state.isOver) {
      window.dispatchEvent(new Event("resize"));
      setTimeout(function(){
        window.dispatchEvent(new Event("resize"));
      }, 50);
    }
  }

  handleFilter(event) {
    this.setState({moduleFilter:event.target.getAttribute("value")});
  }

  handleUpvote(event) {
    let postID = parseInt(event.target.getAttribute("value"));
    let voteMemo = this.state.reviewsVote;
    let key = postID.toString()+"1";
    if(!voteMemo[key]) {
      upvoteReview(postID);
      voteMemo[key] = 1;
      this.setState({reviewsVote: voteMemo});
    }
  }

  handleDownvote(event){
    let postID = parseInt(event.target.getAttribute("value"));
    let voteMemo = this.state.reviewsVote;
    let key = postID.toString()+"0";
    if(!voteMemo[key]) {
      downvoteReview(postID);
      voteMemo[key] = 1;
      this.setState({reviewsVote: voteMemo});
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
            {this.renderStars(rating)} (
            <span className="prof-rating__value">
              {rating.toFixed(2)}
            </span>)
          </span>
          <br/>
          <span className="prof-data__tags prof-page__font--tier-4">
            Related tags:
            <div className="prof-data__taglist font-size--xs">
              {this.state.tagList.map((tag, idx)=> {
                return (
                  <span>
                    <span className="prof-data__tag" value={idx}>
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
        <div className="col-6 prof-buttons__dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
              Filter
          </button>
          <div className="dropdown-menu dropdown-container" aria-labelledby="dropdownMenuButton">
            {this.state.prof.modules.map(module => {
              return (
                <div
                  className="dropdown-item dropdown-container__item"
                  href="#"
                  value={module[1]}
                  onClick={this.handleFilter}
                >
                  {module[1]}
                </div>
              );
            })}
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
    const darkFire = i => <i key={i+100} className="fab fa-hotjar fire--dark"></i>;
    const brightFire = i => <i key={i+200} className="fab fa-hotjar fire--bright"></i>;
    const style = { width: (difficulty * 20.0).toFixed(2) + "%" };
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
    );
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
    );
  }

  renderStars(rating) {
    const darkStar = i => <i key={i} className="fas fa-star star--dark"></i>;
    const brightStar = i => <i key={i} className="fas fa-star star--bright"></i>;
    const style = { width: (rating * 20.0).toFixed(2) + "%" };

    return (
      <span className="rate-value">
        {[1, 2, 3, 4, 5].map(darkStar)}
        <span className="rate-value--coloured" style={style}>
          {[1, 2, 3, 4, 5].map(brightStar)}
        </span>
      </span>
    );
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
    );
  }

  renderReviewTags(tags) {
    const renderTag = tag => <span>
      <span className="prof-comment__tag">{tag}</span>
      &nbsp;
    </span>;

    return (
      <div className="prof-comment__tags font-size--s background--grey">
        <div className="col-3 col-sm-2 prof-comment__tags-title">
          Tags:
        </div>
        <div className="col-9 col-sm-10 prof-comment__taglist font-size--xxs">
          {tags.map(renderTag)}
        </div>
      </div>
    );
  }

  renderReviewTitle(module) {
    return (
      <div className="prof-comment__module font-size--m background--grey">
        {module + " (" + this.state.moduleDictionary[module] + ")"}
      </div>
    );
  }

  renderReviewGrade(grade) {
    const gradeList = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"];
    return (
      <div className="prof-comment__grade">
        <div className="col-5 col-md-4 prof-comment__overview-title">
          Grade
        </div>
        <div className="col-7 col-md-8 prof-comment__overview-content">
          : {gradeList[grade-1]}
        </div>
      </div>
    );
  }

  renderReviewVote(upvote, downvote, id) {
    let voteMemo = this.state.reviewsVote;
    return (
      <div className="col-5 prof-comment__vote">
        <span className="prof-comment__thumbs-up">
          <i className="fas fa-thumbs-up" value={id} onClick={this.handleUpvote}></i>
        </span>
        <span className="prof-comment__upvoted">
          {upvote + voteMemo[id.toString()+"1"]}
        </span>
        <span className="prof-comment__thumbs-down" >
          <i className="fas fa-thumbs-down" value={id} onClick={this.handleDownvote}></i>
        </span>
        <span className="prof-comment__downvoted">
          {downvote + voteMemo[id.toString()+"0"]}
        </span>
      </div>
    );
  }

  renderReviewContent(content) {
    return (
      <div className="col-7 col-sm-8 prof-comment__essay font-size--xs">
        {content}
      </div>
    );
  }

  renderReviewTimestamp(time_posted) {
    return (
      <div className="col-7 prof-comment__timestamp font--grey">
        Created on {time_posted}
      </div>
    );
  }

  renderReview(review) {
    const {
      rating, difficulty, grade, content, time_posted,
      upvote, downvote, module, tags, id
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
          {this.renderReviewTimestamp(time_posted.split("T")[0])}
          {this.renderReviewVote(upvote, downvote, id)}
        </div>
      </div>
    );
  }

  renderReviews() {
    const filterElement = this.state.moduleFilter;
    return (
      <div className="prof-commentlist">
        {this.state.reviews.filter((review)=>{
          if(filterElement == "") {
            return true;
          } else {
            return review.module == filterElement;
          }
        }).map(this.renderReview.bind(this))}
      </div>
    );
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
