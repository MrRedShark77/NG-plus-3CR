/*class Autobuyer {
  constructor(target) {
    this.target = target;
    this.cost = 1
    this.interval = 5000;
    this.priority = 1;
    this.ticks = 0;
    this.isOn = false;
    this.tier = 1;
    this.bulk = 1;
  }

}*/

var E = x => new Decimal(x);
var el = x => document.getElementById(x);

var softcap = function (x, start, power, mode, dis=false) {
  x = E(x)
  if (!dis&&x.gte(start)) {
      if ([0, "pow"].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
      if ([1, "mul"].includes(mode)) x = x.sub(start).mul(power).add(start)
  }
  return x
}

var softcapNumber = function (x, start, power, mode, dis=false) {
  if (!dis&&x>=start) {
      if ([0, "pow"].includes(mode)) x = (x/start)**power*start
      if ([1, "mul"].includes(mode)) x = (x-start)*power*start
  }
  return x
}

var Autobuyer = function Autobuyer(target) {
    this.target = target
    this.cost = 1
    this.interval = 5000;
    this.priority = 1;
    this.ticks = 0;
    this.isOn = false;
    this.tier = 1;
    this.bulk = 1;
}
