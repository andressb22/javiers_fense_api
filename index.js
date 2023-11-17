const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;

const app = express();

const sendEmail = async (nombre, correo, telefono, observaciones) => {
  
  const configMail = {
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "info@javiers-fence.com",
      pass: "Javiersfence2025$--",
    },
  };

  const transport = nodemailer.createTransport(configMail);

  const mensaje = {
    from: "info@javiers-fence.com",
    to: "info@javiers-fence.com",
    subject: "New Client",
    text: `
       New Client\n\n

        we have received a notification from a customer interested in purchasing our<br/>
        services. This is a great step forward for us and shows the interest and<br/>
        confidence that people have in what we offer. The client, whose name <br/>
        ${nombre}, has expressed interest in our services through the website.<br/><br/>
        They have provided the following initial information:
  
        <strong>Name: ${nombre}\n
        <strong>Email: ${correo}\n
        <strong>Phone: ${telefono}\n
        Commets: ${observaciones}\n
     `,
    html: `
    <html>
      <h1>New Client</h1>
      <p>
        we have received a notification from a customer interested in purchasing our<br/>
        services. This is a great step forward for us and shows the interest and<br/>
        confidence that people have in what we offer. The client, whose name <br/>
        ${nombre}, has expressed interest in our services through the website.<br/><br/>
        They have provided the following initial information:
      </p>
      <p>
        <strong>Name:</strong> ${nombre}<br />
        <strong>Email:</strong> ${correo}<br />
        <strong>Phone:</strong> ${telefono}<br />
        <strong>Commets:</strong> ${observaciones}<br />
      </p>
    </html>`,
  };

  const info = await transport.sendMail(mensaje);
  console.log(info);
};

const corsOptions = {
  origin: "*", //'https://javiers-fence.com/', // Cambia esto al origen de tu aplicación cliente
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite el envío de cookies y encabezados de autenticación
  optionsSuccessStatus: 204, // Devuelve un código de estado 204 si la opción Preflight es exitosa
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/prueba", (req, res) => {
  res.json({ data: "api funciona correctamente" });
});

app.post("/saveInfoClient", (req, res) => {
  const { nombre, correo, telefono, observaciones } = req.body;

  const saveInfoClient = async () => {
    try {
      const { pool } = require("./db");

      await pool.query(
        `INSERT INTO info_client(inc_name,inc_phone,inc_email,inc_commets)
        VALUES(?,?,?,?)`,
        [nombre, telefono, correo, observaciones]
      );

      
      
      res.status(200).json({ data: "guardado correctamente" });
      sendEmail(nombre, correo, telefono, observaciones);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };

  saveInfoClient();
});

app.listen(PORT, () => {
  console.log("puerto escuchando en puerto 5000");
});
