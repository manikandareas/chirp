/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  // async rewrites ( ) {
  //   return [
  //     // Rewrites all API Requests to your Nest server
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8000/api/:path*"
  //     }
  //   ]
  // }
};
