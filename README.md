# TurboForo2 - Frontend

Esta es la **aplicación frontend de TurboForo2**, desarrollada en **React**, diseñada para interactuar con la API de TurboForo2 y ofrecer una experiencia de usuario fluida, moderna y segura para la gestión de usuarios, publicaciones y comentarios en un foro en línea.

⚠️ **Dependencia:** Esta aplicación consume la API de TurboForo2, por lo que requiere que el backend esté funcionando.

## Funcionalidades principales

### Autenticación y gestión de sesión
- Registro y login de usuarios mediante el uso de **JWT**.
- Recuperación de contraseña con integración de token enviado por email.
- Persistencia de sesión usando cookies seguras.

### Gestión de usuarios
- Visualización y edición de perfil de usuario.
- Visualización de hilos, mensajes y datos sobre verificación, veteranía y administración.

### Gestión de publicaciones y comentarios
- CRUD completo sobre hilos y mensajes y comentarios mediante **fetch** a la API.
- Actualización del estado de la UI tras crear, editar o eliminar contenido.

### Consumo de API
- Uso de **fetch** con credenciales (`credentials: 'include'`) para interactuar con el backend.
- Manejo de respuestas y errores, mostrando notificaciones al usuario.
- Integración de **CSRF token** para formularios sensibles.

### Routing y protección de rutas
- Rutas implementadas con **react-router-dom**.
- Redirección automática según el estado de autenticación del usuario.

### Notificaciones y feedback
- Uso de **toast** con sonner para alertar sobre acciones exitosas o errores.
- Mensajes claros cuando fallan operaciones críticas.

### Manejo de estado global
- **Context API** (`useContext`) para gestionar estado de usuario.
- Actualización automática del estado tras operaciones CRUD sobre hilos y mensajes.

### Seguridad y buenas prácticas
- Protección de formularios sensibles con **CSRF tokens**.
-Protcción de rutas. Si un usuario no está logueado no puede ver rutas como el perfil.

## Tecnologías y Herramientas Utilizadas
- React
- React Router DOM
- fetch
- Librerías de notificaciones como `sonner`
- Manejo de cookies y CSRF para seguridad

---

Este frontend está pensado para ser **consumido junto al backend de TurboForo2**, ofreciendo una interfaz completa y segura para usuarios y administradores de un foro en línea.









# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
