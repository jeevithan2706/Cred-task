import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface Gender {
  value: string;
  viewValue: string;
}
export interface Status {
  value: string;
  viewvalue: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setUserForUpdate(user: any) {
    sessionStorage.setItem('userForUpdate', JSON.stringify(user));
  }
  getUserForUpdate() {
    return JSON.parse(sessionStorage.getItem('userForUpdate') ?? 'null');
  }
}

