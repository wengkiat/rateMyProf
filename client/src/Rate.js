import React, { Component } from 'react';

class Rate extends Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div className="padding_1">
        <div className="rate font_uppermedium_content">
          Rate Your Prof!
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="rateProfName" className="font_lowermedium_content">Professor's Name</label>
            <input type="text" id="rateProfName" className="form-control" value="Leong Wing Lup, Ben" readOnly={true}/>
          </div>
          <div className="form-group">
            <label htmlFor="rateProfModule" className="font_lowermedium_content">Module</label>
            <select className="form-control" id="rateProfModule">
              <option>Select a module...</option>
              <option value={1}>CS1010X</option>
              <option value={2}>CS1101S</option>
              <option value={3}>CS3216</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rateProfGrade" className="font_lowermedium_content">Grades Obtained</label>
            <select className="form-control" id="rateProfGrade">
              <option>Select your grade...</option>
              <option value={1}>A+</option>
              <option value={2}>A</option>
              <option value={3}>A-</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rateProfRating" className="font_lowermedium_content">Prof's Rating</label>
            <div className="rate_starlist">
              <span className="rate_stars">
                <i className="fas darker-star fa-star fa-3x rate_star" value={1}></i>
                <i className="fas darker-star fa-star fa-3x rate_star" value={2}></i>
                <i className="fas darker-star fa-star fa-3x rate_star" value={3}></i>
                <i className="fas darker-star fa-star fa-3x rate_star" value={4}></i>
                <i className="fas darker-star fa-star fa-3x rate_star" value={5}></i>
                <span className="rate_stars_2" id="rateProfStars">
                  <i className="fas fa-star fa-3x rate_star" value={1}></i>
                  <i className="fas fa-star fa-3x rate_star" value={2}></i>
                  <i className="fas fa-star fa-3x rate_star" value={3}></i>
                  <i className="fas fa-star fa-3x rate_star" value={4}></i>
                  <i className="fas fa-star fa-3x rate_star" value={5}></i>
                </span>
              </span>
            </div>
            <select className="form-control" id="rateProfRating">
              <option value={1}></option>
              <option value={2}></option>
              <option value={3}></option>
              <option value={4}></option>
              <option value={5}></option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rateProfRating" className="font_lowermedium_content">Difficulty Level</label>
            <div className="rate_starlist">
              <span className="rate_fires">
                <i className="fab fa-hotjar fa-3x rate_fire" value={1}></i>
                <i className="fab fa-hotjar fa-3x rate_fire" value={2}></i>
                <i className="fab fa-hotjar fa-3x rate_fire" value={3}></i>
                <i className="fab fa-hotjar fa-3x rate_fire" value={4}></i>
                <i className="fab fa-hotjar fa-3x rate_fire" value={5}></i>
                <span className="rate_fires_2" id="rateProfFires">
                  <i className="fab fa-hotjar fa-3x rate_fire" value={1}></i>
                  <i className="fab fa-hotjar fa-3x rate_fire" value={2}></i>
                  <i className="fab fa-hotjar fa-3x rate_fire" value={3}></i>
                  <i className="fab fa-hotjar fa-3x rate_fire" value={4}></i>
                  <i className="fab fa-hotjar fa-3x rate_fire" value={5}></i>
                </span>
              </span>
            </div>
            <select className="form-control" id="rateProfDifficulty">
              <option value={1}></option>
              <option value={2}></option>
              <option value={3}></option>
              <option value={4}></option>
              <option value={5}></option>
            </select>
          </div>
          <div className="form-group">
            <label className="font_lowermedium_content">Choose Tags</label>
            <div className="form-check rate_tagscheckbox" id="rateProfTags">
              <input className="form-check-input" type="checkbox" value="" id="rateTags_1"/>
              <input className="form-check-input" type="checkbox" value="" id="rateTags_2"/>
              <input className="form-check-input" type="checkbox" value="" id="rateTags_3"/>
              <input className="form-check-input" type="checkbox" value="" id="rateTags_4"/>
              <input className="form-check-input" type="checkbox" value="" id="rateTags_5"/>
            </div>
            <div className="rate_taglist">
              <span className="rate_tag" id="rateTagDisplay_1">HORRIBLE PROF</span>
              <span className="rate_tag" id="rateTagDisplay_2">NICE PROF</span>
              <span className="rate_tag" id="rateTagDisplay_3">LIKE TO TORTURE</span>
              <span className="rate_tag" id="rateTagDisplay_4">HIGH WORKLOAD</span>
              <span className="rate_tag" id="rateTagDisplay_5">WANT TO S/U</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rateProfComment" className="font_lowermedium_content">Further Comments</label>
            <textarea type="textarea" rows={6} id="rateProfComment" className="form-control" placeholder="Write down all your comments..." />
          </div>
          <button type="submit" class="btn rate_submit">Submit</button>
        </form>
              
      </div>
    );
  }
}



export default Rate;
