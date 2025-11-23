export interface Course {
  id?: number; // the id associated with the course (assigned by Django)
  
  subject: string; //
  course_number: number; //
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
}

// DisplayCourse is a condensed view used for search results and selection.
// It groups all sections of the same subject + course_number together.
export interface DisplayCourse {
  subject?: string;
  course_number?: number;
  title: string;
  topic?: string;
  // All unique instructors across sections for this course
  instructors: string[];
  // All Course sections that belong to this subject/course_number
  sections: Course[];
}

// Convert a list of Course sections into grouped DisplayCourse entries.
export function createDisplayCourses(courses: Course[]): DisplayCourse[] {
  const map = new Map<string, DisplayCourse>();

  for (const c of courses) {
    const key = `${c.subject}|${c.course_number}`;
    const existing = map.get(key);

    const instructor = (c.instructor || "").trim();

    if (!existing) {
      map.set(key, {
        subject: c.subject,
        course_number: c.course_number,
        title: c.title,
        topic: c.topic,
        instructors: instructor ? [instructor] : [],
        sections: [c],
      } as DisplayCourse);
    } else {
      // add unique instructor
      if (instructor && !existing.instructors.includes(instructor)) {
        existing.instructors.push(instructor);
      }
      existing.sections.push(c);
      // prefer existing title/topic, but fall back if missing
      if (!existing.title && c.title) existing.title = c.title;
      if (!existing.topic && c.topic) existing.topic = c.topic;
    }
  }

  return Array.from(map.values());
}
// "//" means I added a ?, "//-" means I got rid of the ?