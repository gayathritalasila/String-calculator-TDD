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
    expect(calculator.add("4\n5,6")).toBe(15);
  });

  it("supports custom delimiters defined in the input", () => {
    expect(calculator.add("//;\n1;2")).toBe(3);
    expect(calculator.add("//|\n2|3|4")).toBe(9);
  });

  it("raises an exception for negative numbers", () => {
    expect(() => calculator.add("1,-2,3")).toThrow("negative numbers not allowed: -2");
    expect(() => calculator.add("//;\n4;-5;6")).toThrow("negative numbers not allowed: -5");
    expect(() => calculator.add("-1,-2,-3")).toThrow("negative numbers not allowed: -1, -2, -3");
  });

  it("raises an error for invalid delimiter formats", () => {
    expect(() => calculator.add("//{+}1+2+")).toThrow("Invalid Input");
    expect(() => calculator.add("//-1-2")).toThrow("Invalid Input");

  });

  it("treats //-1-2 correctly based on delimiter rule", () => {
    expect(calculator.add("//-\n1-2")).toBe(3);
    expect(() => calculator.add("//-1-2")).toThrow("Invalid Input");
  });

  it("supports + as a valid delimiter if explicitly set", () => {
    expect(calculator.add("//+\n1+2")).toBe(3);
    expect(() => calculator.add("1+2")).toThrow("Invalid Input");
  });

  it("raises an error for consecutive delimiters", () => {
    expect(() => calculator.add("//;\n1;;2")).toThrow("Invalid Input");
    expect(() => calculator.add("//|\n3||4")).toThrow("Invalid Input");
  });

});