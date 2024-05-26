import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

interface UnixContextValue {
    unix: number
    setUnix: Dispatch<SetStateAction<number>>
}

export const unixcontext = createContext<UnixContextValue>({ unix: 0, setUnix: () => { } });


export const UnixContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [unix, setUnix] = useState(0);

    return (
        <unixcontext.Provider value={{ unix, setUnix }}>
            {children}
        </unixcontext.Provider>
    )
}