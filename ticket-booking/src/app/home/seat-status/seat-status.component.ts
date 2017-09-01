import { Component, OnInit, Input } from '@angular/core';
import { CalculationService } from '../../calculation.service';

@Component({
  selector: 'app-seat-status',
  templateUrl: './seat-status.component.html'
})
export class SeatStatusComponent implements OnInit {
	@Input() seats: any;

	totalSeatsCount: number = 0;
	availableSeatsCount: number = 0;
	bookedSeatsCount: number = 0;
  
  constructor(private calculationService: CalculationService) { 
  	this.calculationService.updateSeat.subscribe(() => {
  			this.updateBookedSeatsCount();
  			this.updateAvailableTicketCount();
  	});
  }

  reset() {
  	this.updateTotalSeatsCount();
  	this.bookedSeatsCount = 0;
  }

  ngOnInit() {
  	this.updateTotalSeatsCount();
  }

	updateTotalSeatsCount() {
		let totalSeatsCount = 0
		this.seats.forEach(function(seat) {
			totalSeatsCount += seat.columns.length
		});

		this.totalSeatsCount = totalSeatsCount;
		this.availableSeatsCount = totalSeatsCount;
		
	}

	updateBookedSeatsCount() {
		let bookedSeatsCount = 0;
		this.seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(col.isBooked) {
					bookedSeatsCount++;
				}
			});
		});

		this.bookedSeatsCount = bookedSeatsCount;
	}

	updateAvailableTicketCount() {
		let availableSeatsCount = 0;
		this.seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(!col.isSelected) {
					availableSeatsCount++;
				}
			});
		});

		this.availableSeatsCount = availableSeatsCount;
	}

}