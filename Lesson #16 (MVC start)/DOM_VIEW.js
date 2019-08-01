function ClockViewDOM() {
  let myModel = null;
  let myField = null;

  let run = null;
  let stop = null;

  let clock = null;
  let secArrow = null;
  let minArrow = null;
  let hourArrow = null;

  this.clockCreate = function(city, gtm) {
    this.createButtons(); // верстка
    this.setCityTime(city, gtm);
    this.createClockField(); // верстка
    this.makingClock(); // верстка
  };

  this.createButtons = function() {
    let button_run = '<button class="run">старт</button>';
    let button_stop = '<button class="stop">стоп</button>';
    let buttons = button_run + " " + button_stop;
    myField.innerHTML = buttons;
  };

  this.setCityTime = function(city, gtm) {
    let info = document.createElement("div");
    info.className = "info";
    info.innerHTML = `${city} (GTM ${gtm > 0 ? "+" + gtm : gtm})`;
    myField.appendChild(info);
  };

  this.createClockField = function() {
    clock = document.createElement("div");
    clock.className = "clock";
    myField.appendChild(clock);

    let secArrow = document.createElement("div");
    secArrow.className = "secArrow";
    clock.appendChild(secArrow);

    let minArrow = document.createElement("div");
    minArrow.className = "minArrow";
    clock.appendChild(minArrow);

    let hourArrow = document.createElement("div");
    hourArrow.className = "hourArrow";
    clock.appendChild(hourArrow);

    let centerCircle = document.createElement("div");
    centerCircle.className = "centerCircle";
    clock.appendChild(centerCircle);
  };

  this.makingClock = function() {
    const numbers = 12;
    let delta = (Math.PI * 2) / numbers; // сдвиг угла
    let angle = 0;
    let numeral = 3;
    let radius = 75;
    let clockCenterX = clock.offsetWidth / 2;
    let clockCenterY = clock.offsetHeight / 2;

    for (let i = 0; i < numbers; i++) {
      let currentNumber = document.createElement("div");
      currentNumber.classList.add("numbers");
      currentNumber.innerHTML = numeral;
      clock.appendChild(currentNumber);
      let currentNumberCenterX = currentNumber.offsetWidth / 2;
      let currentNumberCenterY = currentNumber.offsetHeight / 2;
      // prettier-ignore
      currentNumber.style.left = clockCenterX - currentNumberCenterX + radius * Math.cos(angle) + "px";
      // prettier-ignore
      currentNumber.style.top = clockCenterY - currentNumberCenterY + radius * Math.sin(angle) + "px";
      angle += delta;
      numeral++;
      if (numeral > 12) numeral = 1;
    }
  };

  this.start = function(model, field, city, gtm) {
    myModel = model;
    myField = field;

    this.clockCreate(city, gtm);

    secArrow = myField.querySelector(".secArrow");
    minArrow = myField.querySelector(".minArrow");
    hourArrow = myField.querySelector(".hourArrow");
    run = myField.querySelector(".run");
    stop = myField.querySelector(".stop");

    run.disabled = true;
  };

  this.changeState = function(item, state) {
    if (state == false) {
      item.removeAttribute("disabled");
    } else if (state == true) {
      item.setAttribute("disabled", "true");
    }
  };

  this.updateSecArrow = function(angle) {
    secArrow.style.transform = `rotate(${angle}deg)`;
  };
  this.updateMinArrow = function(angle) {
    minArrow.style.transform = `rotate(${angle}deg)`;
  };
  this.updateHourArrow = function(angle) {
    hourArrow.style.transform = `rotate(${angle}deg)`;
  };
}
