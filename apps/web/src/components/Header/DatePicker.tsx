import { useContext } from "react";
import dayjs from "dayjs";

import { unixcontext } from "@src/contexts/unix";
import { timezonesContext } from "@src/contexts/timezones";

import "./DatePicker.scss";


const DatePicker = () => {

    const { unix, setUnix } = useContext(unixcontext);
    const { timezones } = useContext(timezonesContext);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const [year, month, date] = e.target.value.split("-");


        let obj = dayjs(unix);

        if (year) obj = obj.set("year", Number(year))
        if (month) obj = obj.set("month", Number(month) - 1)
        if (date) obj = obj.set("date", Number(date))

        setUnix(obj.valueOf())
    }


    // display this component only when atleast 1 timezone is selected
    if (timezones.length === 0) return null;


    return (
        <label htmlFor="date">
            <input type="date" id="date" onChange={handleChange} className="date-picker" />
        </label>
    );
}

export default DatePicker;