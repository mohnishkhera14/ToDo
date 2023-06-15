import express, { json } from 'express';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { connect, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors'


const app = express();
app.use(json());
app.use(cors());

const JWT_SECRET = 'your_jwt_secret';

// Connect to MongoDB
connect('mongodb+srv://mohnish:mohnish123@cluster0.w3cvd7f.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const UserSchema = new Schema({
  username: String,
  password: String,
});
const User = model('User', UserSchema);

// Mock user data
const users = [
  { username: 'admin', password: 'password' },
  { username: 'user', password: 'password' },
];

// Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the mock data
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate and send the JWT token
  const token = sign({ username }, JWT_SECRET);
  res.json({ token });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port 5000');
});
