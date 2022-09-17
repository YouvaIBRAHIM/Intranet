import { getFromSessionStorage } from "./SessionStorage.service";

export function getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch) {
    if (!collaboraters) {
        const token = getFromSessionStorage('token');
        const response = getCollaboratersListFromApi(token);
        response.then((res) => {
            if (res.status == 200) {
                    const collaboratersList = res.data;
                    dispatch(addAllCollaboraters({collaboraters: collaboratersList}))
                }
            })
    }
}

export const getRandomCollaborater = (getRandomCollaboraterFromApi, setRandomCollaborater) => {
    const token = getFromSessionStorage('token');
    const response = getRandomCollaboraterFromApi(token);
    response.then((res) => {
        if (res.status == 200) {
            setRandomCollaborater(res.data)
        }
    })
}