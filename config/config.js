module.exports = {
  'development': {
    'username': 'root',
    'password': process.env.ROOT_PASSWORD,
    'database': 'neighbourhood_hunter',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'use_env_variable': 'JAWSDB_URL',
    'dialect': 'mysql'
  }
}
