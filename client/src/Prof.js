import React, { Component } from 'react';

class Prof extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <div className="prof_details_page padding_1">
          <div className="col-12 col-sm-4 col-xl-3 prof_image">
            <img src="/img/anonymous.jpg"/>
          </div>

          <div className="col-12 col-sm-8 col-xl-9 prof_details">
            <span className="prof_name font_large">
              Foo Bar
            </span>
            <br/>
            <span className="prof_departments font_medium">
              Department of Computer Science
            </span>
            <br/>
            <span className="prof_rating font_medium">
              Average Rating: <span className="prof_ratingvalue">4.85 / 5.00</span>
            </span>
            <br/>
            <span className="prof_tags font_lowermedium">
              Related tags: <span className="prof_taglist"></span>
            </span>
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

                <div className="col-4 prof_commentoverview font_lowersmall_content">
                  <div className="prof_commentrating">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Rating
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      : 4.5 / 5.0
                    </div>
                  </div>
                  <div className="prof_commentdifficulty">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Difficulty
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      : 5.0 / 5.0
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

                <div className="col-8 prof_commentessay font_lowersmall_content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </div>
              </div>

              <div className="col-12 prof_commentsidentity font_lowersmall_content">
                <div className="col-7 prof_commentstimestamp grey_font no_padding">
                  Created on 2018-07-20 11:59 PM
                </div>
                <div className="col-5 prof_commentsupdownvote">
                  <span className="prof_commentsthumbsup">
                    <i class="fas fa-thumbs-up"></i>
                  </span>
                  <span className="prof_commentsupvoted">
                    25
                  </span>
                  <span className="prof_commentsthumbsdown">
                    <i class="fas fa-thumbs-down"></i>
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

                <div className="col-4 prof_commentoverview font_lowersmall_content">
                  <div className="prof_commentrating">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Rating
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      : 2.5 / 5.0
                    </div>
                  </div>
                  <div className="prof_commentdifficulty">
                    <div className="col-5 col-md-4 prof_commentoverviewtitle">
                      Difficulty
                    </div>
                    <div className="col-7 col-md-8 prof_commentoverviewcontent">
                      : 3.0 / 5.0
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

                <div className="col-8 prof_commentessay font_lowersmall_content">
                  Amazing prof!
                </div>
              </div>

              <div className="col-12 prof_commentsidentity font_lowersmall_content">
                <div className="col-7 prof_commentstimestamp grey_font no_padding">
                  Created on 2018-09-20 12:40 AM
                </div>
                <div className="col-5 prof_commentsupdownvote">
                  <span className="prof_commentsthumbsup">
                    <i class="fas fa-thumbs-up"></i>
                  </span>
                  <span className="prof_commentsupvoted">
                    13
                  </span>
                  <span className="prof_commentsthumbsdown">
                    <i class="fas fa-thumbs-down"></i>
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
