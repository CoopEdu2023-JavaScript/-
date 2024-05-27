import axios from 'axios';

export const updateStudent = ({id, data}) =>
    axios.patch(`http://localhost:3000/books/${id}`, data)

