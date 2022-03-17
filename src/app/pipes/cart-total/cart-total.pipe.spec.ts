import { CartTotalPipe } from './cart-total.pipe';

describe('CartTotalPipe', () => {
  it('create an instance', () => {
    const pipe = new CartTotalPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the total of the cart', () => {
    const pipe = new CartTotalPipe();
    const cart = [
      {
        price: 10,
      },
      {
        price: 20,
      },
    ] as any;
    expect(pipe.transform(cart)).toEqual(30);
  });
});
