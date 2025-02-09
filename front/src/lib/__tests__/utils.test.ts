//To make vitest actually works
import { sum } from "../utils";

test('sum', () => {
    expect(sum(1, 2)).toBe(3);
});
