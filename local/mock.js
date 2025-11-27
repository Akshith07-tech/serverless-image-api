// local/mock.js
export const s3 = {
  storage: {},
  putObject: async ({ Key, Body }) => {
    s3.storage[Key] = Body;
    return { Key };
  },
  getObject: async ({ Key }) => {
    return { Body: s3.storage[Key] || null };
  },
};

export const dynamo = {
  items: [],
  put: async ({ Item }) => {
    dynamo.items.push(Item);
    return Item;
  },
  scan: async () => ({ Items: dynamo.items }),
};

