import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CountryModel, HobbyModel, StateModel, UserModelResponse } from '../models/dtos';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private baseUrl = 'https://w320028.ferozo.com';
  constructor(private http: HttpClient) { }


  getCountries(): Observable<CountryModel[]> {
    const tokenData = localStorage.getItem('currentUser');
    const tokenReplaced = tokenData?.replace('"','');
    const newToken = tokenReplaced?.replace('"','')
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${newToken}`,
    });     
     
    return this.http.get<any[]>(`${this.baseUrl}/Country`,{headers: reqHeaders});
  }

  updateProfile(updatedProfile: UserModelResponse): Observable<any> {
    const tokenData = localStorage.getItem('currentUser');
    const tokenReplaced = tokenData?.replace('"','');
    const newToken = tokenReplaced?.replace('"','')
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${newToken}`,
    });     
  
   
    return this.http.put(`${this.baseUrl}/api/User/profile`, updatedProfile, { headers: reqHeaders });
  }
  
  getStates(countryId: number): Observable<StateModel[]> {
    const tokenData = localStorage.getItem('currentUser');
    const tokenReplaced = tokenData?.replace('"','');
    const newToken = tokenReplaced?.replace('"','')
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${newToken}`,
    });     
      
    return this.http.get<any[]>(`${this.baseUrl}/Country/${countryId}/states`,{headers: reqHeaders});
  }
  getHobbies(): Observable<HobbyModel[]> {
    const tokenData = localStorage.getItem('currentUser');
    const tokenReplaced = tokenData?.replace('"','');
    const newToken = tokenReplaced?.replace('"','')
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${newToken}`,
    });    
    
    return this.http.get<any[]>(`${this.baseUrl}/api/Hobby`,{headers: reqHeaders});
  }
  getProfile() : Observable<UserModelResponse>{
    const tokenData = localStorage.getItem('currentUser');
    const tokenReplaced = tokenData?.replace('"','');
    const newToken = tokenReplaced?.replace('"','')
    const reqHeaders = new HttpHeaders({
      Authorization: `Bearer ${newToken}`,
    });    

    console.log(newToken);
   
    
    return this.http.get<UserModelResponse>(`${this.baseUrl}/api/User/profile`,{headers:reqHeaders});
  }
}
