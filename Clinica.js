//Modulos importados (para usar el metodo import colocar "type": "module" en el package.json )
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import http from "http";
import _ from "lodash";
import chalk from "chalk";

//variables pre-preparadas que se usaran durante el desafio
let port = 8080;
let lista = [];
let i = 1;

//Se nos solicita levatar un servidor con una ruta que llamaremos "/usuarios"
http
  .createServer(function (req, res) {
    if (req.url.includes("/usuarios")) {
      /*1. El registro de los usuarios debe hacerse con la API Random User usando axios para
        consultar la data.*/
      axios
        .get("https://randomuser.me/api")
        .then((data) => {
          const nombre = data.data.results[0].name.first;
          const apellido = data.data.results[0].name.last;
          let idUsuario = uuidv4().slice(0, 6);//2.Campo id único generado por el paquete UUID.          
          let fecha = moment().format("MMMM Do YYYY, h:mm:ss a");//3.timestamp almacenando la fecha de registro obtenida por medio del paquete Moment.          
          let nuevoRegistro =
            i +
            `. Nombre: ${nombre} - Apellido: ${apellido} - ID: ${idUsuario} - Timestamp: ${fecha}\n`;
          lista.push(nuevoRegistro);
          i++;
          _.forEach(lista,(u)=>{  //4.Lodash para recorrer el arreglo de usuarios.            
            res.write(`${u}`);
            console.log(chalk.blue.bgWhite(u))//5.la misma lista de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
        })
        res.end();
          //console.log(nuevoRegistro)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })
  .listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`);
  });
