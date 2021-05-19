// creating an array and passing the number, questions, options, and answers
let questions = []

console.log(questions)

function hideloader() {
    document.getElementById('preloaderbody').style.display = 'none';
}

var api_url = new URL("https://opentdb.com/api.php?");
console.log(api_url);
const params = new URLSearchParams(document.location.search);
params.forEach((value, key) => {
      if (value != "any") {
        console.log(value);
        api_url.searchParams.append(key, value);
      }
});


function api_fetch(api_url){

fetch(api_url)
  .then(res => res.json())
  .then((results) => {
    data=results;
    var qindex=1;

    myarr=data['results']
    questions=[]
    myarr.forEach(element => {
      ques={}
      ques.numb=qindex;
      ques.question=element.question;
      answer=element.correct_answer;
      options=element.incorrect_answers;
      options.push(answer);
      ques.answer=answer;
      ques.options=options;
      questions.push(ques)
      qindex++;
    });
    console.log(questions);
    hideloader();
    return questions;
  })
}

api_fetch(api_url);

