import { CompletedPipe } from './completed.pipe';

describe('CompletedPipe', () => {
  it('create an instance', () => {
    const pipe = new CompletedPipe();
    expect(pipe).toBeTruthy();
  });

  it('return empty array when argument is null', () => {
    const pipe = new CompletedPipe();
    expect(pipe.transform(null, true)).toEqual([]);
    expect(pipe.transform(null, false)).toEqual([]);
  });

  it('return empty array when argument is empty array', () => {
    const pipe = new CompletedPipe();
    expect(pipe.transform([], true)).toEqual([]);
    expect(pipe.transform([], false)).toEqual([]);
  });
});
