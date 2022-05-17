import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModeComponent } from 'src/app/componants/mode/mode.component';
import {
  Fixture,
  FixtureTeams,
  League,
  Team,
  Venue,
} from 'src/app/helpers/models';
import { FixturesService } from 'src/app/services/fixtures.service';
import { getRandomFixture } from 'src/app/helpers/helper';
import { HowItWorksComponent } from 'src/app/componants/how-it-works/how-it-works.component';
import { AboutComponent } from 'src/app/componants/about/about.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fixtureService: FixturesService
  ) {}

  fixtures!: Fixture[];
  infoFixtures: Fixture[] = [];
  infoInterval!: any;
  dbInterval!: any;

  ngOnInit(): void {
    this.fixtureService.getAllFixtures().subscribe((data) => {
      this.fixtures = data.fixtures;
      for (let i = 0; i < 4; i++) {
        this.infoFixtures.push(this.getRandomFixture(this.fixtures));
      }
      this.infoInterval = setInterval(() => {
        this.infoFixtures.push(this.getRandomFixture(this.fixtures));
        var elem = document.getElementById('data');
        elem ? (elem.scrollTop = elem.scrollHeight) : elem;
      }, 3000);
    });
  }

  onPlayClick() {
    console.log('play');
    const dialogRef = this.dialog.open(ModeComponent, {
      width: '719px',
      maxHeight: '800px',
    });
    dialogRef.afterClosed().subscribe((data: string) => {
      console.log(data);
      if (data) this.router.navigate(['game', data]);
    });
  }

  onHowClick() {
    console.log('play');
    const dialogRef = this.dialog.open(HowItWorksComponent, {
      width: '719px',
      maxHeight: '800px',
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  onAboutClick() {
    console.log('play');
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '719px',
      maxHeight: '800px',
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  ngOnDestroy(): void {
    if (this.infoInterval) clearInterval(this.infoInterval);
    if (this.dbInterval) clearInterval(this.dbInterval);
  }

  clearFunction() {
    if (this.infoInterval) clearInterval(this.infoInterval);
  }
  getRandomFixture = getRandomFixture;
}
