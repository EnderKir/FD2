function ClockViewSVG() {
  let myModel = null;
  let myField = null;

  let run = null;
  let stop = null;

  let clock = null;
  let secArrow = null;
  let minArrow = null;
  let hourArrow = null;

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

  this.clockCreate = function(city, gtm) {
    this.createButtons();
    this.setCityTime(city, gtm);
    this.createClockField();
    this.makingClock();
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
  //prettier-ignore
  this.createClockField = function() {
    let svg =
      `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%' height='200' viewBox='0 0 200 200' preserveAspectRatio='xMidYMin meet'>
      <g class='mainCircle'><circle r='100' cx='50%' cy='50%' class='clock'></circle>
      <g class='arrows'>
      <rect class='hourArrow' x='98.5' y='45%' width='3' height='64' rx='2.5' ry='2.55'></rect>
      <rect class='minArrow' x='99.1' y='44%' width='1.8' height='80' rx='2' ry='2'></rect>
      <rect class='secArrow' x='99.5' y='42%' width='1' height='100' rx='2' ry='2'></rect></g>
      <circle fill='#d41a1a' r='5' cx='50%' cy='50%'></circle></g></svg>`;
    let svg_wrapper = document.createElement("div");
    svg_wrapper.className = "clock-margin";
    svg_wrapper.innerHTML = svg;
    myField.appendChild(svg_wrapper);
  };

  this.makingClock = function() {
    let numbers = 12;
    let delta = (Math.PI * 2) / numbers; // сдвиг угла
    let angle = 0;
    let numeral = 3;
    let radius = 75;
    let centerX = 100;
    let centerY = 100;

    let mainCircle = myField.querySelector(".mainCircle");
    let arrows = myField.querySelector(".arrows");

    let svgNS = "http://www.w3.org/2000/svg";

    for (let i = 0; i < numbers; i++) {
      let point = document.createElementNS(svgNS, "circle");
      point.classList.add("numbers");
      let text = document.createElementNS(svgNS, "text");

      x = centerX + radius * Math.cos(angle);
      y = centerY + radius * Math.sin(angle);

      if (numeral < 10) {
        text.setAttribute("x", x - 2.5);
        text.setAttribute("y", y + 3);
      }

      if (numeral >= 10) {
        text.setAttribute("x", x - 6);
        text.setAttribute("y", y + 3);
      }

      text.textContent = numeral;

      point.setAttribute("r", 12);
      point.setAttribute("cx", x);
      point.setAttribute("cy", y);

      mainCircle.insertBefore(point, arrows);
      mainCircle.insertBefore(text, arrows);

      angle += delta;
      numeral++;
      if (numeral > 12) numeral = 1;
    }
  };

  this.changeState = function(item, state) {
    if (state == false) {
      item.removeAttribute("disabled");
    } else if (state == true) {
      item.setAttribute("disabled", "true");
    }
  };

  this.updateSecArrow = function(angle) {
    secArrow.setAttribute("transform", `rotate(${angle})`);
  };
  this.updateMinArrow = function(angle) {
    minArrow.setAttribute("transform", `rotate(${angle})`);
  };
  this.updateHourArrow = function(angle) {
    hourArrow.setAttribute("transform", `rotate(${angle})`);
  };
}
