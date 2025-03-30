const moment = require("moment");
export const convertDateToJalali = (d, f) => {
  try {
    var date = d.replace("-08:00", "");
  } catch (error) {
    var date = d;
  }
  var _f = "HH:mm";
  if (f) {
    _f = f;
  }
  return (
    <div className="date">
      {moment(date).format("YYYY/MM/DD")}{" "}
      <span className="time">{moment(date).format(_f)}</span>
    </div>
  );
};
