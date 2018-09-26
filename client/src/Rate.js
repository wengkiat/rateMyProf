import React, { Component } from "react";
import { getProf } from "./api.js";

class Rate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {
        modules: []
      }
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const profID = match.params.profID;
    getProf(profID)
      .then(res => {
        console.log(res);
        this.setState({ prof: res });
      });
  }

  renderProfName() {
    return (
      <div className="form-group">
        <label htmlFor="rateProfName" className="font_lowermedium_content">
          {"Professor's Name"}
        </label>
        <input
          type="text"
          id="rateProfName"
          className="form-control"
          value={this.state.prof.first_name + " " + this.state.prof.last_name}
          readOnly={true}
        />
      </div>
    );
  }

  renderModuleInput() {
    return (
      <div className="form-group">
        <label htmlFor="rateProfModule" className="font_lowermedium_content">Module</label>
        <select className="form-control" id="rateProfModule">
          <option>Select a module...</option>
          {
            this.state.prof.modules.map(module => {
              return (
                <option value={module[0]}>
                  {module[0] + " " + module[1]}
                </option>
              );
            })
          }
        </select>
      </div>
    );
  }

  renderGradeInput() {
    const gradeList = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];
    return(
      <div className="form-group">
        <label htmlFor="rateProfGrade" className="font_lowermedium_content">Grades Obtained</label>
        <select className="form-control" id="rateProfGrade">
          <option>Select your grade...</option>
          {
            gradeList.map(grade =>
              <option value={grade}>{grade}</option>
            )
          }
        </select>
      </div>
    );
  }

  renderRatingInput() {
    return (
      <div className="form-group">
        <label htmlFor="rateProfRating" className="font_lowermedium_content">{"Prof's Rating"}</label>
        <div className="rate_starlist">
          <span className="rate_stars">
            {
              [1, 2, 3, 4, 5].map(rate =>
                <i className="fas darker-star fa-star fa-3x rate_star" value={rate}></i>
              )
            }
            <span className="rate_stars_2" id="rateProfStars">
              {
                [1, 2, 3, 4, 5].map(rate =>
                  <i className="fas fa-star fa-3x rate_star" value={rate}></i>
                )
              }
            </span>
          </span>
        </div>
        <select className="form-control" id="rateProfRating">
          {
            [1, 2, 3, 4, 5].map(rate =>
              <option value={rate}></option>
            )
          }
        </select>
      </div>
    );
  }

  renderDifficultyInput() {
    return (
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
    );
  }

  renderTagInput() {
    return (
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
    );
  }

  renderCommentInput() {
    return (
      <div className="form-group">
        <label htmlFor="rateProfComment" className="font_lowermedium_content">Further Comments</label>
        <textarea type="textarea" rows={6} id="rateProfComment" className="form-control" placeholder="Write down all your comments..." />
      </div>
    );
  }

  render() {
    return (
      <div className="padding_1">
        <div className="rate font_uppermedium_content">
          Rate Your Prof!
        </div>

        <form>
          {this.renderProfName()}
          {this.renderModuleInput()}
          {this.renderGradeInput()}
          {this.renderRatingInput()}
          {this.renderDifficultyInput()}
          {this.renderTagInput()}
          {this.renderCommentInput()}
          <button type="submit" class="btn rate_submit">Submit</button>
        </form>
      </div>
    );
  }
}



export default Rate;
