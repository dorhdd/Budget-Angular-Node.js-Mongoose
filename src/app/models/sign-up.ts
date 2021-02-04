export class SignUp {
  constructor(
    public email: string,
    public password: string,
    public confirmPassword: string
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
