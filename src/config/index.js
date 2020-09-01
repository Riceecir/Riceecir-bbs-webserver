/* redis配置 */
const REDIS = {
  HOST: '127.0.0.1',
  PORT: 6379,
  PASSWORD: 654321
}
/* mongodb */
const MONGODB = {
  URL: 'mongodb://riceecir:123456@127.0.0.1:27017/testdb?authSource=admin'
}

/* JWT */
const JWT_SECRET = 'SYEbHts1BrahES5hj2zdJcUQrk6QMyNV'

module.exports = {
  REDIS,
  MONGODB,
  JWT_SECRET
}
