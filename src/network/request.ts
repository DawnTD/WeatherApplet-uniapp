const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
//定义返回值类型
export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}
class requestClass {
  // 默认配置
  [config]: { baseURL?: string } & UniApp.RequestOptions = {
    baseURL: '',
    url: '',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-APISpace-Token': 'sdh8p107helqi2wfxg5zanl5uds5gror',
      'Authorization-Type': 'apikey'
    },
    method: 'GET',
    timeout: 3000,
    dataType: 'json',
    responseType: 'text'
  }

  // 拦截器
  interceptors = {
    request: (func: Fn) => {
      if (func) {
        requestClass[requestBefore] = func
      } else {
        requestClass[requestBefore] = (request) => request
      }
    },
    response: (func: Fn) => {
      if (func) {
        requestClass[requestAfter] = func
      } else {
        requestClass[requestAfter] = (response) => response
      }
    },
  }

  // 请求之前，是默认配置
  static [requestBefore](config: UniApp.RequestOptions) {
    return config
  }
  // 请求之后，默认配置发生改变的话
  static [requestAfter](response: any) {
    return response
  }
  // 判断url是否完整
  static [isCompleteURL](url: string) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  request<T>(options: UniApp.RequestOptions & { baseURL?: string }): Promise<T> {
    options.baseURL = options.baseURL || this[config].baseURL
    options.dataType = options.dataType || this[config].dataType
    options.url = requestClass[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
    options.data = options.data
    options.header = { ...options.header, ...this[config].header }
    options.method = options.method || this[config].method

    options = { ...options, ...requestClass[requestBefore](options) }

    return new Promise((resolve, reject) => {
      options.success = function (res) {
        resolve(requestClass[requestAfter](res))
      }
      options.fail = function (err) {
        reject(requestClass[requestAfter](err))
      }
      uni.request(options)
      // 中断请求实现方法
      // let obj: any = {}
      // obj[request.url] = uni.request(options)
      // abortRequest() {
      //   for (const key in obj) {
      //     if (Object.prototype.hasOwnProperty.call(obj, key)) {
      //       const element = obj[key];
      //       element.abort()
      //     }
      //   }
      // }
    })
  }

  get<T = Result>(url: string, data: any = {}, options: Recordable = {}): Promise<T> {
    return this.request<T>({ ...options, url, data, method: 'GET' })
  }

  post<T = Result>(url: string, data: any = {}, options: Recordable = {}): Promise<T> {
    return this.request<T>({ ...options, url, data, method: 'POST' })
  }

  put<T = Result>(url: string, data: any = {}, options: Recordable = {}): Promise<T> {
    return this.request<T>({ ...options, url, data, method: 'PUT' })
  }

  delete<T = Result>(url: string, data: any = {}, options: Recordable = {}): Promise<T> {
    return this.request<T>({ ...options, url, data, method: 'DELETE' })
  }

  getConfig() {
    return this[config]
  }

  // 修改默认配置的一个方法，可以修改请求地址，请求方式等等..
  setConfig(func: Fn) {
    this[config] = func(this[config])
  }
}

export default requestClass

