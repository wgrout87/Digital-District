const { formatDistance, compareAsc } = require("date-fns");

module.exports = {
  format_date: (date) => {
    let currentTime = new Date();
    return formatDistance(date, currentTime, { addSuffix: true });
  },
  is_updated: (createdAt, updatedAt) => {
    if (compareAsc(createdAt, updatedAt) === -1) {
      return true;
    }
    return false;
  },
  is_current_user: (postUser, currentUser) => {
    if (postUser === currentUser) {
      return true;
    }
    return false;
  },
};
