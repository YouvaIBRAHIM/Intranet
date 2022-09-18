/**
 * @param {Object} collaboraters collaborateurs stocké dans la state global
 * @param {Function} getCollaboratersListFromApi récupère la liste des collaborateurs depuis l'api
 * @param {Function} addAllCollaboraters met à jour la liste des collaborateurs dans le state global
 * @param {Function} dispatch Hook de react-redux
 */
export function getCollaboraters(collaboraters, getCollaboratersListFromApi, addAllCollaboraters, dispatch) {
    if (!collaboraters) {
        const response = getCollaboratersListFromApi();
        response.then((res) => {
            if (res.status == 200) {
                    const collaboratersList = res.data;
                    dispatch(addAllCollaboraters({collaboraters: collaboratersList}))
                    return true;
                }
            })
    }
}

/**
 * 
 * @param {Function} getRandomCollaboraterFromApi récupère collaborateur au hasard depuis l'api
 * @param {Function} setRandomCollaborater met à jour les informations du state représantant le collaborateur récupéré au hasard
 */
export const getRandomCollaborater = (getRandomCollaboraterFromApi, setRandomCollaborater) => {
    const response = getRandomCollaboraterFromApi();
    response.then((res) => {
        if (res.status == 200) {
            setRandomCollaborater(res.data)
        }
    })
}