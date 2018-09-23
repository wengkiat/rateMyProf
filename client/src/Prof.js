import React, { Component } from 'react';

class Prof extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <div className="prof_details_page padding_1">
          <div className="col-12 col-sm-4 col-xl-3 prof_image no_padding">
            <img src="/img/anonymous.jpg"/>
          </div>

          <div className="col-12 col-sm-8 col-xl-9 prof_details">
            <div className="prof_name font_large">
              Leong Wing Lup, Ben
            </div>
            <span className="prof_departments font_medium">
              Department of Computer Science
            </span>
            <br/>
            <span className="prof_rating font_medium">
              Average Rating:&nbsp; 
              <span className="prof_ratingstar">
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <i className="fas darker-star fa-star"></i>
                <span className="prof_ratingstars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </span>
              </span> (
              <span className="prof_ratingvalue">
                4.50
              </span>)
            </span>
            <br/>
            <span className="prof_tags font_lowermedium">
              Related tags: <span className="prof_taglist"></span>
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
                <div className="col-9 col-sm-10 prof_commenttaglist">
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
                <div className="col-9 col-sm-10 prof_commenttaglist">
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
