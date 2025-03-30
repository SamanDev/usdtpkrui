const moment = require("moment");
export const convertDateToJalali = (date) => {
  return (
    <div>
      {moment(date).format("YYYY/MM/DD")}{" "}
      <span className="time">{moment(date).format("HH:mm")}</span>
    </div>
  );
};
