# How to use user-service
1. Import this user-service project
2. Run `npm install` on user-service
3. Please check .env.example in this project, copy the properties to project's .env
4. Call this function in your project's app.ts `app.use(userService.initialize({ swaggerSpecOption: swwaggerSpecOption }));`. See the example in app.ts
5. Calling the function will run migration script automatically and update database structure, especially table user
6. Please check swagger documentation e.g. http://localhost:3000/api-docs/ the user service API's should be added to the docs 

# Warning
This project will update the database, especially on table `user` and `user_auths`. Please check the migration scripts inside ./migrations folder and make sure the migration won't damage the current mechanism. 