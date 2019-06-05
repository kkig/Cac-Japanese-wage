const start = document.querySelector('#start');
const end = document.querySelector('#end');
const lunchS = document.querySelector('#lunchS');
const lunchE = document.querySelector('#lunchE');

const startTwo = document.querySelector('#startTwo');
const endTwo = document.querySelector('#endTwo');
const lunchSrtTwo = document.querySelector('#lunchSTwo');
const lunchEndTwo = document.querySelector('#lunchETwo');

const earning = document.querySelector('#earning');

//find out hour for one shift
function getWorkLength(startTime, endTime, lunchStart, lunchEnd) {

  const totalHour = Date.parse(endTime) - Date.parse(startTime);
  const totalLunch = Date.parse(lunchEnd) - Date.parse(lunchStart);
  let totalMinute;

  if(totalHour < 0 || isNaN(totalHour)) {
    totalMinute = 0;
  } else if(totalLunch < 0 || isNaN(totalLunch)) {
    totalMinute = (totalHour / 1000) / 60;
  } else {
    totalMinute = ((totalHour / 1000) / 60) - ((totalLunch / 1000) / 60);
  }

  const minutes = (totalMinute % 60);
  const hour = (totalMinute / 60);

  return {
    'total': totalMinute,
    'minutes': minutes,
    'hour': hour
  };
}

//Get hour for each shift
const hoursTotal = (shiftStart, shiftEnd, lunchTime, lunchFinish) => {

  const startTime = shiftStart.value;
  const endTime = shiftEnd.value;
  const lunchStart = lunchTime.value;
  const lunchEnd = lunchFinish.value;
  const hoursOne = getWorkLength(startTime, endTime, lunchStart, lunchEnd);

  return hoursOne.total;
}

//get wage and display comment
const wage = document.querySelector('#wage');
const result = document.querySelector('#result');
const comment = document.querySelector('.comment');

//calculate wage
function getWage() {
  const hourlyWage = wage.value;
  const totalOne = hoursTotal(start, end, lunchS, lunchE);
  const totalTwo = hoursTotal(startTwo, endTwo, lunchSrtTwo, lunchEndTwo);

  const totalTime = totalOne + totalTwo;
  const workHour = totalTime / 60;
  const plusWage = hourlyWage * 1.25;

  // legal work minute = 8 * 60 = 480 minutes
  if(!hourlyWage) {

    earning.innerHTML = '時給を入力してください！';

  } else if(workHour >= 0) {

    if(workHour <= 8) {
      let totalWage = hourlyWage * workHour;

      result.innerHTML = '労働時間： ' + workHour + '時間';
      earning.innerHTML = 'お給料：' + totalWage + '円';

    } else {
      const overTime = workHour - 8;
      totalWage = (8 * hourlyWage) + overTime * plusWage;

      result.innerHTML =
      '労働時間： 法定内 ' + 8 + '時間　+' + '　時間外 ' + overTime + '時間';
      earning.innerHTML = 'お給料：' + totalWage + '円';

    }

    comment.innerHTML = 'お疲れ様でしたー！';

  } else {
    earning.innerHTML = 'エラーです。入力情報を見直してください。';
  }

}

const button = document.querySelector('#button');
button.onclick = e => {
  e.preventDefault();

  getWage();
}
