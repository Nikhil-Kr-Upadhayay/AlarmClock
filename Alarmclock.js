// Get the necessary elements from the DOM
let h_hand = document.querySelector('.h-hand');
let m_hand = document.querySelector('.m-hand');
let s_hand = document.querySelector('.s-hand');
let digital_clock = document.getElementById("digital_clock");
let selectData = document.querySelectorAll('select');
let set_alarm = document.querySelector('.set_alarm');
let ring = new Audio('./music/ringtone.mp3');

// Initialize variables
let isAlarm, timeSet;

// Update the clock and set the alarm
setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  // Calculate the rotation angles for the clock hands
  let hr_rotate = 30 * h + m / 2;
  let mn_rotate = 6 * m;
  let sc_rotate = 6 * s;

  // Update the clock hands' rotation
  h_hand.style.transform = `rotate(${hr_rotate}deg)`;
  m_hand.style.transform = `rotate(${mn_rotate}deg)`;
  s_hand.style.transform = `rotate(${sc_rotate}deg)`;

  // Update the digital clock display
  digital_clock.innerHTML = date.toLocaleTimeString();

  // Format the hour and minutes in 12-hour format
  let ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  if (h <= 9) {
    h = `0${h}`
  }
  else {
    h = h;
  }

  if (m <= 9) {
    m = `0${m}`
  }
  else {
    m = m;
  }

  // Check if the current time matches the set alarm time
  if (isAlarm === `${h}:${m} ${ampm}`) {
    ring.play();     // Play the alarm ringtone
  } else {
    ring.pause();     // Pause the alarm ringtone
  }


}, 1000);

// Generate options for the hour select dropdown
for (let index = 12; index >= 1; index--) {
  if (index <= 9 ? index = `0${index}` : index = `${index}`);
  let option = `<option value = "${index}">${index}</option>`;
  selectData[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generate options for the minute select dropdown
for (let index = 59; index >= 1; index--) {
  if (index <= 9 ? index = `0${index}` : index = `${index}`);
  let option = `<option value = "${index}">${index}</option>`;
  selectData[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generate options for the AM/PM select dropdown
for (let index = 0; index < 2; index++) {
  let ampm;
  if (index == 1 ? ampm = "AM" : ampm = "PM");
  let option = `<option value = "${ampm}">${ampm}</option>`;
  selectData[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Event listener for the set alarm button
set_alarm.addEventListener('click', () => {
  if (timeSet) {
    ring.pause();            // Pause the alarm ringtone
    isAlarm = "";
    selectData.forEach((element) => {
      element.classList.remove("disabled");       // Remove the disabled class from select dropdowns
    });
    set_alarm.innerText = "Set Alarm";                // Change the button text to "Set Alarm
    return (timeSet = false);

  }
  let time = `${selectData[0].value}:${selectData[1].value} ${selectData[2].value}`
  isAlarm = time;
  timeSet = true;

  selectData.forEach((element) => {
    element.classList.add("disabled");               // Add the disabled class from select dropdowns
  })

  set_alarm.innerText = "Clear Alarm";                  // Change the button text to "Clear Alarm"
});




