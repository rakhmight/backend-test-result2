import bcrypt from 'bcrypt'

export async function preparePassword(password: string){
    const hashedPassword = await bcrypt.hash(password, 16)

    return hashedPassword
}

export async function comparePasswords(hashedPassword: string, candidatePassword: string){
    return await bcrypt.compare(candidatePassword, hashedPassword);
}