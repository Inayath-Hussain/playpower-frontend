import { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc"

import PlusIcon from "@src/assets/icons/plus.svg";
import { timezonesContext } from "@src/contexts/timezones";
import { ISearchResult, getTimeZoneService } from "@src/services/getTimeZone";
import { ApiError } from "@src/services/errors";

import "./Search.scss";
import { unixcontext } from "@src/contexts/unix";



const Search = () => {

    const { timezones, setTimeZones } = useContext(timezonesContext);
    const { setUnix } = useContext(unixcontext);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<ISearchResult[]>([]);

    const [openDropDown, setOpenDropDown] = useState(false);


    const searchContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleBlur = (e: MouseEvent) => {
            if (e.composedPath().includes(searchContainerRef.current as Node) === false) setOpenDropDown(false);
        }

        document.addEventListener("click", handleBlur)

        return () => {
            document.removeEventListener("click", handleBlur)
        }
    }, [])



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


    const handleAddTimeZone = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, value: ISearchResult) => {

        e.preventDefault();

        if (timezones.length === 0) setUnix(Date.now())

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
        <div className="timezone_search_container" ref={searchContainerRef}>
            <input type="text" value={searchQuery} onChange={handleChange} onFocus={() => setOpenDropDown(true)} />

            <button>
                <img src={PlusIcon} alt="" width={20} height={20} />
            </button>


            {
                openDropDown && searchResult.length > 0 ?
                    <ul className="drop-down">
                        {searchResult.map(s => (
                            <li key={s.Id} onClick={(e) => handleAddTimeZone(e, s)}>
                                <p>{s.Abbreviation} ({s.Name})</p>
                                <p className="current-time">{getTime(s.Offset)}</p>
                            </li>
                        ))}
                    </ul>
                    :
                    null
            }

        </div>

    );
}

export default Search;