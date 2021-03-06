# ProyectoBackend_BuscadorDePeliculas

Aplicaci贸n para la gesti贸n de Usuarios, Mascotas y Citas veterinarias.
<br><br>

### Instalaci贸n 馃敡
<br>

_Para instalar el proyecto deber谩s copiar en tu disco local el repositorio de GitHub con el siguiente comando:_

```
git clone https://github.com/AxelUrizar/AppCitasVeterinarias_ProyectoBackend
```
<br>

_Tras lo cual tendremos que entrar a la carpeta generada por el comando anterior y instalar las dependencias con:_

```
npm install
```
o

```
yarn install
```
<br>

_Una vez terminado el paso anterior procederemos a la ejecuci贸n de los siguientes comandos con tal de crear nuestra base de datos:_


```
sequelize db:create
```
```
sequelize db:migrate
```
<br>

_Tras acabar con el paso anterior tendremos una base de datos funcional._

<br>

_Sin embargo, en caso de que queramos inyectar datos para probarla podemos usar el siguiente comando lo cual generar谩 tres instancias de Usuarios, Mascotas, Veterinarios y Citas:_

```
sequelize db:seed:all
```
<br>

## Ejecutando las pruebas 鈿欙笍

_Para probar el proyecto usaremos Postman mandando peticiones a todos los endpoints_

Endpoints Usuarios:

* Mostrar todos los usuarios: (GET "/usuarios")

* Mostrar un s贸lo usuario: (GET "/usuarios/perfil")

* Registrar nuevo usuario: (POST "/usuarios/registrarse") y pasamos por body con formato JSON los datos del nuevo usuario.

* Login a un usuario: (POST "/usuarios/login") con lo que recibiremos un token para poder acceder a las funcionalidades como ver tu perfil o borrarlo.

* Logout a un usuario: (DELETE "/usuarios/logout")

* Borrar Usuario: (DELETE "usuarios/eliminar) Borrar谩 el usuario indicado por token.

Endpoints Mascotas: 

* Mostrar todas las mascotas: (GET "/mascotas")

* Mostrar mascotas de un usuario: (GET "/mascotas/usuario")

* A帽adir nueva mascota: (POST "/mascotas/nuevaMascota")

* Borrar mascota existente: (DELETE "/mascotas/borrarMascota")

Endpoints Citas: 

* Mostrar todas las citas: (GET "/citas")

* Mostrar citas de un usuario: (GET "/citas/usuario")

* Generar una cita: (POST "/citas/nuevaCita")

* Modificar una cita: (PUT "/citas/modificar")

* Borrar una cita: (DELETE "/citas/eliminar/[ ID de la cita que queramos eliminar ] ")

<br>

## Construido con 馃洜锔?

* Javascript
* Node.js
* MySQL
* Sequelize
* Express
* Postman

<br>

## Autores 鉁掞笍

* **Axel Urizar** - [GitHub](https://github.com/AxelUrizar)
