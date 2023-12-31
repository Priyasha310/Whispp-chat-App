const host = 'http://localhost:5000'

export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const setAvatarRoute = `${host}/api/auth/setProfile`;
export const allUsers = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/addMessage`;
export const getAllMessagesRoute = `${host}/api/messages/getMessage`;