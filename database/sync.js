const db = require('./db'); // Import the Sequelize instance
const { Campus, Student } = require('./models'); // Ensure models & associations are loaded

const syncDB = async () => {
  try {
    console.log('🌱 Syncing database...');
    await db.sync({ force: true }); // Drops and recreates tables
    console.log('✅ Database synced!');
  } catch (err) {
    console.error('❌ Error syncing database:', err);
  } finally {
    await db.close(); // Close DB connection
    console.log('🔌 Connection closed.');
  }
};

syncDB();
