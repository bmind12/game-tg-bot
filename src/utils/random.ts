export const getRandomIntFromRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomCharFromRange = (
    firstChar: string,
    lastChar: string
): string => {
    let firstCharCode = firstChar.charCodeAt(0)
    let lastCharCode = lastChar.charCodeAt(0)

    if (firstCharCode > lastCharCode) {
        ;[firstCharCode, lastCharCode] = [lastCharCode, firstCharCode]
    }

    const randomCharCode = getRandomIntFromRange(firstCharCode, lastCharCode)

    return String.fromCharCode(randomCharCode)
}
