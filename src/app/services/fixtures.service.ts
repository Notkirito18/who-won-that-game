import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fixture } from '../helpers/models';

@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  constructor(private http: HttpClient) {}

  getFixturesFootballApi(season: number, league: number) {
    return this.http.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=' +
        league +
        '&season=' +
        season.toString(),
      {
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': environment.rapidApiKey,
        },
      }
    );
  }

  saveFixture(fixture: Fixture) {
    return this.http.post('http://localhost:5000/api/fixtures', fixture, {
      headers: { key: environment.myApiKey },
    });
  }

  getAllFixtures(league?: number) {
    const url = league
      ? 'http://localhost:5000/api/fixtures' + '?league._id=' + league
      : 'http://localhost:5000/api/fixtures';

    return this.http.get<{ fixtures: Fixture[] }>(url, {
      headers: { key: environment.myApiKey },
    });
  }

  updateFixture(fixtureId: string, updatedFixture: Fixture) {
    return this.http.patch(
      'http://localhost:5000/api/fixtures/' + fixtureId,
      updatedFixture,
      {
        headers: { key: environment.myApiKey },
      }
    );
  }
}
