export class StringCalculator {
    add(input: string): number {
        if (input === "") return 0;

        let delimiter = /[\n,]/;

        if (input.startsWith("//")) {
            const match = input.match(/^\/\/(.+)\n([\s\S]*)$/);

            // If the format does not match exactly — throw error
            if (!match) {
                throw new Error("Invalid Input");
            }

            const [, delimLine, numbers] = match;

            // Reject delimiters containing curly braces (like {+}) or empty delimiters
            if (!delimLine || /[{}]/.test(delimLine)) {
                throw new Error("Invalid Input");
            }

            delimiter = new RegExp(this.escapeRegex(delimLine));
            input = numbers;
        }

        this.validateNoConsecutiveDelimiters(input, delimiter);

        const parts = input.split(delimiter).map(Number);

        const negatives = parts.filter(n => n < 0);
        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
        }

        return parts.reduce((sum, n) => sum + n, 0);
    }

    private escapeRegex(s: string): string {
        return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    private validateNoConsecutiveDelimiters(input: string, delimiter: RegExp): void {
        const delimPattern = delimiter.source;
        const regex = new RegExp(`${delimPattern}{2,}`);
        if (regex.test(input)) {
            throw new Error("Invalid Input");
        }
    }
}
