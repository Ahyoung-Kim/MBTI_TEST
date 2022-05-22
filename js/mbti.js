const main = document.querySelector('#main')
const qna = document.querySelector('#qna')
const result = document.querySelector('#result')

const endPoint = 10;

const select = [0, 0, 0, 0, 0]

//3. qnaList[qIdx].a[idx].asnwer 답변 버튼 하나
function addAnswer(text, qIdx, idx){
  var a = document.querySelector('.aBox')
  var answer = document.createElement('button')

  //답변 버튼 세팅
  answer.classList.add('answerList');
  answer.classList.add('my-5');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer)
  answer.innerHTML = text;

  //답변을 클릭하면, 
  answer.addEventListener('click', function(){
    //현재 화면에 보이는 모든 답변들(answerList 클래스 가진 답변들)
    var children = document.querySelectorAll('.answerList');
    //fadeOut
    for(let i=0; i<children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = 'fadeOut 0.5s'
      children[i].style.animation = 'fadeOut 0.5s'
    }

    //0.45초 뒤에 다음 질문으로 넘기기 
    setTimeout(()=>{
      //선택한 답변의 타입을 select 배열에 추가하기
      // select[i], i: 0, 1, 2, 3
      var target = qnaList[qIdx].a[idx].type;
      for(let i=0; i<target.length; i++){
        select[target[i]] += 1;
      }

      //현재 답변들 지우고 다음 페이지로 
      for(let i=0; i<children.length; i++){
        children[i].style.display = 'none';
      }
      qaNext(++qIdx);
    }, 450)
  }, false)
}
// 무슨 유형인지 가져오기 위해
// select 배열에서 최댓값인 원소의 index 가져오기 
function calResult(){
  var result = select.indexOf(Math.max(...select))
  return result
}

//5. result 페이지 구성하기 
function setResult(){
  let point = calResult() //유형 index

  console.log(point)

  console.log(select)

  // 결과 인트로 
  const resultIntro = document.querySelector('.resultIntro')
  resultIntro.innerHTML = infoList[point].nameIntro;

  // 결과 유형 
  const resultName = document.querySelector('.resultName')
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img')
  var imgURL = 'img/image-'+point+'.png'
  const imgDiv = document.querySelector('#resultImg')

  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid')
  imgDiv.appendChild(resultImg);

  const title1 = document.querySelector('.resultDescTitle1')
  title1.innerHTML = infoList[point].descTitle1

  const desc1 = document.querySelector('.resultDesc1')
  desc1.innerHTML = infoList[point].desc1

  const title2 = document.querySelector('.resultDescTitle2')
  title2.innerHTML = infoList[point].descTitle2

  const desc2 = document.querySelector('.resultDesc2')
  desc2.innerHTML = infoList[point].desc2
}

//4. 마지막 페이지
function goResult(){
  // qna 지우고
  qna.style.WebkitAnimation = 'fadeOut 1s'
  qna.style.animation = 'fadeOut 1s'

  setTimeout(()=>{
    // result 보이기
    result.style.WebkitAnimation = 'fadeIn 1s'
    result.style.animation = 'fadeIn 1s'

    setTimeout(()=>{
      qna.style.display = 'none';
      result.style.display = 'block';
    }, 450)

  }, 450)

  //result 페이지 완성하러~
  setResult();
}

// 2
function qaNext(qIdx){
  // 마지막 질문이 끝나면 result 페이지로 
  if(qIdx === endPoint){
    goResult();
    return;
  }

  // qnaList에서 qIdx번째 질문 가져오기 
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  // 답변 리스트를 qnaList[qIdx].a 배열에 넣기 & 화면에 보이기 
  // a = [ {answer: '', type: [0, 1]}, {answer: '', type: []}, ...]
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i)
  }

  // 질문 카운트 바 
  var countStatusNum = document.querySelector('.countStatus');
  //현재 status 숫자는 (qIdx+1)/endPoint -> 현재페이지 / 마지막페이지
  // 첫번째 페이지면 1/10
  countStatusNum.innerHTML = (qIdx+1)+"/"+endPoint;

  //색깔 바 
  var status = document.querySelector('.statusBar');
  // width는 qna 대비 %로
  // 첫 번째 페이지면 (100/10)*(0+1) = 10*1 = 10%
  // 두 번째 페이지 (100/10)*(1+1)=10*2=20%
  status.style.width = (100/endPoint)*(qIdx+1)+'%';
}

// 1
function start(){ // 시작하기 버튼 누르면 실행됨
  // main 박스 숨기기
  //1. main 박스 fadeOut
  main.style.WebkitAnimation = 'fadeOut 1s'
  main.style.animation = 'fadeOut 1s'

  setTimeout(()=>{
    // qna 박스 나타내기
    //2. 0.45초 지나면 qna fadeIn
    qna.style.WebkitAnimation = 'fadeIn 1s'
    qna.style.animation = 'fadeIn 1s'

    //4. qna 박스 보이기 
    setTimeout(()=>{
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 450)

    // 3. qaNext() 호출
    let qIdx = 0;
    qaNext(qIdx);

  }, 450)
}