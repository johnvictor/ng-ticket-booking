import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { SeatStatusComponent } from '../home/seat-status/seat-status.component';
import { CalcBoardComponent } from '../home/calc-board/calc-board.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  seats: any;

	@ViewChild(SeatStatusComponent) seatStatusComponent: SeatStatusComponent;
	@ViewChild(CalcBoardComponent) calcBoardComponent: CalcBoardComponent;

	constructor(private calculationService: CalculationService) {

	}

	ngOnInit() {
  	this.seats = this.initSeats();
  }

  initSeats() {
		let seats = [];
		let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		let colomns = [];

		for(let i = 0; i < 8; i++) {

			colomns = [];
			for(let j = 1; j <=12; j++) {
				colomns.push({
					no: j,
					isSelected: false,
					isBooked: false
				});
			}

			seats.push({
				row: rows[i],
				columns: colomns
			});
		}

		return seats;
	}

	reset() {
		this.seats = this.initSeats();
		this.seatStatusComponent.reset();
		this.calcBoardComponent.resetBill();
	}

}
