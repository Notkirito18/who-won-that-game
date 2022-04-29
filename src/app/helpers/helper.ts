import { Fixture, Team } from './models';

export const getRandomFixture = (fixtures: Fixture[]): Fixture => {
  const random = getRandomNum(0, fixtures.length - 1);
  return fixtures[random];
};

export const nextRandomFixture = (fixtures: Fixture[], homeTeamId: string) => {
  const teamFixtures = fixtures.filter((item) => {
    return item.teams.home._id == homeTeamId;
  });
  const random = getRandomNum(0, teamFixtures.length - 1);
  return teamFixtures[random];
};

export const getRandomNum = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Math.floor(a + Math.random() * (b - a + 1));
