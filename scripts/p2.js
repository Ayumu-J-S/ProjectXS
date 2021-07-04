/*
   Author: Ayumu J S
           Ruksmita
           Andrea659
  Filename: p2.js

  The purpose of this file is to create and handle the functions
  responsible for allowing the range sliders to offer the user
  the ability to choose from a range of values which interact with
  the canvas by accordingly modifying the size of the target component,
  for example thickness.

  The purpose of this file is to also create and handle the functions
  responsible for the multiple menus options which interact with the canvas.

*/


const SCALE = 1.35;     //Pixel scale multiplier
const HALF_TO_INCH = 2;

/**
 * This function is called when the body is loaded and its purpose is to
 * setup canvas' contexts and event listeners.
 */
function setup() {
  let bottomPaneObj = document.getElementById("bottomPane");
  bottomPaneObj.style.visibility = "hidden";

  let planObj = document.getElementById("plan");
  let planContext = planObj.getContext("2d");

  let elevationObj = document.getElementById("elevation");
  let elevContext = elevationObj.getContext("2d");

  drawInitialWall(planObj, planContext);
  drawDoor(elevationObj, elevContext);

  /*
  Functionality for the windowSld.
  Initially set the value of windowArea to 0 and call the processInput
  function if the slider value is changing.
  */
  $("#windowArea").val(0);
  $("#windowSld").on("change", function () {
    processInput();
  });

  /*
  Functionality for the wallSld.
  Ininially set the value of wallThickness to 2 and call the processInput
  functin as the wall thickness (opaque thickness) changes.
  */
  $("#wallThickness").val(2);
  $("#wallSld").on("change", function () {
    processInput();
  });

  /*
  Functionality for doorThermalResOut.
  Initially set the value to 2 and call calculate function as slider value
  changes so the output changes as well.
  */
  $("#doorThermalResOut").val(2);
  $("#doorThermalResSld").on("change", function () {
    calculate();
  });

  /*
  Functionality for windowThermalResOut.
  Initially set the value to 1 and call the calculate funfction as slider
  value changes so the output changes as well.
  */
  $("#windowThermalResOut").val(1);
  $("#windowThermalResSld").on("change", function () {
    calculate();
  });
}

/**
 * This function applies the opaque color to plan view walls.
 */
function opaque() {
  processInput();
}

/**
 * This function decides what is to be shown accroding to the dropdown menu
 * at the top of tha page.
 */
function selectChapters() {
  let choice = $("#showChapters").find(":selected").text();

  if (choice === "Insulation") {
    document.getElementById("bottomPane").style.visibility = "visible";
  } else if (choice == "VIEW CHAPTERS") {
    location.reload();
  }else{
    alert("Under construction.");
    location.reload();
  }
}

/**
 * This function draws the initial walls of the plan view.
 *
 * @param {Object} obj the html object representing the canvas.
 * @param {Context} context the canvas' context.
 */
function drawInitialWall(obj, context) {
  // Draw the initial wall.
  context.beginPath();
  context.lineWidth = 3;
  context.strokeStyle = "#3104fb";
  context.strokeRect(2, 2, obj.width - 4, 8 * 12 * SCALE - 2);
  context.closePath();

  // Cover the line for the door.
  context.fillStyle = "#d8d1d3";
  context.fillRect(220, 8 * 12 * SCALE - 4, 3 * 12 * SCALE, 7);

  // Draw door.
  context.beginPath();
  context.lineWidth = 2.5;
  context.moveTo(220, 8 * 12 * SCALE - 2);
  context.lineTo(220, 8 * 12 * SCALE + 3 * 12 * SCALE - 2);
  context.strokeStyle = "black";
  context.stroke();
  context.closePath();

  // Draw the door frame.
  context.beginPath();
  context.lineWidth = 2;
  context.setLineDash([3, 2]);
  context.moveTo(220, 8 * 12 * SCALE);
  context.lineTo(220 + 3 * 12 * SCALE, 8 * 12 * SCALE);
  context.stroke();
  context.closePath();

  // Draw where the door moves.
  context.beginPath();
  context.lineWidth = 1;
  context.arc(220 - 2, 8 * 12 * SCALE - 1, 3 * 12 * SCALE, 0, Math.PI / 2);
  context.stroke();
  context.setLineDash([]);
  context.closePath();
}

