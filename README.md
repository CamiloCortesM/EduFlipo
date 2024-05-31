<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://reactjs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/320px-React-icon.svg.png" width="200" alt="React Logo" /></a>
</p>

# Eduflipo System

Welcome to Eduflipo System, a project that uses NestJS for the backend and React for the frontend.

## Running the Project

### Clone the Project

1. Clone the project from the repository.

### Running the backend

2. Navigate to the backend folder:

```bash
cd eduflipo-system
```

3. Install dependencies:

```bash
npm install
```

4. Clone the `.env.template` file and rename it to `.env`, then modify the environment variables as needed.

5. Start the database:

```bash
docker-compose up -d
```

6. Start the server:

```bash
npm run start:dev
```

### Running the frontend

7. Navigate to the frontend folder:

```bash
cd eduflipo-frontend
```

8. Install dependencies:

```bash
npm install
```

9. Start the application:

```bash
npm start
```

## Things to Note

10. Make sure the backend and frontend are running on the following ports:

```dotenv
BACKEND_PORT=3000
FRONTEND_PORT=5173
```

If you want to change any of the ports, make sure to update the corresponding files in the project.

11. Visit the backend documentation in your browser:

```
http://localhost:3000/api
```
![Swagger](https://www.rafaelacosta.net/BlogContent/BlogImages/5152dfcb-ec8f-4925-aba4-27331d903576.png)

If you have any questions or suggestions, please do not hesitate to contact me.

## Potential Issues

When the option `synchronize: true` is activated in the backend's `app.module.ts` file, the database is created and related in MySQL. However, if there is existing data in the database and the application is restarted, unique fields are cleared. This behavior is not suitable for production. If you encounter issues, please comment out line 20 in `app.module.ts` to prevent this behavior.

### Common Errors

- **Database Connection Error:** Verify your database configuration and ensure the database server is running. If you have a local MySQL database, ensure it is operational or stop the service to free up the default port.
  
- **Dependency Installation Error:** Ensure all dependencies are correctly installed using `npm install`.

- **Port Conflict Error:** Ensure that the specified ports for the backend and frontend are not in use by other applications.

- **Environment Configuration Error:** Check your environment variables and configuration files for any errors or missing values.

