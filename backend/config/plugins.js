module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-aws-s3",
      providerOptions: {
        // Credentials
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          Bucket: env("AWS_BUCKET"),
        },
      },
    },
  },
});