/**
 * Draw plan and elevation, and also calculate the value. This function is
 * usually called when menu or slider is on change.
 */
function processInput() {
  let valWindow = $("#windowSld").val();
  let valWall = $("#wallSld").val();

  let valColor = $("#opaqueColor").val();
  let color = "";

  if (valColor === "finishCell") {
    color = "#e8e5e4";
  } else if (valColor === "finishFiber") {
    color = "#fec7d4";
  } else if (valColor === "finishSpray") {
    color = "#fdfaaa";
  } else {
    color = "#d8d1d3";
  }

  drawWindow(valWindow);
  drawWall(valWall / HALF_TO_INCH, valWindow, color);

  calculate();
}

/**
 * This function draws the wall of the plan view according to the given values and color.
 *
 * @param {Number} valWall The value of the wall thickness
 * @param {Number} valWindow The value of the size of the window
 * @param {string} color the color of the wall
 */
function drawWall(valWall, valWindow, color) {
  let obj = document.getElementById("plan");
  let context = obj.getContext("2d");

  context.clearRect(0, 0, obj.width, obj.height);

  drawOuterWall(obj, context, color);

  drawInnerWall(obj, context, valWall);

  if (valWindow >= 2 * 12) {
    drawWindowOnWall(valWall, valWindow);
  }
}

/**
 * This function draws the outter wall of the plan view according to the given color.
 *
 * @param {Object} obj the html object representing the canvas.
 * @param {Context} context the canvas' context.
 * @param {string} color the wall's color.
 */
function drawOuterWall(obj, context, color) {
  context.fillStyle = "#3104fb";
  context.fillRect(0, 0, obj.width, 8 * 12 * SCALE);

  context.fillStyle = color;
  context.fillRect(1, 1, obj.width - 2, 8 * 12 * SCALE - 2);

  // Cover the line for the door
  context.fillStyle = "#d8d1d3";
  context.fillRect(220, 8 * 12 * SCALE - 100, 3 * 12 * SCALE, 100);

  // Draw door
  context.beginPath();
  context.lineWidth = 2.5;
  context.moveTo(220, 8 * 12 * SCALE - 1);
  context.lineTo(220, 8 * 12 * SCALE + 3 * 12 * SCALE - 2);
  context.strokeStyle = "black";
  context.stroke();
  context.closePath();

  // Draw the door frame (dotted line)
  context.beginPath();
  context.lineWidth = 1;
  context.setLineDash([3, 2]);
  context.moveTo(220, 8 * 12 * SCALE - 1);
  context.lineTo(220 + 3 * 12 * SCALE, 8 * 12 * SCALE - 1);
  context.stroke();
  context.closePath();

  // Draw where the door moves (dotted line)
  context.beginPath();
  context.lineWidth = 1;
  context.arc(220 - 2, 8 * 12 * SCALE - 1, 3 * 12 * SCALE, 0, Math.PI / 2);
  context.stroke();
  context.setLineDash([]);
  context.closePath();
}

/**
 * This function draws the inner wall of the plan view acconrding to the given thickness.
 *
 * @param {Object} obj the html object representing the canvas.
 * @param {Context} context the canvas' context.
 * @param {Number} value the wall's thickness.
 */
function drawInnerWall(obj, context, thickness) {
  context.fillStyle = "#3104fb";
  context.fillRect(
    thickness * SCALE + 1.5,
    thickness * SCALE + 1.5,
    obj.width - 2 * thickness * SCALE - 3,
    8 * 12 * SCALE - 2 * thickness * SCALE - 3
  );

  context.fillStyle = "#d8d1d3";
  context.fillRect(
    thickness * SCALE + 2.5,
    thickness * SCALE + 2.5,
    obj.width - 2 * thickness * SCALE - 5,
    8 * 12 * SCALE - 2 * thickness * SCALE - 5
  );

  context.fillStyle = "#d8d1d3";
  context.fillRect(
    220,
    8 * 12 * SCALE - thickness * SCALE - 5,
    3 * 12 * SCALE,
    5
  );

  context.beginPath();
  context.lineWidth = 1;
  context.setLineDash([3, 2]);
  context.moveTo(220, 8 * 12 * SCALE - thickness * SCALE - 2);
  context.lineTo(220 + 3 * 12 * SCALE, 8 * 12 * SCALE - thickness * SCALE - 2);
  context.stroke();
  context.setLineDash([]);
  context.closePath();
}

