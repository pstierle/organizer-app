import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: [],
})
export class ContainerComponent implements OnInit {
  @Input() header: string = '';

  constructor() {}

  ngOnInit(): void {}
}
