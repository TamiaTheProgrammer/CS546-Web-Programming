// CS-546 Lab 3 — app.js
// Use this file to test your exported functions. It is not used for grading.
// Create package.json yourself; include "type": "module", an npm start command
// that runs app.js, and your Axios dependency.
//
// Add test calls inside main(). Use a separate try/catch for each test so that
// one expected error does not prevent your other tests from running.

import * as students from './students.js';
import * as courses from './courses.js';
import * as instructors from './instructors.js';

async function main() {
  // Example of a test to try AFTER implementing getStudentCourseLoad:
  /*try {
     const result = await students.getStudentsByMajor("Computer Science", 4.0);
     console.log(result);
   } catch (e) {
     console.log(e);
   }
*/
   /*

   try {
     const result = await students.getStudentsByMajor("Computer Science", 4.5);
// Throws Error: minimumGpa must be between 0 and 4.
     console.log(result);
   } catch (e) {
     console.log(e);
   }

   try {
     const result = await students.getStudentsByMajor("Computer Science", "3.5");
// Throws Error.
     console.log(result);
   } catch (e) {
     console.log(e);
   }

  
    try {
     const result = await students.getStudentsByMajor("Not A Real Major", 3.0);
     console.log(result);
   } catch (e) {
     console.log(e);
   }

    try {
     const result = await students.getStudentsByMajor(123, 3.0);
     console.log(result);
   } catch (e) {
     console.log(e);
   }


    try {
     const result = await students.getStudentsByMajor(" ", 3.0);
     console.log(result);
   } catch (e) {
     console.log(e);
   }

    try {
     const result = await students.getStudentsByMajor("Computer Science");
     console.log(result);
   } catch (e) {
     console.log(e);
  }
     */


  /*try {
     const result = await students.getStudentCourseLoad("7f5bed9a-7f53-4e87-b2e9-54bedfdadfd5");
     console.log(result);
   } catch (e) {
     console.log(e);
   }
     */
   /*
    try {
     const result = await students.getStudentCourseLoad("7989fa5e-5617-43f7-a931-46036f9dbcff");
     console.log(result);
   } catch (e) {
     console.log(e);
   }

   try {
     const result = await students.getStudentCourseLoad();
     console.log(result);
   } catch (e) {
     console.log(e);
   }

   try {
     const result = await students.getStudentCourseLoad(" ");
     console.log(result);
   } catch (e) {
     console.log(e);
   }
     */
    
  //console.log(await courses.getCoursesByCreditRange(2, 2));


  //await courses.getCoursesWithMultipleSections(7)
  console.log(await instructors.getInstructorsWithMinimumStudents()
);



  //
  // Add your own tests for the remaining functions. For example, call
  // courses.getCoursesByCreditRange(...) or
  // instructors.getInstructorTeachingLoad(...) inside additional try/catch blocks.
}

main();
