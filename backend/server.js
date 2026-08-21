import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import dns from 'dns';

import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddlware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';

// Use reliable DNS servers for MongoDB Atlas SRV resolution
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Morgan logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

// API routes
app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/supplier', supplierRoutes);

// PayPal configuration
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// Resolve project directory
const __dirname = path.resolve();

// Uploaded files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Production frontend
if (process.env.NODE_ENV === 'production') {
    app.use(
        express.static(path.join(__dirname, '/frontend/build'))
    );

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname,
                'frontend',
                'build',
                'index.html'
            )
        );
    });
} else {
    // Development API test
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(
        `Server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    );
});




// import path from 'path'
// import express from 'express';
// import dotenv from 'dotenv';
// import morgan from 'morgan'
// import connectDB from './config/db.js';
// import colors from 'colors'

// import dns from 'dns';

// dns.setServers(['8.8.8.8', '1.1.1.1']);

// import { notFound, errorHandler } from './middleware/errorMiddlware.js'
// import productRoutes from './routes/productRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import orderRoutes from './routes/orderRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js'
// import supplierRoutes from './routes/supplierRoutes.js'

// dotenv.config('./../.env');

// connectDB();

// const app = express();

// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
// }

// app.use(express.json())

// app.use('/api', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/supplier', supplierRoutes);

// // PAYPAL 
// app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/build')))

//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
// } else {
//     app.get('/', (req, res) => {
//         res.send("API is running");
//     })
// }

// app.use(notFound)
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000;

// app.listen(
//     PORT,
//     console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
// );