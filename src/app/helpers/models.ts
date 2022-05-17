export class Fixture {
  constructor(
    public _id: string,
    public referee: string,
    public date: Date,
    public league: League,
    public venue: Venue,
    public season: number,
    public teams: FixtureTeams,
    public score: { home: number; away: number },
    public penaltyScore?: { home: number | null; away: number | null }
  ) {}
}

export class League {
  constructor(
    public _id: string,
    public name: string,
    public round: string,
    public leg: string,
    public logo?: string
  ) {}
}
export class Venue {
  constructor(public stadium: string, public city: string) {}
}
export class FixtureTeams {
  constructor(public home: Team, public away: Team) {}
}
export class Team {
  constructor(
    public _id: string,
    public name: string,
    public winner: boolean,
    public logo: string
  ) {}
}

export class leagueId {
  constructor(public id: number, public league: string) {}
}
// {
//   "get": "fixtures",
//   "parameters": {
//     "live": "all"
//   },
//   "errors": [],
//   "results": 4,
//   "paging": {
//     "current": 1,
//     "total": 1
//   },
//   "response": [
//     {
//       "fixture": {
//         "id": 239625,
//         "referee": null,
//         "timezone": "UTC",
//         "date": "2020-02-06T14:00:00+00:00",
//         "timestamp": 1580997600,
//         "periods": {
//           "first": 1580997600,
//           "second": null
//         },
//         "venue": {
//           "id": 1887,
//           "name": "Stade Municipal",
//           "city": "Oued Zem"
//         },
//         "status": {
//           "long": "Halftime",
//           "short": "HT",
//           "elapsed": 45
//         }
//       },
//       "league": {
//         "id": 200,
//         "name": "Botola Pro",
//         "country": "Morocco",
//         "logo": "https://media.api-sports.io/football/leagues/115.png",
//         "flag": "https://media.api-sports.io/flags/ma.svg",
//         "season": 2019,
//         "round": "Regular Season - 14"
//       },
//       "teams": {
//         "home": {
//           "id": 967,
//           "name": "Rapide Oued ZEM",
//           "logo": "https://media.api-sports.io/football/teams/967.png",
//           "winner": false
//         },
//         "away": {
//           "id": 968,
//           "name": "Wydad AC",
//           "logo": "https://media.api-sports.io/football/teams/968.png",
//           "winner": true
//         }
//       },
//       "goals": {
//         "home": 0,
//         "away": 1
//       },
//       "score": {
//         "halftime": {
//           "home": 0,
//           "away": 1
//         },
//         "fulltime": {
//           "home": null,
//           "away": null
//         },
//         "extratime": {
//           "home": null,
//           "away": null
//         },
//         "penalty": {
//           "home": null,
//           "away": null
//         }
//       }
//     }
//   ]
// }
