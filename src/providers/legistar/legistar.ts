/**
 * @author    Drake Witt <dwitt@dranweb.com>
 * @copyright Copyright (c) 2017
 * @license   Apache-2.0
 *
 * local-rep-storage.ts
 * Date Created: 10/18/17
 * Date Modified: 10/26/17
 *
 * Provider that communicates with Legistar
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class LegistarProvider {

  constructor(public http: Http) {}

  getMatters() {
    return this.http.get('http://webapi.legistar.com/v1/Lexington/Matters?$orderby=MatterId desc&$top=30')
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAttachments(matter) {
    return this.http.get('http://webapi.legistar.com/v1/Lexington/Matters/' + matter.MatterId + "/Attachments")
    .map(res => res.json())
    .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}