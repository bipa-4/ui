/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'streamwaves3.s3.ap-northeast-2.amazonaws.com',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'developers.kakao.com',
    ],
  },
};

module.exports = nextConfig;
