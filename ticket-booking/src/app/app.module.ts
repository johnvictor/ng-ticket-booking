import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CalcBoardComponent } from './home/calc-board/calc-board.component';
import { SeatStatusComponent } from './home/seat-status/seat-status.component';
import { SeatHierarchyComponent } from './home/seat-hierarchy/seat-hierarchy.component';
import { HighlightDirective } from './highlight.directive';
import { CalculationService } from './calculation.service';
import { AdminService } from './admin.service';
import { TheatreService } from './theatre.service';
import { RouterConfig } from './router.module';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    CalcBoardComponent,
    SeatStatusComponent,
    SeatHierarchyComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    RouterConfig,
    FormsModule,
    HttpModule,

  ],
  providers: [
    CalculationService, 
    AdminService,
    TheatreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
