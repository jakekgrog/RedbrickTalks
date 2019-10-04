import { Injectable } from '@angular/core';

const generateServerId = () => {
  return Math.random().toString(36).substring(7);
};

@Injectable()
export class Globals {
  serverId = generateServerId();
}
