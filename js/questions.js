// creating an array and passing the number, questions, options, and answers
let questions = []

function hideloader() {
    document.getElementById('preloaderbody').style.display = 'none';
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var api_url = new URL("https://opentdb.com/api.php?");

const params = new URLSearchParams(document.location.search);
params.forEach((value, key) => {
      if (value != "any") {
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
      shuffle(options);
      ques.answer=answer;
      ques.options=options;
      questions.push(ques)
      qindex++;
    });
    console.log("Fetching api done");
    hideloader();
    return questions;
  })
}

api_fetch(api_url);

