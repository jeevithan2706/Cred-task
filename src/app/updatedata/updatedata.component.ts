import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Gender , Status} from '../user.service'


@Component({
  selector: 'app-updatedata',
  templateUrl: './updatedata.component.html',
  styleUrls: ['./updatedata.component.css']
})
export class UpdatedataComponent implements OnInit {
  gender: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  status: Status[] = [
    { value: 'active', viewvalue: 'Active' },
    { value: 'inactive', viewvalue: 'InActive' }
  ]
  user: any = {};

  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder
    , private http: HttpClient
    , private route: Router
    , private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUserForUpdate();
    //console.log(this.user.id)
    this.dataForm = this.fb.group({
      id: [this.user.id, Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender, Validators.required],
      status: [this.user.status, Validators.required],
    });
  }

  onSubmit() {
    const formData = this.dataForm.value;
    let id: number;
    const idFormControl = this.dataForm.get('id');
    if (idFormControl) {
      id = idFormControl.value;
    }
    // console.log(formData);
    // console.log(id!);

    // Remove the id control from the dataForm FormGroup
    this.dataForm.removeControl('id');
    this.http.put('https://gorest.co.in/public/v2/users/' +
      id! +
      '?access-token=47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd', formData).subscribe(
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
