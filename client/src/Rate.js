import React, { Component } from "react";
import { getProf, getAllTags, postReview, getGradeList} from "./api.js";
import "./Rate.css";

class Rate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prof: {
        modules: []
      },
      tags: [],
      tagsChosen: [],
      grades: [],
      rating: 0,
      difficulty: 0,
      isOver: false,
      isProfData: false,
      isTagData: false,
      isGradeData: false,
      isOver: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkOver = this.checkOver.bind(this);
    this.handleClickRating = this.handleClickRating.bind(this);
    this.handleClickDifficulty = this.handleClickDifficulty.bind(this);
    this.handleClickTag = this.handleClickTag.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const profID = match.params.profID;
    getProf(profID).then(res => {
      this.setState({ 
        prof: res,
        isProfData: true
      });
      this.checkOver();
    });
    getAllTags().then(res => {
      this.setState({ 
        tags: res,
        tagsChosen: res.map(x=>false),
        isTagData: true
      });
      this.checkOver();
    });
    getGradeList().then(res => {
      this.setState({ 
        grades: res,
        isGradeData: true
      });
      this.checkOver();
    });
  }

  checkOver() {
    if(this.state.isProfData && this.state.isTagData && this.state.isGradeData) {
      this.setState({
        isOver: true
      });
      console.log(this.state.grades);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.isOver;
  }
  
  handleClickRating(event) {
    let newValue = event.target.getAttribute("value");
    this.setState({
      rating: parseInt(newValue)
    });

  }

  handleClickDifficulty(event) {
    let newValue = event.target.getAttribute("value");
    this.setState({
      difficulty: parseInt(newValue)
    });
  }

  handleClickTag(event) {
    let idx = parseInt(event.target.getAttribute("value")) - 1;
    let tagsState = this.state.tagsChosen;
    tagsState[idx] = !tagsState[idx];
    this.setState({
      tagsChosen: tagsState
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    let ratingGiven = this.state.rating;
    let difficultyGiven = this.state.difficulty;
    let gradeObtained = document.getElementById("rate-form__grade").options.selectedIndex;
    let tagsGiven = this.state.tagsChosen.map((val, idx)=>val ? idx+1 : 0).filter((val) => val);
    let commentGiven = document.getElementById("rate-form__comment").value;

    let moduleList = document.getElementById("rate-form__module");
    let moduleTakenIdx = moduleList.options.selectedIndex;
    let moduleTaken = moduleTakenIdx ? moduleList.options[moduleTakenIdx].value : "-1";

    let isRatingFilled = ratingGiven != 0;
    let isDifficultyFilled = difficultyGiven != 0;
    let isModuleFilled = moduleTaken != "-1";
    let isGradeFilled = gradeObtained != 0;

    if (isRatingFilled && isDifficultyFilled && isModuleFilled && isGradeFilled) {
      postReview({
        "prof_id": this.state.prof.id,
        "rating": ratingGiven.toString(),
        "difficulty": difficultyGiven.toString(),
        "module": moduleTaken.toString(),
        "grade": gradeObtained.toString(),
        "tags": tagsGiven,
        "content": commentGiven
      })
        .then(res => {
          window.location.replace("/profs/" + this.state.prof.id)
        });
    } else {
      alert("Please fill everything first!");
    }
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
          <option selected disabled value="0">Select a module...</option>
          {
            this.state.prof.modules.map(module => {
              return (
                <option value={module[0]}>
                  {module[1] + " (" + module[2] + ")"}
                </option>
              );
            })
          }
        </select>
      </div>
    );
  }

  renderGradeInput() {
    const gradeList = this.state.grades.map(grade=>grade.score);
    return(
      <div className="form-group">
        <label htmlFor="rate-form__grade" className="font-size--m">Grades Obtained</label>
        <select className="form-control" id="rate-form__grade">
          <option selected disabled value="0">Select your grade...</option>
          {
            gradeList.map((grade, idx) =>
              <option value={idx+1}>{grade}</option>
            )
          }
        </select>
      </div>
    );
  }

  renderRatingInput() {
    const starWidth = { width: (this.state.rating * 20.0).toFixed(2) + '%' }
    return (
      <div className="form-group">
        <label className="font-size--m">{"Prof's Rating"}</label>
        <div className="rate-form__stars-container">
          <span className="rate-value">
            {
              [1, 2, 3, 4, 5].map(rate =>
                <i className="fas fa-star fa-3x rate-form__star star--dark" onClick={this.handleClickRating} value={rate}></i>
              )
            }
            <span className="rate-value--coloured" style={starWidth} id="rate-form__stars--coloured">
              {
                [1, 2, 3, 4, 5].map(rate =>
                  <i className="fas fa-star fa-3x rate-form__star--coloured star--bright" onClick={this.handleClickRating} value={rate}></i>
                )
              }
            </span>
          </span>
        </div>
      </div>
    );
  }

  renderDifficultyInput() {
    const fireWidth = { width: (this.state.difficulty * 20.0).toFixed(2) + '%' }
    return (
      <div className="form-group">
        <label className="font-size--m">{"Difficulty Level"}</label>
        <div className="rate-form__fires-container">
          <span className="rate-value">
            {
              [1, 2, 3, 4, 5].map(rate =>
                <i className="fab fa-hotjar fa-3x rate-form__fire fire--dark" onClick={this.handleClickDifficulty} value={rate}></i>
              )
            }
            <span className="rate-value--coloured" style={fireWidth} id="rate-form__fires--coloured">
              {
                [1, 2, 3, 4, 5].map(rate =>
                  <i className="fab fa-hotjar fa-3x rate-form__fire--coloured fire--bright" onClick={this.handleClickDifficulty} value={rate}></i>
                )
              }
            </span>
          </span>
        </div>
      </div>
    );
  }

  renderTagInput() {
    const chosenStyle = {backgroundColor: "#A7ECF6"};
    const rejectedStyle = {backgroundColor: "#EDEDED"};
    return (
      <div className="form-group">
        <label className="font-size--m">Choose Tags</label>
        <div className="rate-form__taglist">
          {
            this.state.tags.map((tag, idx) =>
              <span className="rate-form__tag" onClick={this.handleClickTag} style={this.state.tagsChosen[idx] ? chosenStyle : rejectedStyle} value={tag.id}>{tag.definition}</span>
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

  renderSubmitButton() {
    return (
      <button type="submit" className="btn rate-form__submit">
        Submit
      </button>
    );
  }

  render() {
    return (
      <div className="page">
      {this.state.isOver ? (
          <div>
            <div className="rate-form font-size--xl">
              Rate Your Prof!
            </div>
            <form onSubmit={this.handleSubmit}>
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
        ) : (
          <div className="loading-screen--logo">
          </div>
        )}
      }
      </div>
    );
  }
}



export default Rate;
