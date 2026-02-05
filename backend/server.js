import app from "./src/app.js"
import pool from "./src/database/database.js"

async function testarConexao() {
  try {
    const [rows] = await pool.query("SELECT NOW()")
    console.log("Conectado ao MySQL ✅", rows)
  } catch (error) {
    console.error("Erro ao conectar ao MySQL ❌:", error)
  }
}

testarConexao()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
