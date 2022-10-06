/** @type {import('next').NextConfig} */
require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  },
};
