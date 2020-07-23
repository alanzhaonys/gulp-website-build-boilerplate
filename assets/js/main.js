import $ from "jquery";

$(document).ready(function() {
  let test = new Test(100, 200);
  console.log("X: " + test.x + ", Y: " + test.y);
});

class Test {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
