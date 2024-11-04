
export const isSeller: (user: Partial<Levelup.V2.Users.Entity.ExposedUser>) => boolean = (user) => {
  return user.role_group === 'sellers';
}