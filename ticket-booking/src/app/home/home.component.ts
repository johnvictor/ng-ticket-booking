import { Component, OnInit, ViewChild } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { SeatStatusComponent } from '../home/seat-status/seat-status.component';
import { CalcBoardComponent } from '../home/calc-board/calc-board.component';
import { TheatreService } from '../theatre.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  seats: any;
  theatres: any;
  defaultTheatre: any;
  theatreError: boolean = false;

	@ViewChild(SeatStatusComponent) seatStatusComponent: SeatStatusComponent;
	@ViewChild(CalcBoardComponent) calcBoardComponent: CalcBoardComponent;

	constructor(private calculationService: CalculationService, private theatreService: TheatreService) {

	}

	ngOnInit() {
		this.seats = this.initSeats();
		this.theatres = this.getTheatresList();
  }

  getTheatresList() {
  	this.theatreError = false;

  	this.theatreService.getTheareList({
  		path: 'theatre/list'
  	}).subscribe(
  		(response) => {
  			if(response.length > 0) {
  				this.theatres = response;
	  			this.defaultTheatre = this.theatres[0]._id;
	  			this.theatreService.selectedTheatreId = this.defaultTheatre;
					this.getSeatDetails(this.defaultTheatre);
  			} else {
  				this.theatreError = true;
  			}

  		},
  		(error) => {

  		}
  	);
  }

  initSeats() {
		let seats = [];
		let rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
		if(this.seatStatusComponent) {
			this.seatStatusComponent.reset();
		}
		if(this.calcBoardComponent) {
			this.calcBoardComponent.resetBill();
		}
	}

	onChange(theatreId) {
		this.theatreService.selectedTheatreId = theatreId;
		this.getSeatDetails(theatreId);
	}

	getSeatDetails(theatreId) {
		let self = this;

		this.reset();

		self.theatreService.getSeatDetails({
  		path: 'seat/status/' + theatreId
  	}).subscribe(
  		(response) => {
  			response.bookedSeats.forEach(function(item) {

  				let row = _.find(self.seats, function(seat){ 
  					return seat.row == item.row;
  				});
  				let column = _.filter(row.columns, function(col) {
  					return item.seatNos.indexOf(col.no) !== -1;
  				});

  				_.each(column, function(col) {
  					col.isSelected = true;
  					col.isBooked = true;
  				});

  				self.calculationService.updateSeat.next();
					self.calcBoardComponent.resetBill();
  			});
  		},
  		(error) => {

  		}
  	)
	}

}
