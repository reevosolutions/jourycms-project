export enum NotificationEvents {
  PassParcelToMe = "PASS_PARCEL_TO_ME",
  ParcelChangeStatus = "PARCEL_CHANGE_STATUS",
  ParcelBulkChangeStatus = "PARCEL_BULK_CHANGE_STATUS",
}
export enum NotificationRooms {
  TrackParcelStatus = 'TRACK_PARCEL_STATUS_[PARCEL_STATUS]',
  PassParcelToDeliverer = "PASS_PARCEL_TO_DELIVERER_[USER]",
  User = '[USER]',
  RoleGroup = '[ROLE_GROUP]',
  Role = '[ROLE]',
  Store = '[STORE]',
  Office = '[OFFICE]',
  Company = '[COMPANY]',

}
