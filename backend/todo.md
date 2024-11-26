# Api endpoints

- Employers shall assign it to the employees [X]
- Employees can get tasks that assigned to them [X]
- Employees can update tasks, on task compltetion [X]
- Wheneven the employer adds a task, send push notification to the client [0]
- Store the device unquire id's within the employee documents.
- Store the employee image inside file storage [0]. (Thiking to store the avatar inside the database as base64 instead of fs)

# TODO;

Current status,

- Users can login or signup with auth0
- if a user is already present in the databse, (verify user ) fetch the userinfor the the localstorage
- If doesn't exists a singup controller is in place to create a user ,workspace,team
- After signup, the server will return everything from workspace, to teams and user
  informatoins to the client application and it should be stored in the asyncstorage
  of the client application.
