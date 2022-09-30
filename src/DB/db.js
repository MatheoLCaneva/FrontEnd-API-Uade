import matematica from "../assets/matematica.jpg"
import biologia from "../assets/biologia.jpg"
import geografia from "../assets/geografia.jpg"

const clases = [
    {
        id: "Mat1", materia: "Matematica", tipo: "Individual", frecuencia: "Semanal", calificacion: "8", duracion: "1h", precio: "800", profesorid: "1", nombre: "Enrique", apellido:"Perez", img:matematica, descripcionClase: "Clases particulares de matematica inicial para niños que tramiten los años primarios del colegio.", descripcionProfesor: "Brindo clases desde los 20 años, ayudando a las personas que no se llevan bien con los números a poder pasar esas materias que tanto pueden llegar a costar. Quiero que te lleves una buena experiencia de mi parte."
    },
    {
        id: "Geo1", materia: "Geografía", tipo: "Individual", frecuencia: "Unica", calificacion: "7", duracion: "1.30hs", precio: "600", profesorid: "2", nombre: "Martin", apellido:"Ramos", img:geografia, descripcionClase: "Clases de Geografía para alumnos de nivel secundario. Vení y aproba con todo!", descripcionProfesor: "Soy profesor Universitario, recibido en ciencias geológicas y apasionado por enseñar lo que se al resto."
    },
    {
        id: "Fis1", materia: "Física", tipo: "Individual", frecuencia: "Mensual", calificacion: "9", duracion: "1h", precio: "800", profesorid: "3", nombre: "Enrique", apellido:"Rodriguez", img:matematica, descripcionClase: "Clases de Física General para que apruebes sabiendo. Cinemática y dinámica, MRU-MRUV-Tiro Oblicuo y mucho mas.", descripcionProfesor: "Soy ingeniero mecánico, brindo clases por gusto y para ayudar a los que mas les cuesta. Trabaje 15 años en nivel secundario y 1 año en universidad. Actualmente me encuentro en Inglaterra."
    },
    {
        id: "Bio1", materia: "Biología", tipo: "Grupal", frecuencia: "Semanal", calificacion: "6", duracion: "2hs", precio: "900", profesorid: "4", nombre: "Fernando", apellido:"Fernandez", img:biologia, descripcionClase: "Clases de biología de nivel secundario para que puedas entender a las células procariotas y mucho mas.", descripcionProfesor: "Estudiante de Ciencias Biológicas, realizando mi último año para recibirme. Doy apoyo a gente de nivel secundario y universitario. Ayudo en la comprensión de textos y la realización de ejercicios prácticos."
    },
    {
        id: "Alg1", materia: "Algebra", tipo: "Individual", frecuencia: "Unica", calificacion: "10", duracion: "1h", precio: "1000", profesorid: "3", nombre: "Luis", apellido:"Roca", img:matematica, descripcionClase: "Algebra Universitaria para que pierdas el miedo a los vectores y eso que nos traumaba en el secundario.", descripcionProfesor: ""
    }
]

const comentarios = [
    {idMateria: "Mat1", }
]

export const getClases = (tiempo) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() =>{
            resolve(clases)
        }, tiempo)
    })
}