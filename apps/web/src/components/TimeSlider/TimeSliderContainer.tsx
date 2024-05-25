import { useContext, useMemo } from "react";
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { timezonesContext } from "@src/contexts/timezones";
import SortableItem from "./SortableItem";
import './TimeSliderContainer.scss';



const TimeSliderContainer = () => {

    const { timezones, setTimeZones } = useContext(timezonesContext);

    const getIds = () => {
        const ids: number[] = []
        timezones.forEach(t => ids.push(t.uniqueId))
        return ids
    }

    // list of unique ids to identify each timezone, ordered on the basis of how they are rendered
    const ids = useMemo(getIds, [timezones])


    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTimeZones((prev) => {
                const oldIndex = prev.findIndex(p => p.uniqueId === active.id);
                const newIndex = prev.findIndex(p => p.uniqueId === over?.id);

                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    }




    // if no time zones are selected 
    if (timezones.length === 0)
        return (
            <div className="draggable-container fixed-height">
                <h1>Select a time zone from search box</h1>
            </div>
        )


    return (
        <div className="draggable-container">
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={ids} strategy={verticalListSortingStrategy}>


                    {timezones.map(t => (
                        <SortableItem data={t} key={t.uniqueId} />
                    ))}


                </SortableContext>
            </DndContext>
        </div>
    );
}

export default TimeSliderContainer;