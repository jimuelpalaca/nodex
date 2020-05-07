class UnprocessableEntityException extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export default UnprocessableEntityException;
