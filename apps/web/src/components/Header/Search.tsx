import { useContext, useRef, useState } from "react";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc"

import PlusIcon from "@src/assets/icons/plus.svg";
import { timezonesContext } from "@src/contexts/timezones";
import { ISearchResult, getTimeZoneService } from "@src/services/getTimeZone";
import { ApiError } from "@src/services/errors";

import "./Search.scss";



const Search = () => {

    const { setTimeZones } = useContext(timezonesContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);

    const [openDropDown, setOpenDropDown] = useState(false);


    // setTimeout id used for debouncing
    const timeOutRef = useRef<NodeJS.Timeout>();

    // input change handler to get all the matching timezones
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const query = e.target.value;

        setSearchQuery(query)

        // clear any setTimeouts present
        clearTimeout(timeOutRef.current)

        // initialize new setTimeout to retrieve the data
        timeOutRef.current = setTimeout(async () => {
            const data = await getTimeZoneService(query)
            if (data instanceof ApiError) {
                // toast message here
                return
            }

            setSearchResult(data)
        }, 900)
    }


    const handleTimeZoneSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, value: ISearchResult) => {

        e.preventDefault();

        const timezone = { ...value, uniqueId: Date.now() }
        setTimeZones(prev => [...prev, timezone])
        setSearchQuery("")
        setSearchResult([])
    }




    const getTime = (utcOffset: number) => {
        dayjs.extend(utcPlugin)
        return dayjs().utcOffset(utcOffset).format("hh:mm A")
    }

    return (
        <>
            <div className="timezone_search_container" onBlur={() => setOpenDropDown(false)}>
                <input type="text" value={searchQuery} onChange={handleChange} onFocus={() => setOpenDropDown(true)} />

                <button>
                    <img src={PlusIcon} alt="" width={20} height={20} />
                </button>


                {
                    openDropDown && searchResult.length > 0 ?
                        <ul className="drop-down">
                            {searchResult.map(s => (
                                <li key={s.Id} onClick={(e) => handleTimeZoneSelect(e, s)}>
                                    <p>{s.Abbreviation} ({s.Name})</p>
                                    <p className="current-time">{getTime(s.Offset)}</p>
                                </li>
                            ))}
                        </ul>
                        :
                        null
                }

            </div>
        </>
    );
}

export default Search;