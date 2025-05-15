import { StringCalculator} from "../stringCalculator";

describe("String Calculator", ()=>{
    let calculator: StringCalculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

    it("should return 0 for empty string", ()=>{
        expect(calculator.add("")).toBe(0);
    });

});