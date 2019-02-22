export interface IUser {
  auth: {
    local: {
      username: string,
      email: string,
      password: string,
    },
  };
}
