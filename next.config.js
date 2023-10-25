/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'server',
            value: '-',
          },
        ],
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: [
      'streamwaves3.s3.ap-northeast-2.amazonaws.com',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'developers.kakao.com',
      'du30t7lolw1uk.cloudfront.net',
    ],
  },
};

module.exports = nextConfig;
