module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgress://postgres:root@localhost:5432/leccion'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
