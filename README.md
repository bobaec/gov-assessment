Technical Assessment

Stack: PostgreSQL, Express, Node.js, React<br/>
Front-end libraries: React, Bootstrap, SASS/LESS<br/>
Back-end libraries: Cors, Express, pg
Hosted on: AWS EC2

How to run and install locally
1. git clone https://github.com/bobaec/gov-assessment.git
2. cd gov-assessment
3. npm run install-all
4. Install PostgreSQL locally: https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql<br/>
&emsp; a. inside /server/database.sql, run these database commands in your psql terminal
5. npm start
6. localhost:3000 will open
7. enter login information (sent to you by email)

Features
If you are John (viewer) you can only see paint availability.
If you are a Painter (painter) you can see paint availability and increase/decrease paint stock by one.
If you are Jane (manager) you can see paint availability, increase/decrease paint stock by one, order in bulk.
If you are Adam (administrator) you can see paint availability, increase/decrease paint stock by one, order in bulk, and visit the Admin page
 - You can also edit users' name, email, role, and/or if the account is enabled/disabled.

-Examples-
As John:
![image](https://github.com/bobaec/gov-assessment/assets/22423987/b18305db-1ecc-4165-85dd-14c6ff152753)

As a Painter:
![chrome_HlRD8NCN9T](https://github.com/bobaec/gov-assessment/assets/22423987/9afdf34c-5c82-414a-a8fa-a34e462b7fa4)

As Jane:
![chrome_lS3Sx21fwi](https://github.com/bobaec/gov-assessment/assets/22423987/66a4bfb7-1565-4c97-850b-2f883c4f4b83)

As Adam:
![chrome_YABHZAzTvc](https://github.com/bobaec/gov-assessment/assets/22423987/b3e88b29-843a-4824-9543-a2343cd0b696)
