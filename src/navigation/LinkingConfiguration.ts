import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'home',
            },
          },
          Weekly: {
            screens: {
              Weekly: 'weekly',
              Detail: 'detail'
            },

          },
        },
      },
      NotFound: '*',
      Authentication: 'login',   
      Registration: {
        screens: {
          Register: 'register',
          RegisterSuccess: 'register-success',
        },

      },
    },
  },
};
