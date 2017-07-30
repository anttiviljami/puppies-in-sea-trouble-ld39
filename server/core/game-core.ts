import * as _ from 'lodash';
import { io } from '../routes';
import * as eth from './eth-core';
import * as crypto from 'crypto';
import * as logger from 'winston';

import config from '../config';

import * as knexInstance from '../util/knex';
const knex = knexInstance.connect();

let serverStarted;
let lightHouseFuel;
let fuelUsed;
let deadPuppies;
let savedPuppies;
let sailingPuppies;
let lastPuppy;

export async function reset() {
  // initial values
  serverStarted = Date.now();
  lightHouseFuel = 20;
  fuelUsed = 0;
  savedPuppies = 0;
  deadPuppies = 0;
  sailingPuppies = [];
  lastPuppy = 0;
  await saveGameState();
  logger.info('Game has been reset');
}

async function saveGameState() {
  // save to database
  logger.silly('Saving game state...');
  return knex('config')
    .insert({
      key: 'state',
      value: {
        serverStarted,
        lightHouseFuel,
        fuelUsed,
        savedPuppies,
        deadPuppies,
        sailingPuppies,
        lastPuppy,
      },
    }).catch(() => knex('config').where({key: 'state'})
    .update('value', {
      serverStarted,
      lightHouseFuel,
      fuelUsed,
      savedPuppies,
      deadPuppies,
      sailingPuppies,
      lastPuppy,
    }));
}

async function init() {
  const res = await knex('config').select('value').where({key: 'state'});
  if (config.RESET_ON_START || !res[0] || !res[0].value) {
    await reset();
  } else {
    const state = res[0].value;
    logger.info('server started', config);

    serverStarted = state.serverStarted;
    lightHouseFuel = state.lightHouseFuel;
    fuelUsed = state.fuelUsed;
    savedPuppies = state.savedPuppies;
    deadPuppies = state.deadPuppies;
    sailingPuppies = state.sailingPuppies;
    lastPuppy = state.lastPuppy;
  }

  return true;
}

async function reduceFuel() {
  if ((lightHouseFuel - 1) < 0) {
    lightHouseFuel = 0;
    return false;
  } else {
    lightHouseFuel--;
  }
  return true;
}

async function tick() {
  if (--lastPuppy < 0 && Math.floor(Math.random() * 5) === 0) {
    // randomly add a new puppy
    await newPuppy();
    // don't spawn a puppy for 2 ticks
    lastPuppy = 2;
  }

  // check whether puppies have been saved or drowned
  const expiredPuppies = sailingPuppies
    .filter((puppy) => (getServerTime() - puppy.spawned) > 35000)
    .forEach((puppy) => {
      if (lightHouseFuel === 0) {
        deadPuppies++;
      } else {
        savedPuppies++;
      }
    });

  sailingPuppies = sailingPuppies
    .filter((puppy) => (getServerTime() - puppy.spawned) <= 35000);

  const state = await getState();
  io.emit('game event', JSON.stringify({ state }));

  await reduceFuel();
  await saveGameState();
  return true;
}

async function newPuppy() {
  const spawned = getServerTime();
  const variant = Math.floor(Math.random() * 3);
  const id = crypto.createHash('md5').update(`puppy-${getServerTime()}`).digest('hex');
  return sailingPuppies.push({ id, spawned, variant });
}

export async function charge() {
  if ((lightHouseFuel + 5) > 20) {
    fuelUsed += 20 - lightHouseFuel;
    lightHouseFuel = 20;
  } else {
    lightHouseFuel += 5;
    fuelUsed += 5;
  }
  const state = await getState();
  return true;
}

export function getServerTime() {
  return Date.now() - serverStarted;
}

export async function getState() {
  const serverTime = getServerTime();
  const players = io.engine.clientsCount;
  const puppies = {
    sailingPuppies,
    deadPuppies,
    savedPuppies,
  };

  return {
    players,
    serverTime,
    lightHouseFuel,
    puppies,
  };
}

// main game loop
export async function start() {
  await init();
  return setInterval(tick, 1000);
}
