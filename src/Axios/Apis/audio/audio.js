
export const getTotalAudio = () => {
    const url = `/subscriptions/user/count/totalAudio`
    return CallAPI.get(url)
}