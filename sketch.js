let activeBrush = 0;
let activeColor = 0;

let color = [0, 64, 64 * 2, 64 * 3, 64 * 4];

function setup() {
  createCanvas(600, 400);
  background(255);


    //center - draw guide
    stroke(color[3]);
    strokeWeight(1);
    line(330, 200, 370, 200);
    line(350, 190, 350, 210);


  // toolbar grid top 4
  for (let colorGrid = 0; colorGrid < color.length; colorGrid++) {
    stroke(color[colorGrid]);
    fill(color[colorGrid]);
    toolbarRect(25, colorGrid * 50 + 25, 50, 50);
  }

  // toolbar grid last 3
  for (brushGrid = 0; brushGrid < 3; brushGrid++) {
    fill(255);
    stroke(color[3]);
    toolbarRect(25, brushGrid * 50 + 225, 50, 50);
  }

  //clean all button
  toolbarRect(0.5, 0.5, 24.5, 24.5);
  line(4, 4, 21, 21);
  line(21, 4, 4, 21);

  //draw area separation
  separationLine();

  //text
  fill(color[3]);
  noStroke();
  textSize(9);
  text("color", 26.5, 33);
  text("brush", 26.5, 283);
}

function draw() {

  //clean all
  if (mouseIsPressed && mouseX < 24 && mouseY < 24) {

    noStroke();
    rectMode(CORNER);
    fill(255);
    rect(76, 0, 700, 400);

    separationLine();
  }
  //color button index
  if (mouseIsPressed && mouseX < 75 && mouseX > 25 && mouseY > 25 && mouseY < 275) {

    let colorButtonIndex = floor((mouseY + 25) / 50) - 1;
    activeColor = color[colorButtonIndex];

  }
  //brush button index
  if (mouseIsPressed && mouseX < 75 && mouseX > 25 && mouseY > 275 && mouseY < 375) {

    let brushButtonIndex = floor((mouseY + 275) / 50 - 11);
    activeBrush = brushButtonIndex;

  } else {

    //draw point //brush 00
    let randomSizeA = random(2, 8);

    if (activeBrush == 0) {

      drawingBrush(randomSizeA, 0, activeColor, 255);

    } else {

      //draw circle //brush 01
      let randomSizeB = random(3, 24);
      let randomStrokeB = random(0.5, 2);

      if (activeBrush == 1) {

        drawingBrush(randomSizeB, randomStrokeB, 0, 0)

      }
    }
  }

  //brush 00 icon
  fill(color[3]);
  noStroke();
  circle(50, 300, 9.5);

  fill(activeColor);
  noStroke();
  circle(50, 300, 9);

  //brush 01 icon
  noFill();
  strokeWeight(2);
  stroke(color[3]);
  circle(50, 350, 18);

  strokeWeight(1);
  noFill();
  stroke(activeColor);
  circle(50, 350, 18);

}

//simplified function

//main function to draw //drawing brush 00 or 01
function drawingBrush(brushSize, strokeNum, fillNum, alphaNum) {

  let y = mouseY;
  while (mouseIsPressed && y < 600 && y > 0) {
    let x = mouseX;
    while (x < 600 && x > 100) {
      stroke(activeColor);
      strokeWeight(strokeNum);
      fill(fillNum, alphaNum);
      circle(mouseX, mouseY, brushSize);
      circle(700 - mouseX, mouseY, brushSize);
      circle(mouseX, 400 - mouseY, brushSize);
      circle(700 - mouseX, 400 - mouseY, brushSize);

      x = 0;
    }
    y = 0;
  }
}

//control style for all grid
function toolbarRect(posX, posY, sizeX, sizeY) {

  strokeWeight(1);
  rect(posX, posY, sizeX, sizeY);
}

//control style for separation line in draw area
function separationLine() {

  strokeWeight(1);
  stroke(color[3]);
  line(100, 50, 100, 350);
  line(599, 25, 599, 400);
  line(25, 399, 600, 399);
}


