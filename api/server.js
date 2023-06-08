import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer"
import path from "path"

dotenv.config({path:"./api/.env"})
export const app = express()

app.use(cors())
app.use(express.static("public"))

// Configuración de Multer para almacenar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage });

app.get("/api/test", (req, res) => {
    res.json({body: "hello world" + Date.now()})
})

// Ruta de carga de imágenes
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No se ha seleccionado ninguna imagen.');
    }
  
    // Enviar la respuesta con la URL de la imagen cargada
    res.json({ imageUrl: `https://deploy-test-two-rho.vercel.app/uploads/${req.file.filename}` });
  });

const PORT = 4000 || "https://deploy-test-two-rho.vercel.app"

if (PORT) {
    app.listen(PORT, console.log(`escuchando en puerto ${PORT}`))
}

