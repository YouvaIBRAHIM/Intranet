/**
 * formate le numéro de téléphone
 * @param {Object} event evenement détecté lors dela saisie du numéro de téléphone
 * @param {Object} userInfos state des informations du collaborateur 
 * @param {Function} setUserInfos met à jour le state des informations du collaborateur
 */
export const setPhoneNumberFormat = (event, userInfos , setUserInfos) => {
    const insertedChar = event.nativeEvent.data;
    const phoneNumber = event.target.value.replaceAll(" ", "");
    if (event.nativeEvent.inputType == "insertText") {
        const formattedPhoneNumber = phoneNumber.replace(/(\d{1,2})(\d{1,2})?(\d{1,2})?(\d{1,2})?(\d{1,2})?/, function(_, p1, p2, p3, p4, p5, p6){
            let output = ""
            if (p1) output = `${p1}`;
            if (p2) output += ` ${p2}`;
            if (p3) output += ` ${p3}`;
            if (p4) output += ` ${p4}`;
            if (p5) output += ` ${p5}`;
            return output;
        });
        event.target.value = formattedPhoneNumber

        //Si le caractère saisi n'est pas un nombre, alors il sera enlevé
        if(insertedChar !== " " && !parseInt(insertedChar) && parseInt(insertedChar) != 0){
            event.target.value = event.target.value.substring(0, event.target.value.length - 1, -1)
        }
    }
    setUserInfos({...userInfos, phone: event.target.value.trim().replaceAll(" ", "-")})
}

/**
 * Vérifie si l'email saisi n'appartient pas déjà à un autre collaborateur
 * @param {String} email email saisi
 * @param {Object} user informations du collaborateur
 * @param {Array} collaboraters liste de tous les collaborateurs
 */
export const emailVerification = (email, user, collaboraters) => {

    if (user) {
        if (user.email == email) {
            return -1;
        }
    }
    
    return collaboraters.findIndex(collaborater => collaborater.email == email);
}