import { Directive, Input, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
	@Input() isSelected:boolean = false;
	@Input() isBooked:boolean = false;

	@HostListener('click') click(eventData: Event) {
		if(this.isSelected) {
  		this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  	} else {
  		this.render.setStyle(this.elementRef.nativeElement, 'background-color', 'green');
  	}

  	console.log(this.isSelected);
  	console.log(this.isBooked);
	}

  constructor(private render: Renderer2, private elementRef: ElementRef) { 
  		
  }

  ngOnInit() {
  	
  }
}
