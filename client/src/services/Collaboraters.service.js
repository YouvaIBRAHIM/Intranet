import { getFromSessionStorage } from "./SessionStorage.service";

export function getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch) {
    if (!collaboraters) {
        const response = getCollaboratersListFromApi();
        response.then((res) => {
            if (res.status == 200) {
                    const collaboratersList = res.data;
                    dispatch(addAllCollaboraters({collaboraters: collaboratersList}))
                }
            })
    }
}

export const getRandomCollaborater = (getRandomCollaboraterFromApi, setRandomCollaborater) => {
    const response = getRandomCollaboraterFromApi();
    response.then((res) => {
        if (res.status == 200) {
            setRandomCollaborater(res.data)
        }
    })
}