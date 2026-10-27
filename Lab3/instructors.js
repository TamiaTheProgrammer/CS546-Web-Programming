// CS-546 Lab 3 — instructors.js
// Implement and export the three functions below using ES module syntax.
// Retrieve the required JSON data using Axios and async/await.

import * as helpers from './helpers.js';

export const getInstructorTeachingLoad = async (instructorId) => 
  {
    let students = await helpers.getStudents();
    let instructors = await helpers.getInstructors();
    let courses = await helpers.getCourses();

    if(instructorId === undefined || instructorId == null)
    {
      throw new Error("Error: instructorId is undefined or does not exist");
    }

    if(typeof instructorId !== 'string')
    {
      throw new Error("Error: instructorId is not a string");
    }

    let cleaned_instructorId = instructorId.trim();
    if(cleaned_instructorId.length == 0)
    {
      throw new Error("Error: instructorId is empty");
    }

    let locate_instructor = instructors.find(instructor => instructor.id === cleaned_instructorId);
    if(locate_instructor === undefined)
    {
      throw new Error("Error: Instructor not found");
    }

    let instructed_courses = courses.filter(course => course.instructor === cleaned_instructorId);

    let totalCredits = instructed_courses.reduce((count, course) => count + course.credits, 0);
    let courseCount = instructed_courses.length;

    let totalEnrollments = 0;

    for(let i = 0; i < instructed_courses.length; i++)
    {
      let courseEnrollments = students.filter(student => student.enrolled_courses.includes(instructed_courses[i].id)).length;
      totalEnrollments += courseEnrollments;
    }

    let uniqueStudentIds = new Set();
    for(let i = 0; i < instructed_courses.length; i++)
    {
      let enrolledInThisCourse = students.filter(student => student.enrolled_courses.includes(instructed_courses[i].id));
      for(let j = 0; j < enrolledInThisCourse.length; j++)
      {
        uniqueStudentIds.add(enrolledInThisCourse[j].id);
      }
    }
    let uniqueStudents = uniqueStudentIds.size;

    return {
      'instructorName': locate_instructor.first_name + " " + locate_instructor.last_name,
      'department': locate_instructor.department,
      'courseCount': courseCount,
      'totalCredits': totalCredits,
      'totalEnrollments': totalEnrollments,
      'uniqueStudents': uniqueStudents
      };

  };

export const getInstructorsForCourse = async (courseName) => 
  {
  if(courseName === undefined || courseName == null)
  {
    throw new Error("Error: courseName is undefined or does not exist");
  }

  if(typeof courseName !== 'string')
  {
    throw new Error("Error: courseName is not a string");
  }

  let cleaned_courseName = courseName.trim();
  if(cleaned_courseName.length == 0)
  {
    throw new Error("Error: courseName is empty");
  }

  let courses = await helpers.getCourses();
  let instructors = await helpers.getInstructors();

  let matching_courses = courses.filter(course => course.course_name.trim().toLowerCase() === cleaned_courseName.toLowerCase());

  if(matching_courses.length == 0)
  {
    throw new Error("Error: No course found with that name");
  }

  let results = [];

  for(let i = 0; i < matching_courses.length; i++)
  {
    let instructorId = matching_courses[i].instructor;

    let already_added = results.find(r => r.id === instructorId);
    if(already_added !== undefined)
    {
      continue;
    }

    let found_instructor = instructors.find(instructor => instructor.id === instructorId);

    if(found_instructor === undefined)
    {
      throw new Error("Error: Instructor not found");
    }

    results.push({
      id: found_instructor.id,
      name: found_instructor.first_name + " " + found_instructor.last_name,
      department: found_instructor.department,
      last_name: found_instructor.last_name
    });
  }

  results.sort((a, b) => a.last_name.localeCompare(b.last_name));

  results = results.map(r => ({ id: r.id, name: r.name, department: r.department }));

  return results;
  };

export const getInstructorsWithMinimumStudents = async (minStudents) => 
  {
  if(minStudents === undefined || minStudents == null)
  {
    throw new Error("Error: minStudents does not exist");
  }

  if(typeof minStudents !== 'number' || !Number.isFinite(minStudents) || !Number.isInteger(minStudents))
  {
    throw new Error("Error: minStudents must be a finite integer");
  }

  if(minStudents < 0)
  {
    throw new Error("Error: minStudents must be nonnegative");
  }

  let instructors = await helpers.getInstructors();
  let courses = await helpers.getCourses();
  let students = await helpers.getStudents();

  let results = [];

  for(let i = 0; i < instructors.length; i++)
  {
    let current_instructor = instructors[i];

    let their_courses = courses.filter(course => course.instructor === current_instructor.id);

    let uniqueStudentIds = new Set();

    for(let j = 0; j < their_courses.length; j++)
    {
      let enrolledInThisCourse = students.filter(student => student.enrolled_courses.includes(their_courses[j].id));

      for(let k = 0; k < enrolledInThisCourse.length; k++)
      {
        uniqueStudentIds.add(enrolledInThisCourse[k].id);
      }
    }

    results.push({
      instructorId: current_instructor.id,
      instructorName: current_instructor.first_name + " " + current_instructor.last_name,
      studentCount: uniqueStudentIds.size,
      last_name: current_instructor.last_name
    });
  }

  results = results.filter(r => r.studentCount >= minStudents);

  results.sort((a, b) =>
  {
    if(b.studentCount !== a.studentCount)
    {
      return b.studentCount - a.studentCount;
    }
    return a.last_name.localeCompare(b.last_name);
  });

  results = results.map(r => ({ instructorId: r.instructorId, instructorName: r.instructorName, studentCount: r.studentCount }));

  return results;
};
