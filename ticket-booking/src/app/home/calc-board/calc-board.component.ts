import { Component, OnInit, Input } from '@angular/core';
import { CalculationService } from '../../calculation.service';

@Component({
  selector: 'app-calc-board',
  templateUrl: './calc-board.component.html'
})
export class CalcBoardComponent implements OnInit {
	@Input() seats: any;
	
	selectedSeatsCount: number;

	totalAmount: number = 0;

  constructor(private calculationService : CalculationService) { }

  ngOnInit() {
  	this.calculationService.updateSeat.subscribe(() => {
  			this.calculateBill();
  	});
  }

  resetBill() {
  	this.selectedSeatsCount = 0;
		this.totalAmount = 0;
  }

  calculateBill() {
		let totalAmount = 0,
				selectedSeatsCount = 0;
		this.seats.forEach(function(seat) {
			seat.columns.forEach(function(col) {
				if(col.isSelected) {
					totalAmount+=100;
					selectedSeatsCount++;
				}
			});
		});

		this.totalAmount = totalAmount;
		this.selectedSeatsCount = selectedSeatsCount;
  }

}