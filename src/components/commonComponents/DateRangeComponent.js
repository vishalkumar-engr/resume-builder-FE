import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeComponent = ({ onChange }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (onChange) {
      const dateObj = {};
      if (state[0].startDate) {
        dateObj["startDate"] = moment(state[0].startDate).format("DD/MM/YYYY");
      }
      if (state[0].endDate) {
        dateObj["endDate"] = moment(state[0].endDate).format("DD/MM/YYYY");
      }

      onChange(dateObj);
    }
  }, [state]);

  return (
    <div className="d-flex justify-content-center">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
};

export default DateRangeComponent;
