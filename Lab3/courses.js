// CS-546 Lab 3 — courses.js
// Implement and export the three functions below using ES module syntax.
// Retrieve the required JSON data using Axios and async/await.

/*
If no courses fall within the specified range, return an empty array []. Do not throw an error.
*/

import * as helpers from './helpers.js';

export const getCoursesByCreditRange = async (minCredits, maxCredits) => 
{
  //Sooooooooooo many checks :(
  if(minCredits === undefined || minCredits == null)
    {
      throw new Error("Error: minCredits is undefined or does not exist");
    }

  if(maxCredits === undefined || maxCredits == null)
    {
      throw new Error("Error: maxCredits is undefined or does not exist");
    }

  if(typeof minCredits !== 'number' || !Number.isFinite(minCredits) || !Number.isInteger(minCredits))
    {
      throw new Error("Error: minCredits is not finite");
    }

  if(typeof maxCredits !== 'number' || !Number.isFinite(maxCredits) || !Number.isInteger(maxCredits))
    {
      throw new Error("Error: maxCredits is not finite");
    }

  if(minCredits < 0)
    {
      throw new Error("Error: minCredits is negative");
    }

  if(maxCredits < 0)
    {
      throw new Error("Error: maxCredits is negative");
    }

  if(minCredits > maxCredits)
    {
      throw new Error("Error: minCredits is greater than maxCredits");
    }

    let courses = await helpers.getCourses();

    let matches = courses.filter(course => course.credits >= minCredits && course.credits <= maxCredits);

    matches.sort((a, b) => 
    {
      if(a.credits !== b.credits)
      {
        return a.credits - b.credits;
      }
      return a.course_name.localeCompare(b.course_name);
    });

    if(matches.length == 0)
    {
      return [];
    }

    return matches.map(course => ({
      'id': course.id,
      'courseName': course.course_name,
      'credits': course.credits
  }));
}

export const getCourseEnrollmentReport = async (courseId) => 
  {
    let students = await helpers.getStudents();
    let courses = await helpers.getCourses();

    if(courseId === undefined || courseId == null)
    {
      throw new Error("Error: courseId is undefined or does not exist");
    }

    if(typeof courseId !== 'string')
    {
      throw new Error("Error: courseId is not a string");
    }

    let cleaned_courseId = courseId.trim();
    if(cleaned_courseId.length == 0)
    {
      throw new Error("Error: courseId is empty");
    }

    let locate_course = courses.find(course => course.id === cleaned_courseId);
    if(locate_course === undefined)
    {
      throw new Error("Error: Course not found");
    }

    let enrolledStudents = students.filter(student => student.enrolled_courses.includes(cleaned_courseId));
    if(enrolledStudents.length == 0)
    {
      return {
        'courseName': locate_course.course_name,
        'department': locate_course.department,
        'credits': locate_course.credits,
        'enrollmentCount': 0,
        'averageGpa': null,
        'students': []
      }
    }

      let gpa_total = enrolledStudents.reduce((count, student) => count + student.gpa, 0);
      gpa_total = gpa_total / enrolledStudents.length;
      gpa_total = Math.round(gpa_total * 100) / 100;

      enrolledStudents.sort((a, b) => a.last_name.localeCompare(b.last_name));

      let student_List = enrolledStudents.map(student => 
        ({
          studentId: student.id,
          name: student.first_name + " " + student.last_name,
          major: student.major
        }));

      return{
        'courseName': locate_course.course_name,
        'department': locate_course.department,
        'credits': locate_course.credits,
        'enrollmentCount': enrolledStudents.length,
        'averageGpa': gpa_total,
        'students': student_List
      }

  };

export const getCoursesWithMultipleSections = async (minSections) => 
{
  if(minSections === undefined || minSections === null)
  {
    throw new Error("Error: minSections does not exist");
  }

  if(typeof minSections !== 'number' || !Number.isFinite(minSections) || !Number.isInteger(minSections))
  {
    throw new Error("Error: minSections is not finite");
  }

  if(minSections < 2)
  {
    throw new Error("Error: minSections must be greater than or equal to 2");
  }

  let students = await helpers.getStudents();
  let courses = await helpers.getCourses();

  let courses_count = {};
  let enrollment_count = {};

  for(let i = 0; i < courses.length; i++)
  {
    let course_name = courses[i].course_name;

    if(courses_count[course_name] === undefined)
    {
      courses_count[course_name] = 1;
    }
    else
    {
      courses_count[course_name]++
    }


    let sectionEnrollments = students.filter(student => student.enrolled_courses.includes(courses[i].id)).length;

    if(enrollment_count[course_name] === undefined)
    {
      enrollment_count[course_name] = 0;
    }
    enrollment_count[course_name] += sectionEnrollments;
  }
  
  //console.log(courses_count);
  //console.log(enrollment_count);

  let matches = [];
  let c_names = Object.keys(courses_count);

  for(let i = 0; i < c_names.length; i++)
  {
    let c_name = c_names[i];

    matches.push({
      courseName: c_name,
      sectionCount: courses_count[c_name],
      totalEnrollments: enrollment_count[c_name]
    })
  }

  matches = matches.filter(course => course.sectionCount >= minSections);

  matches.sort((a, b) =>
{
  if(b.sectionCount !== a.sectionCount)
      {
        return b.sectionCount - a.sectionCount;
      }
      return a.courseName.localeCompare(b.courseName);
});

return matches;
};
