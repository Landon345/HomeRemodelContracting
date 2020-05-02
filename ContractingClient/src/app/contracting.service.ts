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
  private profileQuery = 'http://localhost:8000/ProfileQuery/?format=json';

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
  getSpecificProfile(username, password): Observable<Profile[]>{
    console.log(this.profileQuery + `&username=${username}&password=${password}`);
    return this.http.get<any>(this.profileQuery + `&username=${username}&password=${password}`)
    .pipe(
      tap(_=> console.log('fetched profile')),
      catchError(this.handleError<Profile>('getProfile', null))
    )
  }

  createProfile(profile: Profile): Observable<Profile>{
    console.log(profile.username);
    return this.http.post("http://localhost:8000/Profile/", JSON.stringify(profile), this.httpOptions)
    .pipe(
      tap((newProfile: any)=>console.log(`added profile w/ username=${newProfile.msg}`)),
      catchError(this.handleError<Profile>('createProfile'))
    )
  }
  createProfession(profession: Profession): Observable<Profession>{
    console.log(profession);
    return this.http.post("http://localhost:8000/Profession/", JSON.stringify(profession), this.httpOptions)
    .pipe(
      tap((newProfile: any)=>console.log(`added profile w/ username=${newProfile.msg}`)),
      catchError(this.handleError<Profile>('createProfile'))
    )
  }
  createSkills(myskill: string, username: string): Observable<Skill>{
    console.log(myskill);
    const skill = {id: null, myprofile: username, myprofession: myskill};
    console.log(skill);
    return this.http.post("http://localhost:8000/Skills/", JSON.stringify(skill), this.httpOptions)
    .pipe(
      tap((newSkills:any) => console.log(`added skills w/ myprofile=${newSkills.msg}`))
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