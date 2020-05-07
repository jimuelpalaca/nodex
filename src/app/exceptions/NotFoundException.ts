class NotFoundException extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export default NotFoundException;
