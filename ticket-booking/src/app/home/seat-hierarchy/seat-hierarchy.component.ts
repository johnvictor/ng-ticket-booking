import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalculationService } from '../../calculation.service';

@Component({
  selector: 'app-seat-hierarchy',
  templateUrl: './seat-hierarchy.component.html'
})
export class SeatHierarchyComponent {
	@Input() seats: any;
	@Output() resetEvent = new EventEmitter<any>();

  constructor(private calculationService: CalculationService) { }

	seatClick(column) {
		column.isSelected = !column.isSelected;
		this.calculationService.updateSeat.next();
	}

	reset() {
		this.resetEvent.emit();
	} 

	book() {
		let seats = this.seats;
		seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(col.isSelected) {
					col.isBooked = true;
				}
			});
		});

		this.calculationService.updateSeat.next();
	}

}
