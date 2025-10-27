// TODO: This class needs to be updated to match the backend Course data model

export interface Course {
  id: number;
  subject: string;
  course_number: string;
  title: string;
  days: string;
  start_time: string;
  end_time: string;
  instructor: string;
}