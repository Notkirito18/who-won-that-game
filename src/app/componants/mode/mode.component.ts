import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.scss'],
})
export class ModeComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModeComponent>) {}

  ngOnInit(): void {}
}
