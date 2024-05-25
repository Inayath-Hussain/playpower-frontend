import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

import TimeSliderItem from "./TimeSliderItem";
import { TimeZoneContextValue } from "@src/contexts/timezones";

const SortableItem: React.FC<{ data: TimeZoneContextValue }> = ({ data }) => {

    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: data.uniqueId })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <TimeSliderItem data={data} style={style} ref={setNodeRef} draggableAttr={attributes} listeners={listeners} />
    );
}

export default SortableItem;