import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProf } from "./api.js";
import { getAllReview } from "./api.js";
import "./Prof.css";

class Prof extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {},
      isOver: false,
      isProfData: false,
      isCommentData: false
    };
  }

  componentWillMount() {
    const { match } = this.props;
    console.log(match.params.profID);
    // console.log(getAllReview(match.params.profID));
    getProf(match.params.profID)
      .then(res => {
        this.setState({
          prof: res,
          isProfData: true
        });
        this.checkOver();
      });
  }

  checkOver() {
    if(this.state.isProfData && this.state.isCommentData) {
      this.setState({
        isOver: true
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isOver;
  }

  renderStars(rating) {
    return (
      <span className="rate-value">
        {[1, 2, 3, 4, 5].map(i =>
          <i key={i} className="fas fa-star star--dark"></i>
        )}
        <span
          className="rate-value--coloured"
          style={{ width: (rating * 20.0).toFixed(2) + '%' }}
        >
          {[1, 2, 3, 4, 5].map(i =>
            <i key={i} className="fas fa-star star--bright"></i>
          )}
        </span>
      </span>
    )
  }

  renderFires(difficulty) {
    return (
      <span className="rate-value">
        {[1, 2, 3, 4, 5].map(i =>
          <i key={i} className="fab fa-hotjar fire--dark"></i>
        )}
        <span
          className="rate-value--coloured"
          style={{ width: (difficulty * 20.0).toFixed(2) + '%' }}
        >
          {[1, 2, 3, 4, 5].map(i =>
            <i key={i} className="fab fa-hotjar fire--bright"></i>
          )}
        </span>
      </span>
    )
  }

  renderTotalTags() {
    return (
      <div className="prof-data__taglist font-size--xs">
        <span className="prof-data__tag">HIGH WORKLOAD(1)</span> &nbsp;
        <span className="prof-data__tag">LIKE TO TORTURE(1)</span> &nbsp;
        <span className="prof-data__tag">YOU DIE? HE HAPPY(1)</span> &nbsp;
        <span className="prof-data__tag">BARELY BREATHING(1)</span> &nbsp;
        <span className="prof-data__tag">WANT TO S/U(1)</span> &nbsp;
        <span className="prof-data__tag">NICE PROF(1)</span> &nbsp;
        <span className="prof-data__tag">VERY FLEXIBLE(1)</span> &nbsp;
      </div>
    )
  }

  renderDetails(first_name, last_name, department, rating) {
    return (
      <div className="prof-details">
        <div className="col-12 col-sm-4 col-xl-3 prof-details__image">
          <img className="prof-photo" src={"/img/" + (first_name.toLowerCase() + " " + last_name.toLowerCase()).split(" ").join("_") + ".jpg"}/>
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
            {this.renderStars(2.5)} (
            <span className="prof-rating__value">
              {rating}
            </span>)
          </span>
          <br/>
          <span className="prof-data__tags prof-page__font--tier-4">
            Related tags:
            {this.renderTotalTags()}
          </span>
        </div>
      </div>
    )
  }

  renderComments() {
    return (
      <div className="prof-comment background--lightgrey">
        <div className="prof-comment__module font-size--m background--grey">
            CS3216 (Software Engineering Products for Digital Markets)
        </div>
        <div className="prof-comment__tags font-size--s background--grey">
          <div className="col-3 col-sm-2 prof-comment__tags-title">
            Tags:
          </div>
          <div className="col-9 col-sm-10 prof-comment__taglist font-size--xxs">
            <span className="prof-comment__tag">HIGH WORKLOAD</span> &nbsp;
            <span className="prof-comment__tag">LIKE TO TORTURE</span> &nbsp;
            <span className="prof-comment__tag">YOU DIE? HE HAPPY</span> &nbsp;
            <span className="prof-comment__tag">BARELY BREATHING</span> &nbsp;
            <span className="prof-comment__tag">WANT TO S/U</span> &nbsp;
          </div>
        </div>

        <div className="prof-comment__details">
          <div className="col-5 col-sm-4 prof-comment__overview font-size--xs">
            <div className="prof-comment__rating">
              <div className="col-5 col-md-4 prof-comment__overview-title">
                Rating
              </div>
              <div className="col-7 col-md-8 prof-comment__overview-content">
                :
                <span className="prof-rating">
                  {this.renderStars(3)}
                </span>
              </div>
            </div>

            <div className="prof-comment__difficulty">
              <div className="col-5 col-md-4 prof-comment__overview-title">
                Difficulty
              </div>
              <div className="col-7 col-md-8 prof-comment__overview-content">
                :
                {this.renderFires(2)}
              </div>
            </div>
            
            <div className="prof-comment__grade">
              <div className="col-5 col-md-4 prof-comment__overview-title">
                Grade
              </div>
              <div className="col-7 col-md-8 prof-comment__overview-content">
                : A
              </div>
            </div>
          </div>

          <div className="col-7 col-sm-8 prof-comment__essay font-size--xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </div>
        </div>

        <div className="prof-comment__data font-size--xs">
          <div className="col-7 prof-comment__timestamp font--grey">
            Created on 2018-07-20 11:59 PM
          </div>

          <div className="col-5 prof-comment__vote">
            <span className="prof-comment__thumbs-up">
              <i className="fas fa-thumbs-up"></i>
            </span>
            <span className="prof-comment__upvoted">
              25
            </span>
            <span className="prof-comment__thumbs-down">
              <i className="fas fa-thumbs-down"></i>
            </span>
            <span className="prof-comment__downvoted">
              7
            </span>
          </div>
        </div>

      </div>
    )
  }

  render() {
    const { id, first_name, last_name, department, rating } = this.state.prof;
    console.log(this.state.prof);
    return (
      <div className="page prof-page">
      { this.state.isOver ? (
          <div>
            {this.renderDetails(first_name, last_name, department, rating)}
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
                    Rate This Professor!
                  </button>
                </Link>
              </div>
            </div>

            <div className="prof-commentlist">
              {this.renderComments()}
            </div>
          </div>
        ) : (<div></div>)
      }
      </div>
    );
  }
}

export default Prof;
