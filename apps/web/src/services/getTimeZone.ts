import { apiURLS } from "./apiURLs"
import { ApiError } from "./errors"
import { axiosInstance } from "./instance"


export interface ISearchResult {
    Id: string
    Abbreviation: string
    Name: string
    Offset: number
}


export const getTimeZoneService = (query: string) =>
    new Promise<ISearchResult[] | ApiError>(async (resolve) => {
        try {
            const result = await axiosInstance.get<ISearchResult[]>(apiURLS.searchTimeZone(query))
            return resolve(result.data)
        }
        catch (ex) {
            console.log(ex)

            resolve(new ApiError("Please try again later"))
        }
    })