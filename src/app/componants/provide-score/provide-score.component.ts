import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fixture } from 'src/app/helpers/models';

@Component({
  selector: 'app-provide-score',
  templateUrl: './provide-score.component.html',
  styleUrls: ['./provide-score.component.scss'],
})
export class ProvideScoreComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProvideScoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fixture: Fixture }
  ) {}
  result!: string;
  // validInput = false;
  homeGoals!: number;
  awayGoals!: number;
  winner!: string;
  resultForm!: FormGroup;

  ngOnInit(): void {
    this.resultForm = this.fb.group({
      //*TODO add custom validator
      winner: ['', Validators.required],
      homeGoals: [null, [Validators.required, Validators.min(0)]],
      awayGoals: [null, [Validators.required, Validators.min(0)]],
    });
  }

  //* Makes sure the input giving by user is logical
  selectWinner() {
    if (
      this.homeGoals > this.awayGoals &&
      this.homeGoals != null &&
      this.awayGoals != null
    ) {
      this.winner = 'home';
    } else if (
      this.homeGoals < this.awayGoals &&
      this.homeGoals != null &&
      this.awayGoals != null
    ) {
      this.winner = 'away';
    } else if (
      this.homeGoals == this.awayGoals &&
      this.homeGoals != null &&
      this.awayGoals != null
    ) {
      this.winner = 'draw';
    }
  }

  goalsSelect(team: string, goalsNum: number) {
    if (team == 'home') {
      this.homeGoals = goalsNum;
    } else {
      this.awayGoals = goalsNum;
    }
    this.selectWinner();
  }

  validateInput(): boolean {
    let valid = true;
    if (
      this.homeGoals == undefined ||
      this.homeGoals < 0 ||
      this.homeGoals == null
    ) {
      valid = false;
    }
    if (
      this.awayGoals == undefined ||
      this.awayGoals < 0 ||
      this.awayGoals == null
    ) {
      valid = false;
    }
    if (!this.winner) {
      valid = false;
    }
    return valid;
  }

  opacityStyling(side: 'home' | 'away', number: number) {
    if (number > 0) {
      if (side == 'home') {
        if (this.homeGoals >= number) {
          return 1;
        } else {
          return 0.6;
        }
      } else {
        if (this.awayGoals >= number) {
          return 1;
        } else {
          return 0.6;
        }
      }
    } else {
      if (side == 'home') {
        if (this.homeGoals == 0) {
          return 1;
        } else {
          return 0.6;
        }
      } else {
        if (this.awayGoals == 0) {
          return 1;
        } else {
          return 0.6;
        }
      }
    }
  }
}
