import { Incident } from './../models/incident.model';

export class GetIncident {
  static readonly type = '[Incident] Get';
}

export class AddIncident {
  static readonly type = '[Incident] Add';

  constructor(public payload: Incident) {}
}

export class RemoveIncident {
  static readonly type = '[Incident] Remove';

  constructor(public payload: string) {}
}