/**
 * This function draws the window on the plan view according to the given size and wall thickness.
 *
 * @param {Number} valWall wall thickness.
 * @param {Number} valWindow window size.
 */
function drawWindowOnWall(valWall, valWindow) {
  let planObj = document.getElementById("plan");
  let context = planObj.getContext("2d");

  // Clear the back ground line
  context.fillStyle = "d8d1d3";
  context.fillRect(
    122 - (valWindow * SCALE) / 2,
    8 * 12 * SCALE - valWall * SCALE - 3,
    valWindow * SCALE,
    valWall * SCALE + 6
  );

  // Door thickness
  context.fillStyle = "#07ebf8";
  context.fillRect(
    122 - (valWindow * SCALE) / 2,
    8 * 12 * SCALE - valWall * SCALE - 1,
    valWindow * SCALE,
    valWall * SCALE
  );

  // Draw line for inner window (dotted line)
  context.beginPath();
  context.setLineDash([3, 2]);
  context.moveTo(
    122 - (valWindow * SCALE) / 2,
    8 * 12 * SCALE - valWall * SCALE - 3 + 1
  );
  context.lineTo(
    122 - (valWindow * SCALE) / 2 + valWindow * SCALE,
    8 * 12 * SCALE - valWall * SCALE - 3 + 1
  );
  context.stroke();
  context.closePath();

  // Draw line for outer window (dotted line)
  context.beginPath();
  context.setLineDash([3, 2]);
  context.moveTo(122 - (valWindow * SCALE) / 2, 8 * 12 * SCALE - 0.5);
  context.lineTo(
    122 - (valWindow * SCALE) / 2 + valWindow * SCALE,
    8 * 12 * SCALE - 0.5
  );
  context.stroke();
  context.setLineDash([]);
  context.closePath();
}

/**
 * This function drows door on the right canvas in the insulation pane.
 *
 * @param {Object} obj Instance of canvas that the door is drawn.
 * @param {drawing context} context 2d context of canvas.
 */
