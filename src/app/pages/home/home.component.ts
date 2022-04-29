import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModeComponent } from 'src/app/componants/mode/mode.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  onPlayClick() {
    console.log('play');
    const dialogRef = this.dialog.open(ModeComponent, {
      width: '719px',
      maxHeight: '800px',
    });
    dialogRef.afterClosed().subscribe((data: string) => {
      console.log(data);

      this.router.navigate(['game', data]);
    });
  }
}
