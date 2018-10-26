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

  it('return empty array when use pipe for array of uncompleted items with true value and return array with all items for false value', () => {
    const posts = [
      {id: "1", completed: false},
      {id: "2", completed: false}
    ];
    const pipe = new CompletedPipe();
    expect(pipe.transform(posts, true)).toEqual([]);
    expect(pipe.transform(posts, false)).toEqual(posts);
  });

  it('return array with one element with id "2"', () => {
    const posts = [
      {id: "1", completed: false},
      {id: "2", completed: true}
    ];
    const pipe = new CompletedPipe();
    expect(pipe.transform(posts, true).length).toEqual(1);
    expect((pipe.transform(posts, true))[0].id).toEqual("2");
  });
});
