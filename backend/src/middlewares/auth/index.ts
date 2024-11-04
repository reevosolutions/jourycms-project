import userHasOrAboveRoleGroup from './user-has-or-above-role-group.middleware';
import userHasRoleGroup from './user-has-role-group.middleware';
import userHasPermission from './user-has-permission.middleware';
import requireUser from './user-required.middleware';


export default {
  /**
   * Check if user is logged in
   * - If the request is identified as a service request, always pass
   * - If user is logged in pass
   * - else throw UnauthorizedException
   */
  requireUser,
  /**
   * Check if user has permission
   *  - If the request is identified as a service request, always pass
   *  - If user is master, always pass
   *  - If user has the permission, pass
   *  - If the passed permissions is an array, check if user has one of the permissions
   *  - If the passed permissions is an array of arrays, check if user has all the permissions in one of the arrays
   *  - else throw UnauthorizedException
   */
  userHasPermission,
  /**
   * Check if user has role group
   *  - If the request is identified as a service request, always pass
   *  - If user is master, always pass
   *  - If user has the role group, pass
   *  - else throw UnauthorizedException
   */
  userHasRoleGroup,
  /**
   * Check if user has or above role group
   *  - If the request is identified as a service request, always pass
   *  - If user is master, always pass
   *  - If user has the role group, pass
   *  - If user has a role group above the passed role group, pass
   *  - else throw UnauthorizedException
   */
  userHasOrAboveRoleGroup,

}