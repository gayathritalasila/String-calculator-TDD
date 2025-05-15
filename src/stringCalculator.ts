export class StringCalculator {
    add(input: string): number {
        if (input === "") return 0;
        if (!input.includes(",")) return parseInt(input, 10);
        return 0;
    }
}
