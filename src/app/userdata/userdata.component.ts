import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewuserComponent } from '../viewuser/viewuser.component';
import { forkJoin } from 'rxjs';
import { User } from '../user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css'],
  providers: [HttpClient,
    { provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class UserdataComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'actions'];
  accessToken: string = '47156652da46377d7dd1396be3bbc59bbb0a79a61146b9ab0668f7c2a9a143dd'

  constructor(
    private http: HttpClient,
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private route: Router,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngAfterViewInit(): Promise<void> {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<User>([]);
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl1 = `https://gorest.co.in/public/v2/users?access-token=${this.accessToken}`;
    const apiUrl2 = `https://gorest.co.in/public/v2/users?page=2&per_page=90&access-token=${this.accessToken}`;

    // Use forkJoin to make both API calls simultaneously
    forkJoin(
      this.http.get<User[]>(apiUrl1),
      this.http.get<User[]>(apiUrl2)
    ).subscribe(
      data => {
        // Concatenate the data arrays from both APIs into a single array
        const mergedData = data[0].concat(data[1]);

        this.dataSource.data = mergedData;
        this.dataSource.paginator = this.paginator;
      },
      error => console.error(error)
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  //Delete function
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.http.delete('https://gorest.co.in/public/v2/users/' +
        id +
        `?access-token=${this.accessToken}`).subscribe(
          (response) => {
            // Show an alert message with the deleted user ID
            alert(`User ${id} deleted successfully`);

            //Reload the page to see the updates
            window.location.reload();
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  //Update function
  onUpdate(user: any) {
    this.userService.setUserForUpdate(user);
    this.route.navigate(['/home/updatedata']);
  }

  //View function
  onView(user: any): void {
    this.userService.setUserForUpdate(user);
    const dialogRef = this.dialog.open(ViewuserComponent, {
      width: '30%',
      data: { user: user }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
