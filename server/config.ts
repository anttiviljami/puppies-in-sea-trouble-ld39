const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8080,
  GETH_URL: process.env.GETH_URL,
  ETH_ADDRESS: process.env.ETH_ADDRESS,
  DATABASE_URL: process.env.DATABASE_URL,
};

export default config;
