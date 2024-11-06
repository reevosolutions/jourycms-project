"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRooms = exports.NotificationEvents = void 0;
var NotificationEvents;
(function (NotificationEvents) {
    NotificationEvents["PassParcelToMe"] = "PASS_PARCEL_TO_ME";
    NotificationEvents["ParcelChangeStatus"] = "PARCEL_CHANGE_STATUS";
    NotificationEvents["ParcelBulkChangeStatus"] = "PARCEL_BULK_CHANGE_STATUS";
})(NotificationEvents || (exports.NotificationEvents = NotificationEvents = {}));
var NotificationRooms;
(function (NotificationRooms) {
    NotificationRooms["TrackParcelStatus"] = "TRACK_PARCEL_STATUS_[PARCEL_STATUS]";
    NotificationRooms["PassParcelToDeliverer"] = "PASS_PARCEL_TO_DELIVERER_[USER]";
    NotificationRooms["User"] = "[USER]";
    NotificationRooms["RoleGroup"] = "[ROLE_GROUP]";
    NotificationRooms["Role"] = "[ROLE]";
    NotificationRooms["Store"] = "[STORE]";
    NotificationRooms["Office"] = "[OFFICE]";
    NotificationRooms["Company"] = "[COMPANY]";
})(NotificationRooms || (exports.NotificationRooms = NotificationRooms = {}));
//# sourceMappingURL=notifications.constants.js.map