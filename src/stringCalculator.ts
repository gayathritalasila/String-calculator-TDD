export class StringCalculator {
    add(input: string): number {
        if (input === "") return 0;

        let delimiter = /[\n,]/;
        if (input.startsWith("//")) {
            const [delimLine, numbers] = input.split("\n");
            const customDelim = delimLine.slice(2);
            delimiter = new RegExp(this.escapeRegex(customDelim));
            input = numbers;
        }

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

}
