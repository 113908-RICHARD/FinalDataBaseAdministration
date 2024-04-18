# EXAMENN DABD

Se provee una API encargada del manejo de perfiles de usuarios se le solicita (https://userprofile.nhorenstein.com/):

### LOGIN

API: `api/auth/login` (POST)
Realizar un login en el cual se debe permitir al usuario ingresar sus credenciales (email y contraseña) los cuales deben estar validados minimamente como requeridos y de tipo email. En caso de ingresar credenciales inválidas se debe mostrar un mensaje debajo del formulario de ingreso con la legenda: "Usuario/contraseña incorrectos".
Si las credenciales son correctas se debe redirigir al usuario a la pantalla de edición de perfil de usuario con la ruta `user/profile`.

En caso de que el usuario ya ingresó al sistema y re cargue la página debe redirigir al componente de edición de perfil. En caso de querer ingresar a un componente distinto del login sin haber ingresado al sistema debe redirigir al login (solicitar confirmación).

IMPORTANTE: Teniendo en cuenta los datos de autogestión la clave es su primer apellido con la primer letra mayúscula seguido de la primer letra de su primer nombre en minúscula, seguido de su legajo y finalizando con un asterisco, TODO JUNTO, SIN ESPACIOS NI SIGNOS.

### EDICIÓN PERFIL

Con los datos del perfil obtenidos de la API: `api/user/profile` (GET), debe construir un formulario que permita la edición de los siguientes campos únicamente:
- Nombre de usuario (userName): requerido, minimo 8, maximo 50
- Email (email): edición deshabilitada, se debe enviar con el valor que devuelve la API.
- Nombre (firstName): requerido, maximo 20
- Apellido (lastName): requerido, maximo 25
- Pais (countryId): requerido, combo cargado con la API: `api/country` (GET)
- Provincia (stateId): opcional, combo cargado en base a el pais seleccionado consultando la API: `api/country/{countryId}/states` (GET)
- Telefono (phoneNumber): requerido, con el formato XXX-XXX-XXX (usar validación personalizada en vez de expresiones regulares)
- Hobbies (hobbies): arreglo de enteros que deben ser cargados por medio de un FormArray en el cual cargaran un combo en base a la API: `api/hobby` y de dicho FormArray deben enviar a la API los ids seleccionados en cada uno. Se debe permitir agregar y borrar filas. El limite máximo de filas a agregar es 8 y el mínimo es 1.

El botón cerrar debe cerrar la sesión y redirigir al login. El botón Guardar Cambios debe validar que los datos del formulario sean correctos y en caso de serlo actualizar la información del usuario por medio de una llamada a la API: `api/user/profile` (PUT).

### VISUALIZACIÓN PERFIL

API: `api/user/profile` (GET)
Por último al guardar el usuario exitosamente, debe redirigir a un nuevo componente en el cual muestre los datos del usuario editado en modo lectura (ruta: `user/profile/view`). Puede utilizar cualquier elemento de bootstrap para la visualización de dichos datos. Los hobbies deben tener un contenedor por cada uno de ellos y aplicarle a cada uno de los los estilos devueltos en la API: `api/user/settings`.
Además se debe proveer de un botón para redirigir a la edición del perfil.

## Considereciones generales

Todos las validaciones deben ser mostradas detalladamente junto al componente que se encuentra en un estado invalido con colores en las legendas y los bordes del control en cuestión.

## Mock ups

# Formulario Login
https://sendapic.xyz/api/embed/aICWf4

# Edición Perfil
https://sendapic.xyz/api/embed/wOgZLX

## Puntaje

Formulario Edición Perfil (4)
Formulario Login (2)
Validación usuario logueado (1)
Visualización perfil completo (2)
Estilos (1)
