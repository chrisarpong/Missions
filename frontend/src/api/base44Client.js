export const base44 = {
  entities: new Proxy({}, {
    get: function(target, prop) {
      return {
        list: async () => [],
        filter: async () => [],
        get: async () => ({}),
        create: async () => ({}),
        update: async () => ({}),
        delete: async () => {},
      };
    }
  }),
  auth: {
    me: async () => null,
    logout: () => {},
    redirectToLogin: () => {},
  }
};
