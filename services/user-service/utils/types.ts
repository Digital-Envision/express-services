export interface IUser {
  id: number,
  firstName: string,
  lastName?: string,
  email: string,
}

export interface IUserAuth {
  id: number,
  userId: number,
  authType: number,
  username: string,
  email: string,
  password: string,
  profileData?: any,
}