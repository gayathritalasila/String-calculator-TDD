export class StringCalculator {
    add(input: string): number {
        if (input === "") return 0;
        const { delimiter, numbers } = this.extractDelimiterAndNumbers(input);
        this.validateInput(numbers, delimiter);
        const parts = numbers.split(delimiter).map(Number);
        const negatives = parts.filter((n) => n < 0);
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
        }
        return parts.reduce((sum, num) => sum + num, 0);
    }

    private extractDelimiterAndNumbers(input: string): { delimiter: RegExp, numbers: string } {
        if (input.startsWith("//")) {
            const parts = input.split("\n");
            if (parts.length < 2) throw new Error("Invalid Input");
            const rawDelimiter = parts[0].slice(2);
            if (/[{}]/.test(rawDelimiter) || rawDelimiter === "") {
                throw new Error("Invalid Input");
            }
            return { delimiter: new RegExp(this.escapeRegex(rawDelimiter)), numbers: parts[1] };
        }
        if (input.includes("+")) {
            throw new Error("Invalid Input");
        }
        return { delimiter: /[,\n]/, numbers: input };
    }

    private validateInput(numbers: string, delimiter: RegExp): void {
        const source = delimiter.source;
        if (new RegExp(`${source}{2,}`).test(numbers)) {
            throw new Error("Invalid Input");
        }
    }

    private escapeRegex(s: string): string {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
}
