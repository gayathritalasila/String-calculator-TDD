import { StringCalculator } from "../stringCalculator";

describe("String Calculator", () => {
  let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  it("should return 0 for empty string", () => {
    expect(calculator.add("")).toBe(0);
  });

  it("returns the number itself for a single number", () => {
    expect(calculator.add("1")).toBe(1);
    expect(calculator.add("5")).toBe(5);
  });

  it("returns the sum of two numbers", () => {
    expect(calculator.add("1,2")).toBe(3);
    expect(calculator.add("4,5")).toBe(9);
  });

  it("handles new lines as delimiters", () => {
    expect(calculator.add("1\n2,3")).toBe(6);
  });

  it("supports custom delimiters defined in the input", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
  });

});