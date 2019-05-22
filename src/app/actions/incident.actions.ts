export class GetIncident {
  static readonly type = "[Incident] Get";
}

export class SortIncident {
  static readonly type = "[Incident] Sort";
  constructor(public payload: object) {}
}

export class PageIncident {
  static readonly type = "[Incident] Page";
  constructor(public payload: object) {}
}

export class FilterIncident {
  static readonly type = "[Incident] Filter";
  constructor(public payload: string | Date, public type: string) {}
}

export class CreateIncident {
  static readonly type = "[Incident] Create";
  constructor(public payload: object) {}
}

export class AddImage {
  static readonly type = "[Incident] Add Image";
  constructor(public payload: object, public idIncident: number) {}
}
