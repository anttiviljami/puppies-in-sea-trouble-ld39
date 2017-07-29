import * as express from 'express';

const app = express();

export default function getInstance() {
  return app;
}
