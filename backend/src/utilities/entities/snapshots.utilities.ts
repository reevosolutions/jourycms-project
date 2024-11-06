/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-02-2024 21:22:10
 */

/* ------------------------- COMMON AUTH INTERFACES ------------------------- */

export const getUserSnapshot = (value?: Levelup.CMS.V1.Users.Entity.User | Levelup.CMS.V1.Users.Entity.ExposedUser | null, default_value: Levelup.CMS.V1.Utils.Entity.Snapshots.Auth.User | null = null): Levelup.CMS.V1.Utils.Entity.Snapshots.Auth.User | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.CMS.V1.Utils.Entity.Snapshots.Auth.User = {
    role: value.role,
    _id: value._id,
    tracking_id: value.tracking_id,
    first_name: value.profile?.first_name || '',
    family_name: value.profile.family_name || '',
    phones: value.profile.phones,
    photo: value.profile.photo
  }
  return result;
}

