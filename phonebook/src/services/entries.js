import axios from 'axios'
// const baseUrl = 'http://localhost:3001/db'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl).catch(error => {
    console.log('getAllfail')
  })
//   return request.then(response => response.data)
  return request.then(response => response.data)
}

const create = newObject => {
    console.log('newObject', newObject)
  const request = axios.post(`${baseUrl}`, newObject).catch(error => {
    console.log('create fail')
  })
  console.log("request in create: ", request)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request =  axios.put(`${baseUrl}/${id}`, newObject).catch(error => {
    console.log('update fail')
  })
  return request.then(response => response.data)
}


// const deletePerson = (id) => {
//     const changedList = axios.get(baseUrl).then(request.filter(person => person.id !== id))
//     const request = axios.put(baseUrl, changedList)
// }
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`).catch(error => {
        console.log({baseUrl}, id)
        console.log("could not delete")
        console.log("request delete axion:", request)
    })
    console.log("request delete axion:", request)
    return request.then(response => response.data)
    // return request
}
// const deletePerson = (personToDelete) => {
//     const request = axios.delete(baseUrl, {personToDelete} ).catch(error => {
//         console.log("could not delete")
//         console.log("request delete axion:", request)
//     })
//     return request.then(response => response.data)
// }
export default {getAll, create, update, deletePerson}

