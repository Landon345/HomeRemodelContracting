import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Profile} from './Interfaces/Profile';
import {Profession} from './Interfaces/Profession';
import {Skill} from './Interfaces/Skill';

@Injectable({
  providedIn: 'root'
})
export class ContractingService {

  private profileUrl = 'http://localhost:8000/Profile/?format=json';
  private professionUrl = 'http://localhost:8000/Profession/?format=json';
  private skillUrl = 'http://localhost:8000/Skills/?format=json';

  //define headers
  httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/json'})
  }
  //create a HttpClient named http
  constructor(private http: HttpClient) { }

  /**
   * Get the profiles from the server
   */
  getProfiles(): Observable<Profile[]>{
    return this.http.get<any>(this.profileUrl)
    .pipe(
      tap(_=> console.log('fetched profiles')),
      catchError(this.handleError<Profile[]>('getProfiles', []))
    )
  }

  /**
   * get the professions from the server
   */
  getProfessions(): Observable<Profession[]>{
    return this.http.get<any>(this.professionUrl)
    .pipe(
      tap(_=> console.log('fetched professions')),
      catchError(this.handleError<Profession[]>('getProfession', []))
    )
  }
  /**
   * get the Skills from the server
   */
  getSkills(): Observable<Skill[]>{
    return this.http.get<any>(this.skillUrl)
    .pipe(
      tap(_=> console.log('fetched skills')),
      catchError(this.handleError<Skill[]>('getSkills', []))
    )
  }

  
  
  /**
   * Handle Http operation that failed.
   * Let the app continue
   * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
handleError<T> (operation = 'operation', result?:T){
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); //log to console instead
    
    //TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
    
    // Let the app keep running by returning an empty result.
    return of(result as T);
  }
}

}