import { io } from '../routes';
import * as eth from './eth-core';

let lightHouseFuel;
let fuelUsed;

export async function init() {
  lightHouseFuel = 20;
  fuelUsed = 0;
  return true;
}

async function reduceFuel() {
  if ((lightHouseFuel - 1) <= 0) {
    // @TODO: game over state
    lightHouseFuel = 0;
    return false;
  }
  lightHouseFuel--;
  return true;
}

async function tick() {
  const state = await getState();
  io.emit('game event', JSON.stringify({ state }));

  await reduceFuel();
  return true;
}

export async function charge() {
  if (lightHouseFuel === 0) {
    return false;
  }
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

export async function getState() {
  const balance = await eth.getBalance({ cache: true });
  const reserveFuel = balance.minus(fuelUsed).toString(10);

  return {
    lightHouseFuel,
    reserveFuel,
  };
}

// main game loop
export async function start() {
  await init();
  return setInterval(tick, 1000);
}
