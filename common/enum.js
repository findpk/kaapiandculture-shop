const Countries = {
  India: "IN",
};

const ShortIdPrefix = {
  Default: "AA",
  Farms: "FA",
  Lots: "LO",
};

const ShortIdCharacters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Roles = {
  SuperUser: "SU",
  Admin: "AD",
  Proprietor: "PR",
  Farmer: "FR",
};

const MessageHistoryStatus = {
  Queued: "Queued",
  Completed: "Completed",
  Failed: "Failed",
  Skipped: "Skipped",
};

const Exchanges = {
  Notifications: "notifications",
};

const NotificationTypes = {
  WhatsApp: "WhatsApp",
};

const NotificationStatus = {
  Scheduled: "Scheduled",
  Sent: "Sent",
  Failed: "Failed",
};

const MaxProductsPerPage = 10;

module.exports = {
  Countries,
  ShortIdPrefix,
  ShortIdCharacters,
  Roles,
  MessageHistoryStatus,
  Exchanges,
  NotificationTypes,
  NotificationStatus,
  MaxProductsPerPage,
};
