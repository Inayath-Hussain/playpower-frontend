import { forwardRef } from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import DraggerIcon from "@src/assets/icons/draggable-indicator.svg";
import { TimeZoneContextValue } from "@src/contexts/timezones";
import "./TimeSliderItem.scss";

interface Iprops {
    data: TimeZoneContextValue
    style: React.CSSProperties
    draggableAttr: DraggableAttributes
    listeners: SyntheticListenerMap | undefined
}


const TimeSliderItem = forwardRef<HTMLDivElement, Iprops>(({ data, style, listeners }, ref) => {

    return (
        <div className="time-zone-container" style={style} ref={ref}>

            {/* dragger */}
            <div className="dragger" draggable {...listeners}>
                <img src={DraggerIcon} alt="" width={16} height={72} />
            </div>

            {/* content and slider */}
            <div className="content">

                {/* name and time */}
                <div className="info">
                    {data.Name}
                </div>


                {/* slider */}

            </div>


        </div>
    );
})

export default TimeSliderItem;