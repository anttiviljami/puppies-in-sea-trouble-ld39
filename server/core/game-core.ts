import { io } from '../routes';
import * as eth from './eth-core';
import * as crypto from 'crypto';

let serverStarted;
let lightHouseFuel;
let fuelUsed;
let deadPuppies;
let savedPuppies;
let sailingPuppies;
let lastPuppy;

export async function init() {
  serverStarted = Date.now();
  lightHouseFuel = 20;
  fuelUsed = 0;
  savedPuppies = 0;
  deadPuppies = 0;
  sailingPuppies = [];
  lastPuppy = 0;
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
  const balance = await eth.getBalance({ cache: true });
  const reserveFuel = balance.minus(fuelUsed).toString(10);
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
    reserveFuel,
    puppies,
  };
}

// main game loop
export async function start() {
  await init();
  return setInterval(tick, 1000);
}
