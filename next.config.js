/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: [
      'streamwaves3.s3.ap-northeast-2.amazonaws.com',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'developers.kakao.com',
      'du30t7lolw1uk.cloudfront.net',
    ],
    formats: ['image/avif', 'image/webp'], // default: ['image/webp']
  },
};

module.exports = nextConfig;
