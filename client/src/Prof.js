import React, { Component } from 'react';

class Prof extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <div className="prof_details_page padding_1">
          <div className="col-12 col-sm-4 prof_image">
            <img src="/img/anonymous.jpg"/>
          </div>

          <div className="col-12 col-sm-8 prof_details">
            <span className="prof_name font_large">
              Foo Bar
            </span>
            <br/>
            <span className="prof_departments font_medium">
              Department of Computer Science
            </span>
            <br/>
            <span className="prof_rating font_medium">
              Average Rating: <span className="prof_ratingvalue">4.85</span>
            </span>
            <br/>
            <span className="prof_tags font_lowermedium">
              Related tags: <span className="prof_taglist"></span>
            </span>
          </div>
        </div>

        <div className="prof_comment padding_1">
          <div className="col-0 col-sm-4 empty_whitespace">
          </div>

          <div className="col-12 col-sm-8 prof_commentbox grey_background">
            <div className="col-12 prof_commentgeneral">
            </div>
            <div className="col-12 prof_commentdetails">
            </div>
          </div> 
        </div>
        
      </div>
    );
  }
}

export default Prof;
