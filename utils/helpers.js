const { formatDistance, compareAsc } = require("date-fns");

module.exports = {
  format_date: (date) => {
    let currentTime = new Date();
    return formatDistance(date, currentTime, { addSuffix: true });
  },
  is_updated: (created_at, updated_at) => {
    if (compareAsc(created_at, updated_at) === -1) {
      return true;
    }
    return false;
  },
};
