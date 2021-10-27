import axios from 'axios'

const store = async (auth: any, values: any) => {
  try {
    const config = {
      'headers': {
        'token': auth.token,
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/drinks', values, config)
    return res
  } catch (err) {
    throw err
  }
}

// const findAll = async (auth: any) => {
//   try {
//     const config = {
//       'headers': {
//         'token': auth.token,
//         'Content-Type': 'application/json'
//       }
//     }
//     const res = await axios.get('/api/drinks', config)
//     return res
//   } catch (err) {
//     throw err
//   }
// }

export { store }