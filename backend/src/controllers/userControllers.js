import pool from "../database/database.js"
import bcrypt from "bcrypt"

export async function getUsers (req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM users")
        return res.status(200).json(rows)
    }catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erro ao buscar usuário"})
    }
}

export async function postUsers(req, res) {
        try {
        const { nome, email, data_nascimento, senha, pais, genero } = req.body
        
        if (!nome || !email || !data_nascimento || !senha || !pais || !genero)
        return res.status(400).json({ error: "Todos os campos são obrigatórios!"})

        const [emailExists] = await pool.query(
            "SELECT ID from users where email = ?",
            [email]
        )

        if(emailExists.length > 0) {
            return res.status(409).json({ error: "Este e-mail já está em uso"})
        }

        const saltRounds = 10
        const senhaHash = await bcrypt.hash(senha, saltRounds)
        
        const [result] = await pool.query(`INSERT INTO users (nome, email, data_nascimento, senha, pais, genero)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [nome, email, data_nascimento, senhaHash, pais, genero])

        return res.status(201).json({ mensagem: "Usuário criado com sucesso!",
            usuario: { 
            id: result.insertId,
            nome,
            email,
            pais,
            genero
            }
        })

    }catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erro ao cadastrar usuário."})
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "ID é obrigatório"})
        }

        const [result] = await pool.query("DELETE FROM users where id = ?",
            [id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado"})
        }
        return res.status(200).json({ mensagem: "Usuário excluído com sucesso"})

    }catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Não foi possível excluir este usuário"})
    }
}