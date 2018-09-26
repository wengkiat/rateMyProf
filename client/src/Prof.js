import React, { Component } from "react";
import { getProf } from "./api.js";
import "./Prof.css";

class Prof extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {}
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match.params.profID);
    getProf(match.params.profID)
      .then(res => {
        console.log(38495734);
        console.log(res);
        this.setState({prof: res});
      });
  }

  renderStars() {
    return (
      <span className="prof-rating__star">
        <i className="fas darker-star fa-star"></i>
        <i className="fas darker-star fa-star"></i>
        <i className="fas darker-star fa-star"></i>
        <i className="fas darker-star fa-star"></i>
        <i className="fas darker-star fa-star"></i>
        <span className="prof-rating__star-coloured">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </span>
      </span>
    )
  }

  render() {
    const { id, first_name, last_name, department, rating } = this.state.prof;
    return (
      <div className="page">
        <div className="prof-details">
          <div className="col-12 col-sm-4 col-xl-3 prof-details__image">
            <img className="prof-photo" src="/img/anonymous.jpg"/>
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
              {this.renderStars()} (
              <span className="prof-data__rating-value">
                {rating}
              </span>)
            </span>
            <br/>
            <span className="prof_main_tags prof-page__font--tier-4">
              Related tags:
              <div className="prof_taglist font_lowersmall_content">
                <span className="prof_main_tag">HIGH WORKLOAD(1)</span> &nbsp;
                <span className="prof_main_tag">LIKE TO TORTURE(1)</span> &nbsp;
                <span className="prof_main_tag">YOU DIE? HE HAPPY(1)</span> &nbsp;
                <span className="prof_main_tag">BARELY BREATHING(1)</span> &nbsp;
                <span className="prof_main_tag">WANT TO S/U(1)</span> &nbsp;
                <span className="prof_main_tag">NICE PROF(1)</span> &nbsp;
                <span className="prof_main_tag">VERY FLEXIBLE(1)</span> &nbsp;
              </div>
            </span>
          </div>
        </div>

        <div className="prof_buttons padding_1">
          <div className="col-6 prof_dropdown no_padding">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">CS1010X</a>
              <a className="dropdown-item" href="#">CS1101S</a>
              <a className="dropdown-item" href="#">CS3216</a>
            </div>
          </div>

          <div className="col-6 prof_rate no_padding">
            <button type="button" className="btn btn-secondary">Rate This Professor!</button>
          </div>
        </div>

        <div className="prof_commentlist">

          <div className="prof_comment padding_1">
            <div className="col-12 prof_commentbox lightgrey_background no_padding">

              <div className="col-12 prof_commentmodule font_lowermedium_content grey_background">
                  CS3216 (Software Engineering Products for Digital Markets)
              </div>

              <div className="col-12 prof_commenttags font_small_content no_padding grey_background">
                <div className="col-3 col-sm-2 prof_tags no_padding">
                  Tags:
                </div>
                <div className="col-9 col-sm-10 prof_commenttaglist font_mini_content">
                  <span className="prof_tag">HIGH WORKLOAD</span> &nbsp;
                  <span className="prof_tag">LIKE TO TORTURE</span> &nbsp;
                  <span className="prof_tag">YOU DIE? HE HAPPY</span> &nbsp;
                  <span className="prof_tag">BARELY BREATHING</span> &nbsp;
                  <span className="prof_tag">WANT TO S/U</span> &nbsp;
                </div>
              </div>

              <div className="col-12 prof_commentdetails no_padding ">

                <div className="col-5 col-sm-4 prof_commentoverview font_lowersmall_content">
                  <div className="prof_commentrating">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Rating
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      :
                      <span className="prof_comment_ratingstar">
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <span className="prof_comment_ratingstars" id="prof_comment_ratingstars_1">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="prof_commentdifficulty">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Difficulty
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      :
                      <span className="prof_comment_difficultystar">
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <span className="prof_comment_difficultystars" id="prof_comment_difficultystars_1">
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="prof_commentgrade">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Grade
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      : A
                    </div>
                  </div>
                </div>

                <div className="col-7 col-sm-8 prof_commentessay font_lowersmall_content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
              </div>

              <div className="col-12 prof_commentsidentity font_lowersmall_content">
                <div className="col-7 prof_commentstimestamp grey_font no_padding">
                  Created on 2018-07-20 11:59 PM
                </div>
                <div className="col-5 prof_commentsupdownvote">
                  <span className="prof_commentsthumbsup">
                    <i className="fas fa-thumbs-up"></i>
                  </span>
                  <span className="prof_commentsupvoted">
                    25
                  </span>
                  <span className="prof_commentsthumbsdown">
                    <i className="fas fa-thumbs-down"></i>
                  </span>
                  <span className="prof_commentsdownvoted">
                    7
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="prof_comment padding_1">
            <div className="col-12 prof_commentbox lightgrey_background no_padding">

              <div className="col-12 prof_commentmodule font_lowermedium_content grey_background">
                  CS3216 (Software Engineering Products for Digital Markets)
              </div>

              <div className="col-12 prof_commenttags font_small_content no_padding grey_background">
                <div className="col-3 col-sm-2 prof_tags no_padding">
                  Tags:
                </div>
                <div className="col-9 col-sm-10 prof_commenttaglist font_mini_content">
                  <span className="prof_tag">NICE PROF</span> &nbsp;
                  <span className="prof_tag">VERY FLEXIBLE</span> &nbsp;
                </div>
              </div>

              <div className="col-12 prof_commentdetails no_padding">

                <div className="col-5 col-sm-4 prof_commentoverview font_lowersmall_content">
                  <div className="prof_commentrating">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Rating
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      :
                      <span className="prof_comment_ratingstar">
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <i className="fas darker-star fa-star"></i>
                        <span className="prof_comment_ratingstars" id="prof_comment_ratingstars_2">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="prof_commentdifficulty">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Difficulty
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      :
                      <span className="prof_comment_difficultystar">
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <i className="fab fa-hotjar"></i>
                        <span className="prof_comment_difficultystars" id="prof_comment_difficultystars_2">
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                          <i className="fab fa-hotjar"></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="prof_commentgrade">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Grade
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      : A+
                    </div>
                  </div>
                </div>

                <div className="col-7 col-sm-8 prof_commentessay font_lowersmall_content">
                  Amazing prof!
                </div>
              </div>

              <div className="col-12 prof_commentsidentity font_lowersmall_content">
                <div className="col-7 prof_commentstimestamp grey_font no_padding">
                  Created on 2018-09-20 12:40 AM
                </div>
                <div className="col-5 prof_commentsupdownvote">
                  <span className="prof_commentsthumbsup">
                    <i className="fas fa-thumbs-up"></i>
                  </span>
                  <span className="prof_commentsupvoted">
                    13
                  </span>
                  <span className="prof_commentsthumbsdown">
                    <i className="fas fa-thumbs-down"></i>
                  </span>
                  <span className="prof_commentsdownvoted">
                    2
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default Prof;
