import {Injectable} from '@angular/core';
import {parseJSON} from '@common/json';

export enum HTTPMethod {
  PUT = 'PUT',
  GET = 'GET',
  POST = 'POST',
}

export enum ReadyState {
  UNSENT = 0,
  OPENED = 1,
  HEADERS_RECEIVED = 2,
  LOADING = 3,
  DONE = 4,
}


@Injectable()
export class XHR {
  public getJSON(method: HTTPMethod, path: string) {
    return this.sendJSON(method, path);
  }

  public sendJSON(
      method: HTTPMethod, path: string, body: string = '',
      headers?: {[key: string]: string}) {
    const dest = window.location.origin + path;
    const xhr = new XMLHttpRequest();  // construct the native xhr object.
    return new Promise((resolve, reject) => {
             xhr.onreadystatechange = () => {
               if (xhr.readyState == ReadyState.DONE) {  //
                 if (xhr.status >= 200 && xhr.status < 300) {
                   // If the status is between 200 and 300 then it suceeded.
                   resolve(xhr);
                 } else {
                   reject(xhr);
                 }
               }
             };
             xhr.onerror = () => {
               // If this gets called: wipe the onreadystatechange function
               // This is to stop the promise from trying to resolve after being
               // rejected.
               xhr.onreadystatechange = () => {};
               reject(xhr);
             };
             xhr.open(method, dest);
             xhr.responseType = 'text';
             if (headers) {
               headers['accept'] = headers['accept'] || 'application/json';
               for (let key in headers) {
                 if (headers.hasOwnProperty(key)) {
                   xhr.setRequestHeader(key, headers[key]);
                 }
               }
             }
             if (body === '') {
               xhr.send();
             } else {
               xhr.send(body);
             }
           })
        .then((xhrResponse: XMLHttpRequest) => {
          return parseJSON(xhrResponse.responseText);
        });
  }
}