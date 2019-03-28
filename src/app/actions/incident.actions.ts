import { Incident } from './../models/incident.model';

export class GetIncident {
  static readonly type = '[Incident] Get';
}

export class SortIncident {
  static readonly type = '[Incident] Sort';
  constructor(public payload: object) {}
}

export class PageIncident {
  static readonly type = '[Incident] Page';
  constructor(public payload: object) {}
}
/**
 * 
 * 
 * 
 * 
 */
export class AddIncident {
  static readonly type = '[Incident] Add';

  constructor(public payload: Incident) {}
}

export class RemoveIncident {
  static readonly type = '[Incident] Remove';

  constructor(public payload: string) {}
}
