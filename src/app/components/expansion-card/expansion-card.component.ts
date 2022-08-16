import { Component, Input, OnInit, Output } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expansion-card',
  templateUrl: './expansion-card.component.html',
  styleUrls: [],
})
export class ExpansionCardComponent implements OnInit {
  @Input() header!: string;
  open: boolean = true;
  downIcon = faAngleDown;

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.open = !this.open;
  }
}
