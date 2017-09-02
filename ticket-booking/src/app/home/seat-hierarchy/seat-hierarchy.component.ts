import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalculationService } from '../../calculation.service';
import { TheatreService } from '../../theatre.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-seat-hierarchy',
  templateUrl: './seat-hierarchy.component.html'
})
export class SeatHierarchyComponent {
	@Input() seats: any;
	@Output() resetEvent = new EventEmitter<any>();
	alreadyBooked: boolean = false;
	bookedSuccess: boolean = false;

  constructor(private calculationService: CalculationService, private theatreService: TheatreService) { }

	seatClick(column) {
		if(!column.isBooked) {
			this.alreadyBooked = false;
			column.isSelected = !column.isSelected;
			this.calculationService.updateSeat.next();	
		} else {
			this.alreadyBooked = true;
		}
	}

	reset() {
		this.bookedSuccess = false;
		this.alreadyBooked = false;
		
		this.resetEvent.emit();
		let data = {
			"theatreId": this.theatreService.selectedTheatreId,
			"seats": []
		};

		this.theatreService.bookSeats({
			path: 'seat/book',
			data: data
		}).subscribe(
			(response) => {
				console.log(response);
			},
			(error) => {
			}
		);
	} 

	book() {
		this.bookedSuccess = false;

		let seats = this.seats;
		let requestSeats = [];

		seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(col.isSelected) {
					col.isBooked = true;
				}
			});

			let hasSelectedSeats = _.filter(seat.columns, function(col) { return col.isBooked});
			if(hasSelectedSeats.length > 0) {
				let seatNos = [];
				_.each(hasSelectedSeats, function(seat) {
					seatNos.push(seat.no);
				});

				requestSeats.push({
					row: seat.row,
					seatNos: seatNos
				});
			}
		});

		this.calculationService.updateSeat.next();

		let data = {
			"theatreId": this.theatreService.selectedTheatreId,
			"seats": requestSeats
		};

		this.theatreService.bookSeats({
			path: 'seat/book',
			data: data
		}).subscribe(
			(response) => {
				if(!response.error) {
					this.bookedSuccess = true;
				}
			},
			(error) => {
			}
		);
	}

}
