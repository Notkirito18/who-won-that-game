import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fixture } from '../helpers/models';

@Injectable({
  providedIn: 'root',
})
export class FixturesService {
  constructor(private http: HttpClient) {}

  getFixturesFootballApi(season: number) {
    return this.http.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=2&season=' +
        season.toString(),
      {
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': environment.rapidApiKey,
        },
      }
    );
  }

  // saveFixture(fixture: Fixture | Fixture[]) {
  //   return this.http.post('http://localhost:5000/api/fixtures', fixture);
  // }

  getAllFixtures() {
    return this.http.get<{ fixtures: Fixture[] }>(
      'http://localhost:5000/api/fixtures',
      {
        headers: { key: environment.myApiKey },
      }
    );
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
