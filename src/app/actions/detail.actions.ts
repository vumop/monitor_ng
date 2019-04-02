export class GetDetail {
  static readonly type = "[Detail] Basic";
  constructor(public id: number) {}
}

export class ResetDetail {
  static readonly type = "[Detail] Reset";
}

export class GetFotos {
  static readonly type = "[Detail] Fotos";
  constructor(public id: number) {}
}

export class GetLpis {
  static readonly type = "[Detail] Lpis";
  constructor(public id: number) {}
}

