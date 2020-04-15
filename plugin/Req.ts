import fetch from 'node-fetch';

class Request {
  fetch(url: string, opt: any) {
    return fetch(url, opt);
  }
}

export default Request;
