export const api = async () => {
  await new Promise(r => setTimeout(r, 300));
  return [
    {id: 1, title: "Foo"},
    {id: 2, title: "Bar"},
    {id: 3, title: "Baz"},
  ];
}
