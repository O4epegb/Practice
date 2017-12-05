import { mutatedSwap } from './';

it('mutated swap is working', () => {
    const array = [2, 1, 7];
    mutatedSwap(1, 2, array);
    expect(array).toEqual([2, 7, 1]);
    mutatedSwap(0, 2, array);
    expect(array).toEqual([1, 7, 2]);
});
