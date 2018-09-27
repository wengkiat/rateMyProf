import React, { Component } from "react";
import { getProf, getAllTags, postReview } from "./api.js";
import "./Rate.css";

class Rate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {
        modules: []
      },
      tags: []
    };

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const profID = match.params.profID;
    getProf(profID).then(res => this.setState({ prof: res }));
    getAllTags().then(res => this.setState({ tags: res }));
  }

  renderProfName() {
    return (
      <div className="form-group">
        <label htmlFor="rate-form__name" className="font-size--m">
          {"Professor's Name"}
        </label>
        <input
          type="text"
          id="rate-form__name"
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
        <label htmlFor="rate-form__module" className="font-size--m">Module</label>
        <select className="form-control" id="rate-form__module">
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
        <label htmlFor="rate-prof__grade" className="font-size--m">Grades Obtained</label>
        <select className="form-control" id="rate-form__grade">
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
        <label htmlFor="rate-form__rating" className="font-size--m">{"Prof's Rating"}</label>
        <div className="rate-form__stars-container">
          <span className="rate-value">
            {
              [1, 2, 3, 4, 5].map(rate =>
                <i className="fas fa-star fa-3x rate-form__star star--dark" value={rate}></i>
              )
            }
            <span className="rate-value--coloured" id="rate-form__stars--coloured">
              {
                [1, 2, 3, 4, 5].map(rate =>
                  <i className="fas fa-star fa-3x rate-form__star--coloured star--bright" value={rate}></i>
                )
              }
            </span>
          </span>
        </div>
        <select className="form-control" id="rate--form__rating">
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
        <label htmlFor="rate-form__difficulty" className="font-size--m">{"Difficulty Level"}</label>
        <div className="rate-form__fires-container">
          <span className="rate-value">
            {
              [1, 2, 3, 4, 5].map(rate =>
                <i className="fab fa-hotjar fa-3x rate-form__fire fire--dark" value={rate}></i>
              )
            }
            <span className="rate-value--coloured" id="rate-form__fires--coloured">
              {
                [1, 2, 3, 4, 5].map(rate =>
                  <i className="fab fa-hotjar fa-3x rate-form__fire--coloured fire--bright" value={rate}></i>
                )
              }
            </span>
          </span>
        </div>
        <select className="form-control" id="rate--form__rating">
          {
            [1, 2, 3, 4, 5].map(rate =>
              <option value={rate}></option>
            )
          }
        </select>
      </div>
    );
  }

  renderTagInput() {
    return (
      <div className="form-group">
        <label className="font-size--m">Choose Tags</label>
        <div className="form-check rate-form__checkbox" id="rate-form__tags">
          <input className="form-check-input" type="checkbox" value="" id="rateTags_1"/>
          <input className="form-check-input" type="checkbox" value="" id="rateTags_2"/>
          <input className="form-check-input" type="checkbox" value="" id="rateTags_3"/>
          <input className="form-check-input" type="checkbox" value="" id="rateTags_4"/>
          <input className="form-check-input" type="checkbox" value="" id="rateTags_5"/>
        </div>
        <div className="rate-form__taglist">
          {
            this.state.tags.map(tag =>
              <span className="rate-form__tag">{tag.definition}</span>
            )
          }
        </div>
      </div>
    );
  }

  renderCommentInput() {
    return (
      <div className="form-group">
        <label htmlFor="rate-form__comment" className="font-size--m">Further Comments</label>
        <textarea type="textarea" rows={6} id="rate-form__comment" className="form-control" placeholder="Write down all your comments..." />
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    postReview(this.state.prof.id).then(res => alert(JSON.stringify(res)));
  }

  renderSubmitButton() {
    return (
      <button type="submit" class="btn rate-form__submit">
        Submit
      </button>
    );
  }

  render() {
    return (
      <div className="page">
        <div className="rate-form font-size--xl">
          Rate Your Prof!
        </div>

        <form onSubmit={this.onSubmit}>
          {this.renderProfName()}
          {this.renderModuleInput()}
          {this.renderGradeInput()}
          {this.renderRatingInput()}
          {this.renderDifficultyInput()}
          {this.renderTagInput()}
          {this.renderCommentInput()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}



export default Rate;
