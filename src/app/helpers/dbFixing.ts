// this.fixtureService.getFixtures().subscribe((result: any) => {
//   console.log('result from api raw', result);
//   for (let i = 0; i < result.response.length; i++) {
//     const fix = result.response[i];
//     this.fixtures.push(
//       new Fixture(
//         // fix.fixture.id,
//         fix.fixture.referee,
//         fix.fixture.date,
//         new League(
//           fix.league.id.toString(),
//           fix.league.name,
//           fix.league.round,
//           fix.league.logo
//         ),
//         new Venue(fix.fixture.venue.name, fix.fixture.venue.city),
//         fix.league.season,
//         new FixtureTeams(
//           new Team(
//             fix.teams.home.id.toString(),
//             fix.teams.home.name,
//             fix.teams.home.winner,
//             fix.teams.home.logo
//           ),
//           new Team(
//             fix.teams.away.id.toString(),
//             fix.teams.away.name,
//             fix.teams.away.winner,
//             fix.teams.away.logo
//           )
//         ),
//         {
//           home: fix.score.fulltime.home,
//           away: fix.score.fulltime.away,
//         }
//       )
//     );
//   }
//   console.log('my fixtures variable', this.fixtures);
//   //* saving to my database
//   this.fixtureService.saveFixture(this.fixtures.slice(0, 179)).subscribe(
//     (res) => {
//       console.log('saving res', res);
//       this.fixtureService.getMyFixtures().subscribe(
//         (res) => {
//           console.log('my data', res);
//         },
//         (error) => {
//           console.log('get error', error);
//         }
//       );
//     },
//     (error) => {
//       console.log('post error', error);
//     }
//   );
// });

//* update database

// let filteredMappedSorted = res.fixtures
//           // .filter((item) => {
//           //   return item.season == 2012;
//           // })
//           .map(
//             (
//               item
//             ): {
//               _id: string;
//               date: Date;
//               round: string;
//               home: string;
//               away: string;
//               leg: string;
//             } => {
//               return {
//                 _id: item._id,
//                 date: new Date(item.date),
//                 round: item.league.round,
//                 home: item.teams.home.name,
//                 away: item.teams.away.name,
//                 leg: '',
//               };
//             }
//           )
//           .sort((a, b) => {
//             return a.date.getTime() - b.date.getTime();
//           });
//         for (let i = 1; i < filteredMappedSorted.length; i++) {
//           for (let j = 0; j < filteredMappedSorted.length; j++) {
//             if (
//               filteredMappedSorted[i].home == filteredMappedSorted[j].away &&
//               filteredMappedSorted[j].home == filteredMappedSorted[i].away
//             ) {
//               filteredMappedSorted[j].leg = 'first leg';
//               filteredMappedSorted[i].leg = 'second leg';
//             }
//           }
//         }
//         const updatesObject: { _id: string; leg: string }[] =
//           filteredMappedSorted.map((x) => {
//             return { _id: x._id, leg: x.leg };
//           });
//         console.log('updatesObject', updatesObject);

// let intervalCount = 0;
// const myInerval = setInterval(() => {
//   intervalCount++;
//   const id = updatesObject[intervalCount]._id;
//   const fixtureToUpdate = res.fixtures.find((item) => item._id == id);
//   let updatedFixture: Fixture;
//   let stopMsg = 'ended';
//   if (fixtureToUpdate) {
//     updatedFixture = {
//       ...fixtureToUpdate,
//       league: {
//         ...fixtureToUpdate.league,
//         leg: updatesObject[intervalCount].leg,
//       },
//     };
//   } else {
//     updatedFixture = res.fixtures[0];
//     intervalCount = updatesObject.length;
//     stopMsg = 'stopped because couldnt init updatedFixture';
//   }
//   this.fixtureService.updateFixture(id, updatedFixture).subscribe(
//     (res) => {
//       console.log('updated', res, intervalCount);
//     },
//     (error) => {
//       console.log(error);
//       clearInterval(myInerval);
//       console.log('interval stopped :', 'server error', intervalCount);
//     }
//   );

//   if (intervalCount == updatesObject.length) {
//     clearInterval(myInerval);
//     console.log('interval stopped :', stopMsg, intervalCount);
//   }
// }, 100);