function drawDoor(obj, context) {
  // For the door
  context.beginPath();
  context.rect(obj.width - 110, 27 * SCALE, 36 * SCALE, 80 * SCALE);
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.stroke();
  context.closePath();

  // For the door frame
  context.beginPath();
  context.rect(obj.width - 112.75, 25 * SCALE, 40 * SCALE, 84 * SCALE);
  context.stroke();
  context.closePath();

  // For the doornob
  context.beginPath();
  context.arc(obj.width - 70, 95, 3, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
}

/**
 * This function draws a window according to a given width of the window.
 * @param {Number} windowWidth Width for the window.
 */
function drawWindow(windowWidth) {
  let elevationObj = document.getElementById("elevation");
  let elevContext = elevationObj.getContext("2d");

  elevContext.clearRect(0, 0, 196, 180);

  if (windowWidth >= 2 * 12) {
    elevContext.fillStyle = "black";
    elevContext.fillRect(
      119 - (windowWidth * SCALE) / 2 - 3.2,
      27 * SCALE - 3.2,
      windowWidth * SCALE + 6.4,
      windowWidth * SCALE * (3 / 4) + 6.4 - 1
    );

    elevContext.fillStyle = "#adc4fe";
    elevContext.fillRect(
      119 - (windowWidth * SCALE) / 2 - 3.2 + 1.2,
      27 * SCALE - 2,
      windowWidth * SCALE + 6.4 - 2.4,
      windowWidth * SCALE * (3 / 4) + 4 - 1
    );

    // Window (covered by other filled rect to make lines)
    elevContext.fillStyle = "black";
    elevContext.fillRect(
      119 - (windowWidth * SCALE) / 2,
      27 * SCALE,
      windowWidth * SCALE,
      windowWidth * SCALE * (3 / 4) - 1
    );

    // Fill the fillRect above to draw square with lines
    elevContext.fillStyle = "#adc4fe";
    elevContext.fillRect(
      119 - (windowWidth * SCALE) / 2 + 1,
      27 * SCALE + 1,
      windowWidth * SCALE - 2,
      windowWidth * SCALE * (3 / 4) - 3
    );
  }
}

/**
 * Complete the all the necessary calculation with the values taken from slider
 * and dropdown menu.
 */
function calculate() {
  // Makes it able to go by half inches
  let valWallThickness = $("#wallSld").val() / HALF_TO_INCH;
  if ($("#wallSld").val() == 2) {
    valWallThickness = 2;
  }

  let valDoorThermal = $("#doorThermalResSld").val();
  let valWindowThermal = $("#windowThermalResSld").val();
  let valWindowWidth = $("#windowSld").val();
  let optionOpaqueColor = $("#opaqueColor").val();

  // Calculate the value of the Opaquethickness and output to the field
  if (valWallThickness >= 4) {
    $("#wallThickness").val(valWallThickness);
  }

  // Output the value of the door thermal
  $("#doorThermalResOut").val(valDoorThermal);

  // Output the value for window thermal
  $("#windowThermalResOut").val(valWindowThermal);

  // Calculate the window area and output to the field
  let windowArea = (valWindowWidth / 12) * (((valWindowWidth / 12) * 3) / 4);
  let windowAreaTrunc = Math.trunc(Number(windowArea) * 10) / 10;
  $("#windowArea").val(windowAreaTrunc);

  // Calculate opaque thermal res and effective thermal res and output to
  // the field
  let valOpaqueThermalRes = 0;
  let valEffectiveThermalRes = 0;
  if (optionOpaqueColor != "opaqueConst") {
    let valOpaque = 0;

    // Take the value from the drop down menu
    if (
      optionOpaqueColor === "bareContainer" ||
      optionOpaqueColor === "interiorUninsulated"
    ) {
      valOpaque = 0;
    } else if (
      optionOpaqueColor === "finishCell" ||
      optionOpaqueColor === "finishFiber"
    ) {
      valOpaque = 3;
    } else if (optionOpaqueColor === "finishSpray") {
      valOpaque = 6;
    }

    // Calculate the opaque thermal resistance and output to the filed
    valOpaqueThermalRes = 2 + (valWallThickness - 2) * valOpaque;
    $("#opaqueVal").val(valOpaqueThermalRes);

    // Calculate the effective Thermal Resistance and output to the field
    valEffectiveThermalRes =
      1 /
      (((800 - windowAreaTrunc) / valOpaqueThermalRes +
        windowAreaTrunc / valWindowThermal +
        20 / valDoorThermal) /
        820);
    $("#effectiveThermal").val(Math.round(valEffectiveThermalRes));
  }

  // Take the string of the menu
  let locationTempStr = $("#locationTemperature").find(":selected").text();

  if (locationTempStr != "PLACES WITH DEGREE-DAYS") {
    let valAnnualEnergy = 0;
    // Separate the places and number and only store the number
    let valLocationTemp = locationTempStr.split(" - ")[1];

    // Conditinal check so that it does not devide by 0
    if (valEffectiveThermalRes != 0) {
      //Calculate the annual Energy
      valAnnualEnergy =
        (820 * valLocationTemp * 1.8 * 24) / valEffectiveThermalRes / 3412 +
        (valLocationTemp * 1.8 * 24 * 65) / 3412 +
        3000;

      // Output to the field
      $("#anualEnergy").val(Math.round(valAnnualEnergy));
    }
  }
}

/**
 * This function displays the value of the selected concept taken
 * from the dropdown menu.
 */
function displayDescription() {
  // Getting the selected value from the dropdown
  let choice = $("#concepts").find(":selected").text();

  let descriptionHtml = "";

  // Checking if the user chose the default concept option
  if (choice != "CONCEPTS") {
    const descriptionObject = descriptions[choice.toLowerCase()];

    // Adding the title to a paragraph tag
    descriptionHtml = "<p>" + descriptionObject["title"];
    +"</p>";

    // For each paragraph of the description, creates a paragraph html element.
    for (let i = 0; i < descriptionObject["paragraphs"].length; i++) {
      descriptionHtml += "<p>" + descriptionObject["paragraphs"][i] + "</p>";
    }
  }

  // Fills the description area with the actual description
  $("#concepts-description").html(descriptionHtml);
}
