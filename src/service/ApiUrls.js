const baseUrl = process.env.REACT_APP_BASE_URL

export const apiUrls = {
    login:`${baseUrl}/user/signin`,
    signup:`${baseUrl}/user/signup`,
    getResume:`${baseUrl}/resume/all`,
    addResume:`${baseUrl}/resume/add`
}