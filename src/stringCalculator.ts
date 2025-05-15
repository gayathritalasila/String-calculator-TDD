export class StringCalculator {
    add(input: string): number {
        if (input === "") return 0;
        const parts = input.split(/[\n,]/).map(Number);
        return parts.reduce((sum, n) => sum + n, 0);
    }
}
