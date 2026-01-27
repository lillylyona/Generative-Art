let t = 0; //t = a timer value, slowly increase it every frame to make the noise “move” like animation.
let seedValue = 1234; //seedValue = a number that controls the “randomness pattern” for Perlin noise.

function setup() {
  // Attach canvas to the hero banner container
  const banner = document.getElementById("banner");
  const w = banner.offsetWidth;
  const h = banner.offsetHeight;

  const c = createCanvas(w, h); //createCanvas(w, h) makes a drawing area.
  c.parent("banner"); //c.parent("banner") attaches that canvas into the HTML element with id banner.

  pixelDensity(1); //Make it run smoother on screens
  noiseSeed(seedValue); //Sets the starting “pattern” for Perlin noise.
}

function draw() {
  // A dark fade look
  background(11, 15, 26, 35);

  // The user input: mouse controls the system parameters
  const scale = map(constrain(mouseX, 0, width), 0, width, 0.002, 0.02);
  const amp = map(constrain(mouseY, 0, height), 0, height, 18, 120); //map: Converts one range of values to another range.
//scale: Uses mouseX (left-right) Turns it into a noise scale, small scale = smoother waves,bigger scale = more “busy” or chaotic waves
//amp: Uses mouseY (up-down) Turns it into wave height, smaller amp = subtle waves, bigger amp = huge waves


  // How many wave lines
  const lines = 26;
  const lineGap = height / (lines + 1); //lineGap is the space between each line so they spread evenly down the banner.

  noFill();
  stroke(255, 160);
  strokeWeight(1);

  // Draw layered noise lines
  for (let i = 1; i <= lines; i++) { //This loop runs 26 times (one for each line).
    const baseY = i * lineGap; // baseY is the normal height of that line before we distort it.

    beginShape();
    for (let x = 0; x <= width; x += 10) { //This moves across the canvas in steps of 10 pixels. 
      const n = noise(x * scale, i * 0.08, t); //Get a Perlin noise value for each x position
      const y = baseY + (n - 0.5) * amp; //Convert that noise into a y position
      vertex(x, y);
    }
    endShape(); //This connects all the points into one continuous line.
  }

  // Move time forward (this animates the noise)
  t += 0.012;
}

//Click to regenerate a new wave style
function mousePressed() {
  seedValue = Math.floor(Math.random() * 999999);
  noiseSeed(seedValue);
}

// Keep it responsive
function windowResized() {
  const banner = document.getElementById("banner");
  resizeCanvas(banner.offsetWidth, banner.offsetHeight);
}
