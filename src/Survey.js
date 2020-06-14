import React,{Component} from 'react';
var firebase  = require('firebase');
var uuid = require('uuid');
var firebaseConfig = {
    apiKey: "AIzaSyBAHXAwcgtE_EDOmqiGtYRiFk3EBqmWVFM",
    authDomain: "surveyapp-16ec0.firebaseapp.com",
    databaseURL: "https://surveyapp-16ec0.firebaseio.com",
    projectId: "surveyapp-16ec0",
    storageBucket: "surveyapp-16ec0.appspot.com",
    messagingSenderId: "802101734844",
    appId: "1:802101734844:web:6ce6aa65ee2612913ccfb9",
    measurementId: "G-9E9VQFFK1R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class Survey extends Component{
    nameSubmit(event){
        var studentName = this.txtname.current.value;
        this.setState({studentName}, function(){
            console.log(this.state);
        });
    }
    answerselected(event){
        var answers = this.state.answers;
        if(event.target.name === 'answer1'){
            answers.answer1 = event.target.value;
        }else if(event.target.name === 'answer2'){
            answers.answer2 = event.target.value;
        }else if(event.target.name === 'answer3'){
            answers.answer3 = event.target.value;
        }
        this.setState({answers: answers}, function(){
            console.log(this.state);
        })

    }
    questionSubmit(){
         firebase.database().ref('survey'+this.state.uuid).set({
             studentName : this.state.studentName,
             answers : this.state.answers
         });
        this.setState({isSubmitted:true});
    }

    constructor(props){
        super(props);
        this.txtname = React.createRef();
         this.state = {
            uuid: uuid.v1(),
            
            studentName : '',
            answers : {
                answer1 : '',
                answer2 : '',
                answer3 : ''
            },
            isSubmitted : false
        }
        this.nameSubmit = this.nameSubmit.bind(this);
        this.answerselected = this.answerselected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
    }
    
    render(){
        var studentName;
        var questions ;

        if(this.state.studentName === '' && this.state.isSubmitted===false){

            studentName = <div>
                <h1>Hello Student , let us know your name ?</h1>
                <form onSubmit={this.nameSubmit}>
                    <input type="text" className="namy" placeholder="Enter your name" ref={this.txtname} />
                </form>
            </div>;
            questions = '';

        }else if(this.state.studentName !=='' && this.state.isSubmitted === false){
            studentName = <div>
                <h1>Hello {this.state.studentName}, Wellcome to the survey-app </h1>
            </div>;
            questions = <div>
                <h2>Here are some questions : </h2>
                <form onSubmit={this.questionSubmit}>
                <div className="card">
                    
                    <label>what kind of courses you like the most : </label><br/>
                    <input type="radio" name="answer1" value="Technology" onChange={this.answerselected} />Technology
                    <input type="radio" name="answer1" value="Design" onChange={this.answerselected} />Design
                    <input type="radio" name="answer1" value="Marketing" onChange={this.answerselected} />Marketing
                
                </div>

                <div className="card">
                    
                    <label>You are : </label><br/>
                    <input type="radio" name="answer2" value="Student" onChange={this.answerselected} />Student
                    <input type="radio" name="answer2" value="in-job" onChange={this.answerselected} />in-job
                    <input type="radio" name="answer2" value="looking-job" onChange={this.answerselected} />looking-job
                
                </div>

                <div className="card">
                    
                    <label>Is online learning helpful : </label><br/>
                    <input type="radio" name="answer3" value="yes" onChange={this.answerselected} />yes
                    <input type="radio" name="answer3" value="no" onChange={this.answerselected} />no
                    <input type="radio" name="answer3" value="maybe" onChange={this.answerselected} />maybe
                
                </div>

                <input type="submit" className="feedback-button" value="submit" ></input>
                <br /><br /><br /><br />
                </form>
            </div>;

        }else if(this.state.studentName !=='' && this.state.isSubmitted){
            studentName = <div>
                <h1>Thank you, {this.state.studentName}</h1>
            </div>;
            questions = '';
        }

        return (
            <div>
                {studentName}
                <br></br>
                <hr className="line"/>
                <br></br>
                {questions}
            </div>
        );
    }
}

export default Survey;