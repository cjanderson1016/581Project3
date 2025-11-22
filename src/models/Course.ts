export interface Course {
  id?: number; // the id associated with the course (assigned by Django)
  
  subject?: string; //
  course_number?: number; //
  registrar_course_number?: number; //
  title: string;
  topic?: string;
  class_number?: number; //
  section_number?: number; //

  credits_min?: number; //
  credits_max?: number; //
  seats_available?: number; //
  total_enrolled?: number; //
  enroll_cap?: number; //

  type?: string; // // e.g. "LEC", "LAB"
  consent?: string; // // e.g. "None", "Department", "Instructor"
  enrollable?: string; // // could be "Yes"/"No" or converted to boolean
  instructor?: string;

  start_time: string; // e.g. "09:00 AM" or "APPT"
  end_time: string; //- // may be blank
  days: string; //- // e.g. "MWF", "TuTh"
  begin_date?: string; // // e.g. "JAN-20"
  end_date?: string; // // e.g. "MAY-15"
  location?: string; // // e.g. "LAWRENCE"
  room?: string; // e.g. "EATN 2010"

  uploaded_by:string;

  // === Derived or manually added fields -- TODO (maybe if time) ===
  school?: string;
  department?: string;
  building?: string;
} // "//" means I added a ?, "//-" means I got rid of the ?