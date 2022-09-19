let dict = {
  create: {
    user: {
      api: "/api/users/create",
    },
  },
  read: {
    users: {
      api: "/api/users/list",
    },
    user: {
      api: "/api/users/detail",
    },
  },
  drop: {
    user: {
      api: "/api/users/drop",
    },
  },
};

export default function option(target, key, callback) {
  let output = dict[target][key] || {};

  if (callback) {
    callback(output);
  }
  return output;
}
