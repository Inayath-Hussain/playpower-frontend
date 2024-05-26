import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { ISearchResult } from "@src/services/getTimeZone";


export interface TimeZoneContextValue extends ISearchResult {
    uniqueId: number
    // seconds: number // number of seconds passed since the day beginning, used as slider value
}


interface IContext {
    timezones: TimeZoneContextValue[]
    setTimeZones: Dispatch<SetStateAction<TimeZoneContextValue[]>>
}

// store all the current timezones selected by user
export const timezonesContext = createContext<IContext>({ timezones: [], setTimeZones: () => { } });


export const TimeZonesContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [timezones, setTimeZones] = useState<TimeZoneContextValue[]>([]);

    return (
        <timezonesContext.Provider value={{ timezones, setTimeZones }}>
            {children}
        </timezonesContext.Provider>
    )
}
