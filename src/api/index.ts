import service from '../network/index'
import { cityParam, DayParam, nowParam } from '../type'

// json形式
const options = {
  header: { contentType: 'application/json' }
}

export function getWeatherApi(data: nowParam) {
  return service.get('/weather/v001/now', data)
}
export function getCityApi(data: cityParam) {
  return service.get('/function/v001/city', data)
}
export function getDayApi(data: DayParam) {
  return service.get('/weather/v001/day', data)
}
