export default function(user:UserI):UserDTOI{
    const userDTO:UserDTOI = {
        id: user.id,
        userID: user.userID,
        fullName: user.fullName
    }

    return userDTO
}