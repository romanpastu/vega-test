const ENV = {
   IS_DEV : 'development',
   IS_PROD : 'production'
}

export const IS_DEV = import.meta.env.MODE === ENV.IS_DEV
export const IS_PROD = import.meta.env.MODE === ENV.IS_PROD
