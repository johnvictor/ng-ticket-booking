import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
	@ViewChild('f') adminForm: NgForm;
	containsSpaces: boolean = false;

	theatre: {
		name: String,
		seats: Number,
		location: String
	}

  constructor(private adminService : AdminService) { }

  ngOnInit() {
  }

  onSubmit() {
  	let name = this.adminForm.value.name;
  	let seats = this.adminForm.value.seats;
  	let location = this.adminForm.value.location;

  	if(!name.trim() && !name.trim() && !name.trim()) {
  		this.containsSpaces = true;
  	} else {
  		this.containsSpaces = false;
  	}
  }
}
