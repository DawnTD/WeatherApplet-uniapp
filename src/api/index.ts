import service from '../network/index'
import { nowParam } from '../type'

// json形式
const options = {
  header: { contentType: 'application/json' }
}


// export function testGet(data: any) {
//   return service.get('/artist/list', data)
// }

// export function testPost(data: any) {
//   return service.post('/testPost', data, options)
// }

// export function testPut(data: any) {
//   return service.post('/testPut', data)
// }

// export function testDelete(data: any) {
//   return service.delete('/testDelete', data)
// }

export function getWeatherApi(data: nowParam) {
  return service.get('/now', data)
}
