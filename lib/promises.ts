export class Promises {
    public static delay(delay: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}
