import { CallAPI } from "../../AxiosBase"

export const getTotalAudio = () => {
    const url = `/audio/count/totalAudio`
    return CallAPI.get(url)
}