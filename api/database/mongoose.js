import mongoose from 'mongoose';
import { URL } from '../config/database.config.js';


export async function conectar() {
    console.log("conectado a " + URL)
    await mongoose.connect(URL)
}