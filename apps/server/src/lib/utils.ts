import { CreateUserDto } from "@chirp/dto"

type TCombinerName = (prevName: Pick<CreateUserDto, "firstName" | "lastName">, firsName:string,lastName:string) => string

export const combinerName:TCombinerName = (prevName, firsName,lastName) => {
    if (firsName && lastName) return `${firsName} ${lastName}`

    if (firsName) return `${firsName} ${prevName.lastName}`

    if (lastName) return `${prevName.firstName} ${lastName}`

    return `${prevName.firstName} ${prevName.lastName}`
}

export const nullishObjectChecker = (obj: object) => {
    return Object.values(obj).some( atribut => atribut !== null) 
}