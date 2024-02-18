class UserDAO {

    constructor(client) {
        this.client = client;
    }

    async save(user) {
        const { name, email } = user;
        try {
            const results = await this.client.query(
                `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
                [name, email]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findAll() {
        try {
            const results = await this.client.query("SELECT * FROM users");
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async findOne(id) {
        try {
            const results = await this.client.query(`SELECT * FROM users WHERE id = $1`, [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async updateOne(user) {
        try {
            const results = await this.client.query(
                "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
                [user.name, user.email, user.id]
            );
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
   
    async deleteOne(id) {
        try {
            const results = await this.client.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
            return results.rows;
        } catch(err){
            console.error(err);
            throw err;
        }
    }
  }
   
  module.exports = (client) => new UserDAO(client);