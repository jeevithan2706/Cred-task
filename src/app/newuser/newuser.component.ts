import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Gender , Status} from '../user.service'

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  gender: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  status: Status[] = [
    { value: 'active', viewvalue: 'Active' },
    { value: 'inactive', viewvalue: 'InActive' }
  ]

  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      id: ["123124", Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.dataForm.value;
    console.log(formData);
    // this.route.navigate(['userdata']);
    this.http.post('https://gorest.co.in/public/v2/users?access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd', formData).subscribe(
      (response) => {
        this.route.navigate(['/home/userdata']);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
