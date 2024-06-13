import { Injectable, Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Uuid, Util, Device } from './Util';
import { environment } from '../environments/environment';

@Injectable()
export class BaseService {

  url: string = environment.apiUrl + '{0}?api-version=2.0';
  urlKeyed: string = environment.apiUrl + '{0}/{1}/?api-version=2.0';

  filterMap: any = {
    'app_id': 'ApplicationId',
    'application_id': 'ApplicationId',
    'store_id': 'CompanyId',
    'company_id': 'CompanyId',
    'worker_id': 'WorkerId',
    'group_id': 'GroupId',
    'object_id': 'ObjectId',
    'object_type': 'ObjectType',
    'catalog_id': 'CatalogId'
  };

  constructor(private http: HttpClient) {

  }

  getOrderByString(params: any) {
    var parts: string[] = [];

    if(!params) {
      return '';
    }

    for(var key in params)  {
      parts[parts.length] = key + ' ' + params[key] + '';
    }

    return (parts.length > 0 ? '&$orderby=' + parts.join(',') : '');
  }

  getFilterString(params: any): string {
    var parts: string[] = [];

    if(!params) {
      return '';
    }

    for(var key in this.filterMap) {
      if(key in params) {
        parts[parts.length] = this.filterMap[key] + ' eq ' + params[key] + '';
        delete params[key];
      }
    }

    for(var key in params)  {
      let paramValue: string = params[key];

      console.debug('param:');
      console.debug(paramValue);

      if(paramValue.startsWith('%') && paramValue.endsWith('%')) {
        parts[parts.length] = 'contains(' + key + ',\'' + paramValue.substring(1, paramValue.length - 1) + '\')';
      }
      else {
        parts[parts.length] = key + ' eq ' + params[key] + '';
      }
    }

    return (parts.length > 0 ? '&$filter=' + parts.join(' and ') : '');
  }

  getExpandString(params: any): string {
    var parts: string[] = [];

    if(!params) {
      return '';
    }

    for(var key in params)
    {
      parts[parts.length] = params[key];
    }

    return (parts.length > 0 ? '&$expand=' + parts.join(',') : '');
  }

  getCountString(params: any): string {
    var parts: string[] = [];

    if(!params) {
      return '';
    }

    for(var key in params)
    {
      parts[parts.length] = params[key];
    }

    return (parts.length > 0 ? '&$count=' + parts.join(',') : '');
  }

  get(path: string, params: any, options: any = {}, callbackError: Function = (error: any) => {}): Observable<any> {
    var req_url = this.url.replace('{0}', path) + this.getCountString(params.count) + this.getFilterString(params.filter) + this.getExpandString(params.expand) + this.getOrderByString(params.orderby);

    // DEBUG
    // console.debug('url is: ' + req_url);

    var req = this.http.get<any>(req_url, options);

    //req.subscribe();

    var res = req.pipe(
      map((data: any) => {
					return data;
				}
      ),
       // catchError(() => of([]))
       catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to GET:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  getRaw(url: string, options: any = {}, callbackError: Function = (error: any) => {}): Observable<any> {

    // DEBUG
    // console.debug('url is: ' + url);

    var req = this.http.get<any>(url, options);

    var res = req.pipe(
      map((data: any) => {
					return data;
				}
      ),
      // catchError(() => of([]))
      catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to raw GET:\n\n ' + err.message);
          }

          // return caught;
          throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  postRaw(url: string, record: any, options: any = {}, callbackError: Function = (error: any) => {}) {
    // DEBUG
    // console.debug('post:');
    // console.debug(record);

    let parts: any[] = [],
      isFormPost: boolean = false,
      contentType: string = "",
      body: any = '';

    if('Content-Type' in options) {
      if(options['Content-Type'] == 'application/x-www-form-urlencoded') {
        isFormPost = true;
      }
    }
    else {
      options['Content-Type'] = 'application/json';
    }

    if(isFormPost) {
      record = Util.toRecord(record);
        // console.debug('post (after toRecord):');
        // console.debug(record);

        // console.debug(url);

        Object.keys(record).forEach((key)=> {
          parts.push(key + '=' + encodeURIComponent(record[key]));
        });

        // console.debug(JSON.stringify(record));

        body = parts.join('&');
    }
    else {
      body = record;
    }

    var req = this.http.post<any>(url, body, options);

    // console.debug(body);

    var res = req.pipe(
      map((data: any) => {
          return data;
        }
      ),
      // catchError(() => of([]))
      catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to raw POST:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  observePostRaw(url: string, record: any, options: any = {}, callbackError: Function = (error: any) => {}): Observable<any> {
    return this.http.post<any>(url, record, options);
  }

  put(path: string, record: any, options: any = {}, callbackError: Function = (error: any) => {}) {
    // DEBUG
    // console.debug('put record:');
    // console.debug(record);

    var url: string = this.url.replace('{0}', path),
        req = this.http.put<any>(url, record, options);

    // console.debug(url);

    var res = req.pipe(
      map((data: any) => {
          return data;
        }
      ),
      // catchError(() => of([]))
      catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to PUT:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  patch(path: string, key: string, record: any, options: any = {}, callbackError: Function = (error: any) => {}) {
    // DEBUG
    // console.debug('patch record:');
    // console.debug(record);

    var url: string = this.urlKeyed.replace('{0}', path).replace('{1}', key),
        req = this.http.patch<any>(url, record, options);

    // console.debug(url);

    var res = req.pipe(
      map((data: any) => {
          return data;
        }
      ),
       // catchError(() => of([]))
       catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to PATCH:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  delete(path: string, key: string, options: any = {}, callbackError: Function = (error: any) => {}) {
    var url: string = this.urlKeyed.replace('{0}', path).replace('{1}', key),
        req = this.http.delete<any>(url, options);

    var res = req.pipe(
      map((data: any) => {
          return data;
        }
      ),
       // catchError(() => of([]))
       catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to DELETE:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  appGet(app_name: string, query: string = '', options: any = {}, callbackError: Function = (error: any) => {}): Observable<any> {
    var req_url = this.url.replace('{0}', app_name) + (query != '' ? '?' + query : '');
    req = this.http.get<any>(req_url, options);

    // DEBUG
    // console.debug('url is: ' + req_url);

    var req = this.http.get<any>(req_url);

    //req.subscribe();

    var res = req.pipe(
      map((data: any) => {
					return data;
				}
      ),
       // catchError(() => of([]))
       catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to app GET:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }

  appPost(path: string, record: any, options: any = {}, callbackError: Function = (error: any) => {}) {
    // DEBUG
    // console.debug('post:');
    // console.debug(record);

    var url: string = this.url.replace('{0}', path),
        req = this.http.post<any>(url, record, options);

    // console.debug(url);

    var res = req.pipe(
      map((data: any) => {
          return data;
        }
      ),
      // catchError(() => of([]))
      catchError(
        (err: any, caught: Observable<any>): any => {
          // DEBUG
          // console.debug(JSON.stringify(err));
          
          if(callbackError) {
            callbackError(err);
          }
          else {
            alert('Whoops, there was an error trying to app POST:\n\n ' + err.message);
          }

          return caught;
          // throw new Error(err.message);
        }
      ),
      // tap(
      //   data => console.log(data)
      // )
    );

    return res;
  }
}
