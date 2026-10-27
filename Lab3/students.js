// CS-546 Lab 3 — students.js
// Implement and export the three functions below using ES module syntax.
// Retrieve the required JSON data using Axios and async/await.

import * as helpers from './helpers.js';

export const getStudentsByMajor = async (major, minimumGpa) => 
{
  //That the major parameter exists and is of the proper type (string). If not, throw an error.
  if(typeof major == 'undefined' || major == null)
  {
    throw new Error("Error: Major is undefined or does not exist");
  }

  if(typeof major !== 'string')
  {
    throw new Error("Error: Major must be a string");
  }

  //Trim
  let cleaned_major = major.trim();
  
  //If major is just empty spaces after trimming, throw an error.
  if(cleaned_major.length < 1)
  {
    throw new Error("Error: Major is Empty");
  }

  //That minimumGpa exists and is a finite number. If not, throw an error.
  if(typeof minimumGpa == 'undefined' || minimumGpa == null)
  {
    throw new Error("Error: Minumum Gpa is not defined/ is null");
  }

  if(typeof minimumGpa !== 'number' || !Number.isFinite(minimumGpa))
  {
    throw new Error("Error: Minimum Gpa is not finite");
  }


  //That minimumGpa is between 0 and 4, inclusive. If not, throw an error.
  if(minimumGpa < 0 || minimumGpa > 4)
  {
    throw new Error("Error: Minimun Gpa is not between 0 and 4.0");
  }

  let students = await helpers.getStudents();
  let students_major = students.filter(student => student.major.trim().toLowerCase() === cleaned_major.toLowerCase());

  //If the specified major does not exist in students.json, throw an error.
  if(students_major.length == 0)
  {
    throw new Error ("Error: Specified major does not exist in students.json");
  }

  let matches = students_major.filter(student => student.gpa >= minimumGpa);

  //If the major exists but no students meet the minimum GPA, return an empty array []. Do not throw an error.
  if(matches.length == 0)
  {
    return [];
  }

  matches.sort((a, b) => 
    {
      if(b.gpa !== a.gpa)
      {
        return b.gpa - a.gpa;
      }
      return a.last_name.localeCompare(b.last_name);
    });

    return matches;
}

export const getStudentCourseLoad = async (studentId) => 
{
  let students = await helpers.getStudents();
  let courses = await helpers.getCourses();

  if(studentId === undefined || studentId == null)
    {
      throw new Error("Error: StudentID is undefined or does not exist");
    }

  //That studentId exists and is of the proper type (string). If not, throw an error.
  if(typeof studentId !== 'string')
    {
      throw new Error("Error: StudentID must be a string");
    }

  //If studentId is just empty spaces after trimming, throw an error.
  let cleaned_studentID = studentId.trim();
  if(cleaned_studentID.length == 0)
    {
      throw new Error("Error: StudentID is Empty");
    }

  //If the student cannot be found, throw a "student not found" error or something similar.
  let locate_studentID = students.find(student => student.id === cleaned_studentID);
  if(locate_studentID === undefined)
  {
    throw new Error("Error: Student not found");
  }
  
  let hold = new Set(locate_studentID.enrolled_courses);
  let CourseIds = Array.from(hold);

  if(CourseIds.length == 0)
  {
    return{
      'courseCount': 0, 'totalCredits': 0, 'courses': []
    }
  }


  let courseCount = 0;
  let totalCredits = 0;

  let temp = [];

  for(let i = 0; i < CourseIds.length; i++)
  {
    let foundCourse = courses.find(course => course.id === CourseIds[i]);
    if(foundCourse == undefined)
    {
      throw new Error("Error: Course not found");
    }
    temp.push({courseId: foundCourse.id, courseName: foundCourse.course_name, credits: foundCourse.credits});
    courseCount++;
    totalCredits = totalCredits + foundCourse.credits;
  }

  return{
    'studentName': locate_studentID.first_name + " " + locate_studentID.last_name,
    'courseCount': courseCount,
    'totalCredits': totalCredits,
    'courses': temp
  }

};

export const findClassmates = async (studentId) => 
  {

    let students = await helpers.getStudents();
    if(studentId === undefined || studentId == null)
    {
      throw new Error("Error: StudentID is undefined or does not exist");
    }

    if(typeof studentId !== 'string')
    {
      throw new Error("Error: StudentID must be a string");
    }

    let cleaned_studentID = studentId.trim();
    if(cleaned_studentID.length == 0)
    {
      throw new Error("Error: StudentID is Empty");
    }

    let locate_studentID = students.find(student => student.id.trim().toLowerCase() === cleaned_studentID.toLowerCase());
    if(locate_studentID === undefined)
    {
      throw new Error("Error: Student not found");
    }
    
    let hold = new Set(locate_studentID.enrolled_courses);
    let enrolled_courses = Array.from(hold);
    let temp = [];

    for(let i = 0; i < students.length; i++)
    {
      let candidateStudent = students[i];
      if(candidateStudent.id === locate_studentID.id)
      {
        continue;
      }
      
      let candidateCourses = new Set(candidateStudent.enrolled_courses);
      let sharedCount = 0;

      for(let j = 0; j < enrolled_courses.length; j++)
      {
        if(candidateCourses.has(enrolled_courses[j]))
        {
          sharedCount++;
        }
      }

      if(sharedCount > 0)
      {
        temp.push({ student: candidateStudent, sharedCourseCount: sharedCount });
      }
    }
    
    temp.sort((a, b) => 
    {
      if(b.sharedCourseCount !== a.sharedCourseCount)
      {
        return b.sharedCourseCount - a.sharedCourseCount;
      }
      return a.student.last_name.localeCompare(b.student.last_name);
    });

  return temp;

};
