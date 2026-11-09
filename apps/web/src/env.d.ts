// Declare the environment variables this app reads so that dot access
// (process.env.NAME) type-checks under noPropertyAccessFromIndexSignature.
// Dot access keeps NEXT_PUBLIC_* values inlined into the client bundle.
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_NAME?: string;
    NEXT_PUBLIC_GA_ID?: string;
    INTERNAL_CONFIG?: string;
    BLOG_URL?: string;
  }
}
