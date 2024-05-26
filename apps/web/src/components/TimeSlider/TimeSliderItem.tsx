import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { forwardRef, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc"
import Nouislider from "nouislider-react";

import CloseIcon from "@src/assets/icons/close.svg";
import DraggerIcon from "@src/assets/icons/draggable-indicator.svg";
import { TimeZoneContextValue, timezonesContext } from "@src/contexts/timezones";
import { unixcontext } from "@src/contexts/unix";
import { getSeconds } from "@src/utilities/getSeconds";

import "./TimeSliderItem.scss";
import "./noUiSlider.scss";



interface Iprops {
    data: TimeZoneContextValue
    style: React.CSSProperties
    draggableAttr: DraggableAttributes
    listeners: SyntheticListenerMap | undefined
}




// here an array with 24 length is used to represent seconds of hours from 0 - 23. These values are used to display pips or labels to slider.
const pipValues = Array(24).fill(0).map((val, index) => index * 60 * 60)


// returns the text to display for each pip
const formatPip = (value: number) => {
    const hr = value / (60 * 60);
    switch (true) {
        case (hr === 0):
            return "12 am"

        case (hr === 12):
            return "12 pm"

        case (hr > 12):
            return `${hr - 12} pm`

        default:
            return `${hr} am`
    }
}



/**
 *  function to decide whether text should be displayed for each pip.
 *  Only 3hr interval values are displayed.
 * 
 * @param value  
 * @param type value representing how a pip is displayed for the value. available value are 
 * -1 - no pip,
 *  0 - no values only bar,
 *  1 - bar and large value,
 *  2 - bar and small value
 * @returns 
 */
const filterPips = (value: number, type: number) => {

    // by default this function will run for each value in slider axis.
    // values mentioned in pipValues will be assigned 1 type by default.
    if (type >= 1) {

        // if the hours are divisible by 3 then display large pips else small
        // value is in seconds so it is converted to hr and then above condition is checked
        const hr = value / (60 * 60);
        if (hr % 3 !== 0) return 0
        return 1
    }

    // if value is not mentioned in pipValues then it is not displayed
    return -1
}





const TimeSliderItem = forwardRef<HTMLDivElement, Iprops>(({ data, style, listeners }, ref) => {

    const { unix, setUnix } = useContext(unixcontext);
    // console.log(getSeconds(unix, data.Offset))

    const [value, setValue] = useState(getSeconds(unix, data.Offset));

    const { setTimeZones } = useContext(timezonesContext);

    const handleDelete = () => {
        setTimeZones(prev => {
            return prev.filter(p => p.uniqueId !== data.uniqueId)
        })
    }


    const handleUpdate = (latestValue: string[]) => {
        const latestNum = Number(latestValue[0]);

        setUnix(prev => {
            const newUnix = prev + ((latestNum - value) * 1000)
            console.log(newUnix, getSeconds(newUnix, data.Offset))
            return newUnix
        })
        // setValue(value - (latestNum + value))

    }

    useEffect(() => {
        setValue(getSeconds(unix, data.Offset))
    }, [unix])


    const getTime = () => {
        dayjs.extend(utcPlugin)
        return dayjs(unix).utcOffset(data.Offset).format("hh:mm A")
    }


    const getDate = () => {
        return dayjs(unix).utcOffset(data.Offset).format("ddd, MMM DD")
    }


    const formatOffset = () => {
        let result = "+";
        if (data.Offset < 0) result = "-"

        const flooredValue = Math.abs(Math.floor(data.Offset))
        const minutes = (data.Offset - flooredValue) * 60

        result = result + flooredValue.toString()

        if (minutes > 0) result = result + ":" + minutes.toString()

        return result
    }


    return (
        <div className="time-zone-container" style={style} ref={ref}>

            {/* delete button */}
            <button className="delete" title="remove timezone" onClick={handleDelete}>
                <img src={CloseIcon} alt="" />
            </button>

            {/* dragger */}
            <div className="dragger" draggable {...listeners}>
                <img src={DraggerIcon} alt="" width={16} height={72} />
            </div>

            {/* content and slider */}
            <div className="content-and-slider">

                <div className="content">

                    {/* abbrevation and name */}
                    <div className="info">
                        <h3>{data.Abbreviation}</h3>
                        <p>{data.Name}</p>
                    </div>


                    {/* time and date */}
                    <div className="time-and-date">
                        <p className="time">{getTime()}</p>

                        {/* utc offset and date */}
                        <div className="offset-and-date">
                            <p>GMT {formatOffset()}</p>

                            <p>{getDate()}</p>
                        </div>
                    </div>
                </div>




                {/* slider */}
                <Nouislider range={{ min: 0, max: 85500 }} start={value} onChange={handleUpdate}
                    clickablePips
                    pips={{
                        mode: "values",
                        values: pipValues,
                        format: {
                            to: formatPip
                        },

                        filter: filterPips
                    }}
                />

            </div>
        </div>
    );
})

export default TimeSliderItem;