export class Login {
  static readonly type = "[USer] Login";
  constructor(public username: string, public password: string) {}
}

export class Logout {
  static readonly type = "[User] Logout";
}

export class LostPass {
  static readonly type = "[User] LostPass";
  constructor(public email: string) {}
}
