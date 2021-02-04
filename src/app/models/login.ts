export class Login {
    constructor(
      public email: string,
      public password: string,
      public rememberMe: boolean,
    ) {
      this.email = email;
      this.password = password;
      this.rememberMe = rememberMe;

    }
  }
  