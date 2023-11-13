# Prueba Pegasi

El proposito de este repositorio es presentar una prueba tecnica para demostrar mis conocimientos tanto en frontend (Angular) como en backend (Nodejs).

Para esto se me dio la tarea de implementar un frontend donde los usuarios puedan hacer consultas al backend, de igual manera se implemento un backend principal conectado al frontend y otros dos backends de terceros usados para hacer consultas a sus APIs desde el backend principal.

A continuacion se explican mas a detalle

## API de Hospital Buena Vida (hbv-backend)

Representa una de nuestras APIs de terceros a utilizar en caso de no encontrar datos en la propia.

Consta de un solo endpoint, el cual se explica a continuacion:

- **Metodo:** GET
- **URL:** /api/appointment
- **Query Params:**
  - `firstName`: tipo string, hace busqueda por la primera parte del nombre del paciente.
  - `lastName`: tipo string, hace busqueda por la ultima parte del nombre del paciente.
  - `age`: tipo string, formato numerico, entre 0 y 200, hace busqueda por la edad del paciente haciendo un calculo entre su fecha de nacimiento y la fecha actual.
  - `date`: tipo string, formato de fecha (AAAA-MM-DD), hace busqueda por la fecha de registro de la cita.

### Instalacion

### Prererquisitos

- Nodejs
- Tener un servidor de MongoDB en funcionamiento y destinado para esta API
- Tener clonado este repo

### Pasos

1. Ir a la ubicacion del proyecto

```shell
cd [folder-del-repo]/pegasi-backend
```

2. Crear un archivo nuevo `.env` en la raiz del proyecto.

3. Llenar este archivo con las variables de entorno necesarias (tomar como ejemplo `.env.example`)

4. Instalar las dependencias

```shell
npm install
```

5. Popular nuestra base de datos

```shell
npm run db:populate
```

6. Correr nuestra API

```shell
npm run dev
```

## API de System Technologies (st-backend)

Representa una de nnuestras APIs de terceros a utilizar en caso de no encontrar datos en la propia.

Consta de un solo endpoint, el cual se explica a continuacion:

- **Metodo:** GET
- **URL:** /api/appointment
- **Query Params:**
  - `firstName`: tipo string, hace busqueda por la primera parte del nombre del paciente.
  - `lastName`: tipo string, hace busqueda por la ultima parte del nombre del paciente.
  - `age`: tipo string, formato numerico, entre 0 y 200, hace busqueda por la edad del paciente haciendo un calculo entre su fecha de nacimiento y la fecha actual.
  - `date`: tipo string, formato de fecha (AAAA-MM-DD), hace busqueda por la fecha de registro de la cita.

### Instalacion

### Prererquisitos

- Nodejs
- Tener un servidor de MongoDB en funcionamiento y destinado para esta API
- Tener clonado este repo

### Pasos

1. Ir a la ubicacion del proyecto

```shell
cd [folder-del-repo]/pegasi-backend
```

2. Crear un archivo nuevo `.env` en la raiz del proyecto.

3. Llenar este archivo con las variables de entorno necesarias (tomar como ejemplo `.env.example`)

4. Instalar las dependencias

```shell
npm install
```

5. Popular nuestra base de datos

```shell
npm run db:populate
```

6. Correr nuestra API

```shell
npm run dev
```

## API de Pegasi (pegasi-backend)

Este es el backend principal, el cual proporcionara una API con la cual pegasi-frontend podra comunicarse.

Consta de un solo endpoint, el cual se explica a continuacion:

- **Metodo:** GET
- **URL:** /api/appointment
- **Query Params:**
  - `firstName`: tipo string, hace busqueda por la primera parte del nombre del paciente.
  - `lastName`: tipo string, hace busqueda por la ultima parte del nombre del paciente.
  - `age`: tipo string, formato numerico, entre 0 y 200, hace busqueda por la edad del paciente haciendo un calculo entre su fecha de nacimiento y la fecha actual.
  - `date`: tipo string, formato de fecha (AAAA-MM-DD), hace busqueda por la fecha de registro de la cita.
  - `externalResource`: tipo string, opciones validas: ('HBV', 'ST'), 'ST' por defecto, representa la API de terceros a consultar en caso de no encontrar coincidencias en la API principal

### Instalacion

### Prererquisitos

- Nodejs
- Tener un servidor de MongoDB en funcionamiento y destinado para esta API
- Tener clonado este repo

### Pasos

1. Ir a la ubicacion del proyecto

```shell
cd [folder-del-repo]/pegasi-backend
```

2. Crear un archivo nuevo `.env` en la raiz del proyecto.

3. Llenar este archivo con las variables de entorno necesarias (tomar como ejemplo `.env.example`)

4. Instalar las dependencias

```shell
npm install
```

5. Popular nuestra base de datos

```shell
npm run db:populate
```

6. Correr nuestra API

```shell
npm run dev
```

## Buscador de Agendamientos (pegasi-frontend)

Este es el frontend donde los usuarios haran las consultas, consta de un formulario con los siguientes campos:

- **Nombre del paciente:** input de tipo text donde se pueden hacer busquedas por el/los nombres de pacientes
- **Apellido del paciente:** input de tipo text donde se pueden hacer busquedas por el/los apellidos de pacientes
- **Edad del paciente:** input de tipo number donde se pueden hacer busquedas por la edad (años cumplidos) del paciente.
- **Fecha de la cita:** input de tipo date donde se pueden hacer busquedas por la fecha de cita de los pacientes

Cabe aclarar que ninguno de los campos es obligatorio llenar y que tener todos los campos en limpio significa hacer una consulta sin filtros.

Cuando se hace submit al form puede aparecer lo siguiente:

- Tabla con los resultados si se encontraron coincidencias.
- "No se encontraron resultados" si la busqueda dada no genero resultados.
- Mensaje de error si la consulta genero algun error.

### Instalacion

#### Prerequisitos

- Nodejs
- Angular CLI
- Tener clonado este repo

#### Pasos

1. Ir a la ubicacion del proyecto

```shell
cd [folder-del-repo]/pegasi-frontend
```

2. Instalar dependencias

```shell
npm install
```

3. Correr en el entorno de dev

```shell
ng serve
```

4. Esto hara correr la aplicacion en http://localhost:4200, cabe mencionar que para que funcione correctamente la API de `pegasi-backend` debe estar corriendo en http://localhost:3000 (editar /environments.environment.ts) para usar otra direccion para el backend
