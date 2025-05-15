export class StringCalculator {
  add(input: string): number {
    if (input === "") return 0;

    let delimiter = /[\n,]/;

    if (input.startsWith("//")) {
      const match = input.match(/^\/\/(.+)\n([\s\S]*)$/);
      if (!match) {
        throw new Error("Invalid Input");
      }

      const [, customDelimiter, rest] = match;

     
      if (!customDelimiter || /[{}]/.test(customDelimiter)) {
        throw new Error("Invalid Input");
      }

      delimiter = new RegExp(this.escapeRegex(customDelimiter));
      input = rest;
    }

    this.validateNoConsecutiveDelimiters(input, delimiter);

    const numbers = input.split(delimiter).map((n) => {
      const parsed = Number(n);
      if (isNaN(parsed)) {
        throw new Error("Invalid Input");
      }
      return parsed;
    });

    const negatives = numbers.filter((n) => n < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return numbers.reduce((sum, n) => sum + n, 0);
  }

  private escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private validateNoConsecutiveDelimiters(input: string, delimiter: RegExp) {
    const delimPattern = delimiter.source;
    const regex = new RegExp(`${delimPattern}{2,}`);
    if (regex.test(input)) {
      throw new Error("Invalid Input");
    }
  }
}
