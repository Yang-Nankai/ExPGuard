const createCourseDataDOMElement = () => {
  const courseDataElement = document.createElement('label');
  courseDataElement.style.display = 'none';
  if (typeof window.hirepro_course_data === 'undefined') {
    console.log('Course data from wordpress backend is not available');
    return;
  }
  console.log('Creating course data element using wordpress course data');
  courseDataElement.innerText = JSON.stringify(window.hirepro_course_data);
  courseDataElement.id = 'course-data-element';
  document.body.appendChild(courseDataElement);
  console.log('Created course data element using wordpress course data');
  console.log('Course data: ', window.hirepro_course_data);
}

createCourseDataDOMElement();