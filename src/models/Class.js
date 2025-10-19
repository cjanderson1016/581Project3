//ChatGPT
export default class Class {
  constructor(name, days, time) {
    this.id = Date.now(); // unique enough for now
    this.name = name;
    this.days = days; // array like ["Mon", "Wed", "Fri"]
    this.time = time; // string like "10:00-11:00"
  }
}