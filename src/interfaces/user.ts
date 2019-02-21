export interface IUser {
  auth: {
    local: {
      username: String,
      email: String,
      password: String,
    }
  }
}
