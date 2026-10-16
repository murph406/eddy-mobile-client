export const logMessage = (message: string) => {
    console.log(message)
}

export const logError = (err: string, context = {}) => {
    console.log(err, context)
}