//* Fixing score
// const seasonToFix = 2020;
// this.fixtureService.getFixturesFootballApi(seasonToFix).subscribe(
//   (res: any) => {
//     const rounds = ['Final', 'Semi-finals', 'Quarter-finals', '8th Finals'];
//     const filterObject = res.response
//       .filter((item: any) => {
//         return (
//           item.score.extratime.home && rounds.includes(item.league.round)
//         );
//       })
//       .map((item: any) => {
//         return {
//           season: seasonToFix,
//           round: item.league.round,
//           date: item.fixture.date.toString().slice(0, 10),
//           home: item.teams.home.name,
//           away: item.teams.away.name,
//           score: item.score,
//         };
//       });
//     console.log('filterObject', filterObject);
//     this.fixtureService.getAllFixtures().subscribe((myData) => {
//       let updateArray: {
//         _id: string;
//         score: { home: number; away: number };
//         newScore: { home: number; away: number };
//         penaltyScore: { home: number | null; away: number | null };
//       }[] = [];
//       for (let i = 0; i < filterObject.length; i++) {
//         updateArray.push(
//           myData.fixtures
//             .filter((item) => {
//               return (
//                 item.season == filterObject[i].season &&
//                 item.date.toString().slice(0, 10) == filterObject[i].date &&
//                 item.teams.home.name == filterObject[i].home &&
//                 item.teams.away.name == filterObject[i].away &&
//                 item.league.round == filterObject[i].round
//               );
//             })
//             .map((item) => {
//               return {
//                 _id: item._id,
//                 score: item.score,
//                 newScore: filterObject[i].score.extratime,
//                 penaltyScore: filterObject[i].score.penalty,
//               };
//             })[0]
//         );
//       }
//       console.log('updateArray', updateArray);
//       let intervalCount = 0;
//       let intervalVariable = setInterval(() => {
//         console.log(intervalCount);
//         const updateObject = updateArray[intervalCount];
//         const fixtureToUpdate = myData.fixtures.find(
//           (item) => item._id == updateObject._id
//         );
//         if (fixtureToUpdate) {
//           if (updateObject.penaltyScore.home) {
//             this.fixtureService
//               .updateFixture(updateObject._id, {
//                 ...fixtureToUpdate,
//                 score: updateObject.newScore,
//                 penaltyScore: updateObject.penaltyScore,
//               })
//               .subscribe(
//                 (res) => {
//                   console.log('updated', res);
//                 },

//                 (er) => {
//                   console.log(er);
//                   clearInterval(intervalVariable);
//                   console.log('interval stopped because of request error');
//                 }
//               );
//           } else {
//             this.fixtureService
//               .updateFixture(updateObject._id, {
//                 ...fixtureToUpdate,
//                 score: updateObject.newScore,
//               })
//               .subscribe(
//                 (res) => {
//                   console.log('updated', res);
//                 },

//                 (er) => {
//                   console.log(er);
//                   clearInterval(intervalVariable);
//                   console.log('interval stopped because of request error');
//                 }
//               );
//           }
//         } else {
//           clearInterval(intervalVariable);
//           console.log('cleared at :', intervalCount);
//           console.log('fixtureToUpdate undefined');
//         }
//         intervalCount++;
//         if (intervalCount == filterObject.length) {
//           clearInterval(intervalVariable);
//           console.log('cleared at :', intervalCount);
//         }
//       }, 100);
//     });
//   },
//   (error) => {
//     console.log(error);
//   }
// );

//* new code for saving to backend
// this.fixtureService.getFixturesFootballApi(2010, 1).subscribe(
//   (res: any) => {
//     console.log(res);
//     const allFixtures = res.response;
//     let intervalIndex = 0;
//     this.dbInterval = setInterval(() => {
//       intervalIndex++;
//       const fixtureToAdd = new Fixture(
//         '',
//         allFixtures[intervalIndex].fixture.referee,
//         allFixtures[intervalIndex].fixture.date,
//         new League(
//           allFixtures[intervalIndex].league.id.toString(),
//           allFixtures[intervalIndex].league.name,
//           allFixtures[intervalIndex].league.round,
//           '',
//           allFixtures[intervalIndex].league.logo
//         ),
//         new Venue(
//           allFixtures[intervalIndex].fixture.venue.name,
//           allFixtures[intervalIndex].fixture.venue.city
//         ),
//         allFixtures[intervalIndex].league.season,
//         new FixtureTeams(
//           new Team(
//             allFixtures[intervalIndex].teams.home.id.toString(),
//             allFixtures[intervalIndex].teams.home.name,
//             allFixtures[intervalIndex].teams.home.winner,
//             allFixtures[intervalIndex].teams.home.logo
//           ),
//           new Team(
//             allFixtures[intervalIndex].teams.away.id.toString(),
//             allFixtures[intervalIndex].teams.away.name,
//             allFixtures[intervalIndex].teams.away.winner,
//             allFixtures[intervalIndex].teams.away.logo
//           )
//         ),
//         {
//           home: allFixtures[intervalIndex].score.fulltime.home,
//           away: allFixtures[intervalIndex].score.fulltime.away,
//         }
//       );
//       console.log('before saving', fixtureToAdd);
//       this.fixtureService.saveFixture(fixtureToAdd).subscribe(
//         (res) => {
//           console.log('count' + intervalIndex, res);
//         },
//         (error) => {
//           console.log('error from backend', error);
//         }
//       );
//     }, 300);
//   },
//   (error) => {
//     console.log('error from football api', error);
//   }
// );
