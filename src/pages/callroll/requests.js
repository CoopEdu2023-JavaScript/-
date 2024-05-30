import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export const fetchStudents = () => axios.get(`${BASE_URL}/students`).then(res => res.data);

export const updateStudent = ({ id, data }) => axios.patch(`${BASE_URL}/students/${id}`, data);

export const updateStudentsBulk = students =>
  Promise.all(students.map(student => updateStudent({ id: student.id, data: student })));
