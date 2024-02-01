import ScheduleItem from "./ScheduleItem";
import { useState, useEffect } from "react";
import config from "config";

function Timetable() {
  const [scheduleItems, setScheduleItems] = useState([]);

  useEffect(() => {
    fetch(`${config.API_ROOT_PATH}/scheduleItem/home`)
      .then((response) => response.json())
      .then((json) => {
        setScheduleItems(json);
      })
      .catch((e) => console.error(e));
  }, []);

  let start = 6,
    end = 23;

  let range = new Array(end - start).fill(0).map((val, ind) => start + ind);

  range = range.map((hour) => {
    return {
      hour: hour,
      items: scheduleItems.filter((x) => hour == parseInt(x.timeDepart)),
    };
  });

  return (
    <main>
      {range.map((r) => (
        <div key={r.hour}>
          <div className="d-inline-block p-2">
            {String(r.hour).padStart(2, "0")}:00
          </div>
          <div className="d-inline-block p-2">
            {r.items.map((item) => (
              <ScheduleItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export default Timetable;
