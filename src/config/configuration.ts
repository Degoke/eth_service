export default () => ({
  port: parseInt(process.env.PORT, 10),
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  database: {
    mongo: {
      uri: process.env.MONGO_URI,
    },
    test: {
      uri: process.env.TEST_MONGO_URI,
    },
  },
  web3: {
    provider: process.env.WEB3_PROVIDER_URL,
  },
});
