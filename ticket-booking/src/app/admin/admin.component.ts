import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ITheatre } from './theatre.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
	@ViewChild('f') adminForm: NgForm;
	containsSpaces: boolean = false;
  success: boolean = false;
  errorMessage: string;

	theatre: ITheatre;

  constructor(private adminService : AdminService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.success = false;
    this.errorMessage = null;

  	let name = this.adminForm.value.name;
  	let seats = this.adminForm.value.seats;
  	let location = this.adminForm.value.location;

  	if(!name.trim() && !name.trim() && !name.trim()) {
  		this.containsSpaces = true;
  	} else {
  		this.containsSpaces = false;


  		this.adminService.add({path: 'theatre/add', data: {
        name: name,
        seats: 96,
        location: location
      }}).subscribe(
          (data) => {
              if(!data.error) {
                this.success = true;
                this.adminForm.reset();
              } else {
                this.errorMessage = data.error;
              }
          },
          (error) => {

          }
      );
  	}
  }
}
