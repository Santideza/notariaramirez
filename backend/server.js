import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const getMissingMailConfig = () => {
  const requiredConfig = [
    'SMTP_USER',
    'SMTP_PASS',
    'MAIL_TO'
  ]

  if (!process.env.SMTP_SERVICE) {
    requiredConfig.push('SMTP_HOST', 'SMTP_PORT')
  }

  return requiredConfig.filter((key) => !process.env[key])
}

const getTransporter = () => {
  if (process.env.SMTP_SERVICE && !process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const buildReclamoEmail = (data) => {
  const { nombres, apellidos, email, telefono, tipoDocumento, numeroDocumento, direccion, tipoReclamo, detalleReclamo, pedidoConsumidor } = data

  return {
    subject: `Nuevo ${tipoReclamo || 'reclamo'} - Libro de Reclamaciones`,
    html: `
      <div style="background-color: #ffffff; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 700;">Nuevo ${escapeHtml(tipoReclamo || 'reclamo')}</h2>
          <p style="color: #666; margin-top: 10px; font-size: 16px;">Libro de Reclamaciones - Notaria Ramirez</p>

          <div style="background-color: #f5f5f5; border-left: 4px solid #bd1714; border-radius: 8px; padding: 25px; margin: 25px 0 20px;">
            <h3 style="color: #1a1a1a; font-size: 20px; margin: 0 0 20px;">Datos del Consumidor</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #666; font-size: 14px; width: 50%;">Nombres</td><td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(nombres)}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Apellidos</td><td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(apellidos)}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Tipo de Documento</td><td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(tipoDocumento)} - ${escapeHtml(numeroDocumento)}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Direccion</td><td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(direccion)}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 10px 0; color: #666; font-size: 14px;">Telefono</td><td style="padding: 10px 0; color: #1a1a1a; font-weight: 500;">${escapeHtml(telefono)}</td></tr>
            </table>
          </div>

          <div style="background-color: #f5f5f5; border-left: 4px solid #bd1714; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
            <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 15px;">Detalle del reclamo</h3>
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 0;">${escapeHtml(detalleReclamo)}</p>
          </div>

          <div style="background-color: #f5f5f5; border-left: 4px solid #bd1714; border-radius: 8px; padding: 25px;">
            <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 15px;">Pedido del Consumidor</h3>
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 0;">${escapeHtml(pedidoConsumidor)}</p>
          </div>
        </div>
      </div>
    `
  }
}

const buildConsultaEmail = (data) => {
  const { nombres, apellidos, email, telefono, servicio, consulta } = data

  return {
    subject: `Nueva consulta web - ${servicio || 'Servicio no especificado'}`,
    html: `
      <div style="background-color: #ffffff; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; margin: 0 0 10px; font-size: 28px; font-weight: 700;">Nueva consulta web</h2>
          <p style="color: #666; margin: 0 0 25px; font-size: 16px;">Formulario de contacto - Notaria Ramirez</p>

          <div style="background-color: #f5f5f5; border-left: 4px solid #bd1714; border-radius: 8px; padding: 25px; margin-bottom: 20px;">
            <p><strong>Nombres:</strong> ${escapeHtml(nombres)}</p>
            <p><strong>Apellidos:</strong> ${escapeHtml(apellidos)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefono:</strong> ${escapeHtml(telefono)}</p>
            <p><strong>Servicio:</strong> ${escapeHtml(servicio)}</p>
          </div>

          <div style="background-color: #f5f5f5; border-left: 4px solid #bd1714; border-radius: 8px; padding: 25px;">
            <h3 style="color: #1a1a1a; font-size: 18px; margin: 0 0 15px;">Consulta</h3>
            <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 0;">${escapeHtml(consulta)}</p>
          </div>
        </div>
      </div>
    `
  }
}

app.post('/send-email', async (req, res) => {
  try {
    const missingConfig = getMissingMailConfig()

    if (missingConfig.length > 0) {
      return res.status(500).json({ message: 'Faltan variables de entorno para enviar el correo' })
    }

    const { email, tipoReclamo } = req.body
    const mailContent = tipoReclamo ? buildReclamoEmail(req.body) : buildConsultaEmail(req.body)
    const transporter = getTransporter()

    await transporter.sendMail({
      from: process.env.MAIL_FROM || `"Notaria Ramirez" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: mailContent.subject,
      html: mailContent.html
    })

    res.status(200).json({ message: tipoReclamo ? 'Reclamo enviado correctamente' : 'Consulta enviada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al enviar el correo' })
  }
})

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001')
})
