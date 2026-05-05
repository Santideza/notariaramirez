import express from 'express'
import { Resend } from 'resend'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(cors())
app.use(express.json())

const requiredMailConfig = [
  'RESEND_API_KEY',
  'MAIL_FROM',
  'MAIL_TO'
]

const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const validateMailConfig = (res) => {
  const missingConfig = requiredMailConfig.filter((key) => !process.env[key])

  if (missingConfig.length > 0) {
    res.status(500).json({ message: 'Faltan variables de entorno para enviar el correo', missingConfig })
    return false
  }

  return true
}

app.post('/send-email', async (req, res) => {
  try {
    if (!validateMailConfig(res)) return

    const { nombres, apellidos, email, telefono, servicio, consulta } = req.body

    const { data, error } = await resend.emails.send({
      from: `Notaria Ramirez <${process.env.MAIL_FROM}>`,
      to: [process.env.MAIL_TO],
      replyTo: email,
      subject: 'Nueva consulta desde la web',
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
    })

    if (error) {
      console.error(error)
      return res.status(400).json({ message: error.message || 'Resend rechazo el envio del correo', error })
    }

    console.log('Correo enviado con Resend:', data)
    res.status(200).json({ message: 'Correo enviado correctamente', data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Error al enviar el correo' })
  }
})

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001')
})
