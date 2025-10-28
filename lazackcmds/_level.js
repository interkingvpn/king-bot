import { canLevelUp } from '../lib/levelling.js'

// Definición de roles y niveles mínimos
const roles = {
    '*Aventurero - Novato V*': 0,
    '*Aventurero - Novato IV*': 2,
    '*Aventurero - Novato III*': 4,
    '*Aventurero - Novato II*': 6,
    '*Aventurero - Novato I*': 8,
    '*Aprendiz del Camino V*': 10,
    '*Aprendiz del Camino IV*': 12,
    '*Aprendiz del Camino III*': 14,
    '*Aprendiz del Camino II*': 16,
    '*Aprendiz del Camino I*': 18,
    '*Explorador del Valle V*': 20,
    '*Explorador del Valle IV*': 22,
    '*Explorador del Valle III*': 24,
    '*Explorador del Valle II*': 26,
    '*Explorador del Valle I*': 28,
    '*Guerrero del Alba V*': 30,
    '*Guerrero del Alba IV*': 32,
    '*Guerrero del Alba III*': 34,
    '*Guerrero del Alba II*': 36,
    '*Guerrero del Alba I*': 38,
    '*Guardián del Bosque V*': 40,
    '*Guardián del Bosque IV*': 42,
    '*Guardián del Bosque III*': 44,
    '*Guardián del Bosque II*': 46,
    '*Guardián del Bosque I*': 48,
    '*Mago del Crepúsculo V*': 50,
    '*Mago del Crepúsculo IV*': 52,
    '*Mago del Crepúsculo III*': 54,
    '*Mago del Crepúsculo II*': 56,
    '*Mago del Crepúsculo I*': 58,
    '*Héroe de la Corona V*': 60,
    '*Héroe de la Corona IV*': 62,
    '*Héroe de la Corona III*': 64,
    '*Héroe de la Corona II*': 66,
    '*Héroe de la Corona I*': 68,
    '*Paladín Diamante V*': 70,
    '*Paladín Diamante IV*': 72,
    '*Paladín Diamante III*': 74,
    '*Paladín Diamante II*': 76,
    '*Paladín Diamante I*': 78,
    '*Maestro Estelar V*': 80,
    '*Maestro Estelar IV*': 85,
    '*Maestro Estelar III*': 90,
    '*Maestro Estelar II*': 95,
    '*Maestro Estelar I*': 99,
    '*Leyenda del Valle V*': 100,
    '*Leyenda del Valle IV*': 110,
    '*Leyenda del Valle III*': 120,
    '*Leyenda del Valle II*': 130,
    '*Leyenda del Valle I*': 140,
    '*Soberano del Reino V*': 150,
    '*Soberano del Reino IV*': 160,
    '*Soberano del Reino III*': 170,
    '*Soberano del Reino II*': 180,
    '*Soberano del Reino I*': 199,
    '*Titán del Norte V*': 200,
    '*Titán del Norte IV*': 225,
    '*Titán del Norte III*': 250,
    '*Titán del Norte II*': 275,
    '*Titán del Norte I*': 299,
    '*Guardián de la Luz V*': 300,
    '*Guardián de la Luz IV*': 325,
    '*Guardián de la Luz III*': 350,
    '*Guardián de la Luz II*': 375,
    '*Guardián de la Luz I*': 399,
    '*Maestro de Magia V*': 400,
    '*Maestro de Magia IV*': 425,
    '*Maestro de Magia III*': 450,
    '*Maestro de Magia II*': 475,
    '*Maestro de Magia I*': 499,
    '*Señor de la Guerra V*': 500,
    '*Señor de la Guerra IV*': 525,
    '*Señor de la Guerra III*': 550,
    '*Señor de la Guerra II*': 575,
    '*Señor de la Guerra I*': 599,
    '*Héroe Inmortal V*': 600,
    '*Héroe Inmortal IV*': 625,
    '*Héroe Inmortal III*': 650,
    '*Héroe Inmortal II*': 675,
    '*Héroe Inmortal I*': 699,
    '*Maestro de la Realidad V*': 700,
    '*Maestro de la Realidad IV*': 725,
    '*Maestro de la Realidad III*': 750,
    '*Maestro de la Realidad II*': 775,
    '*Maestro de la Realidad I*': 799,
    '*Sabio Eterno V*': 800,
    '*Sabio Eterno IV*': 825,
    '*Sabio Eterno III*': 850,
    '*Sabio Eterno II*': 875,
    '*Sabio Eterno I*': 899,
    '*Viajero Multiverso V*': 900,
    '*Viajero Multiverso IV*': 925,
    '*Viajero Multiverso III*': 950,
    '*Viajero Multiverso II*': 975,
    '*Viajero Multiverso I*': 999,
    '*Deidad de la Eternidad V*': 1000,
    '*Deidad de la Eternidad IV*': 2000,
    '*Deidad de la Eternidad III*': 3000,
    '*Deidad de la Eternidad II*': 4000,
    '*Deidad de la Eternidad I*': 5000,
    '*Gran Monarca de las Sombras*': 10000,
}

let handler = m => m
handler.before = async function (m, { conn }) {
    
    // Determinar quién es el usuario objetivo
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[m.sender]
    
    let level = user.level
    let before = user.level * 1
    
    // Subir de nivel mientras sea posible
    while (canLevelUp(user.level, user.exp, global.multiplier)) 
        user.level++
    
    // Si el usuario subió de nivel, otorgar recompensas aleatorias
    if (before !== user.level) {
        let especial = 'coin'
        let especial2 = 'exp'
        let cantidadEspecial = Math.floor(Math.random() * (100 - 10 + 1)) + 10
        let cantidadEspecial2 = Math.floor(Math.random() * (100 - 10 + 1)) + 10

        if (user.level % 5 === 0) {
            user[especial] += cantidadEspecial
            user[especial2] += cantidadEspecial2
        }
    }

    // Asignar rol según el nivel
    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([, minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role

    return true
}

export default handler