export const actionsWebApp = {
    profileData: (dataProfile) => {
        return {
            type: 'PROFILE_DATA',
            data: {
                ...dataProfile
            }
        }
    }
}