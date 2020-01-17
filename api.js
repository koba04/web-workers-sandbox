const wait = () => new Promise(r => setTimeout(r, 1000));

export const api = async () => {
  await wait();
  return [
    {id: 1, title: "Foo"},
    {id: 2, title: "Bar"},
    {id: 3, title: "Baz"},
  ];
}

export const getSettings = async () => {
  await wait();
  return {
    backgroundColor: 'tomato'
  }
}