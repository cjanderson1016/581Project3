// TODO: This class needs to be updated to match the backend Course data model

export default class Course {
  constructor(id, name, department, code, credits, days, start_time, end_time, instructor) {
    this.id = id; // unique enough for now
    this.name = name;
    this.department = department;
    this.code = code;
    this.credits = credits;
    this.days = days; // Substrings of 'SuMTuWThFSa' (most commonly 'MWF' or 'TuTh') -- leave blank in the case of APPT
    this.start_time = start_time;
    this.end_time = end_time;
    this.instructor = instructor
  }
}