# How to Deploy a Web Application to a Hosting Server

## 1. Purchase Windows Web Hosting
- Research and choose a reliable Windows web hosting provider that suits your needs.
- Purchase a suitable hosting plan that supports the technologies your web application uses (e.g., ASP.NET, MSSQL).

## 2. Create an Empty Website on the Hosting Server
- Access your hosting control panel (usually provided by the hosting provider).
- Find the option to create a new website or domain.
- Enter a domain/subdomain name and link it to the directory where your web application files will reside.

## 3. Create an Empty MSSQL Database
- In the hosting control panel, locate the database section.
- Create a new MSSQL database, noting down the database name, server address, username, and password.

## 4. Deploy Database Schema
- In your development environment, ensure you have a database project with SQL scripts for creating the necessary tables, procedures, and schema.
- Replace connection strings in the scripts with the database credentials you created earlier.
- Build the database project to generate the SQL script.
- Connect to the hosting server's MSSQL database using tools like SQL Server Management Studio.
- Run the generated SQL script to deploy the database schema.

## 5. Set Up an FTP Account
- In the hosting control panel, locate the FTP section.
- Create a new FTP account with a username and password.
- Specify the directory associated with this FTP account (usually the directory where your web application files will be uploaded).

## 6. Configure Publishing Profile in Visual Studio
- Open your web application project in Visual Studio.
- Right-click the project and select "Publish."
- Choose "Custom" as the publish target.
- Click "New Profile" and configure the connection settings:
  - Publish method: FTP
  - Server: FTP server address (provided by your hosting)
  - Site path: Directory path for your web application on the server
  - Username and password: FTP credentials you created earlier
  - Passive mode: Check if required by your hosting provider

## 7. Click the Publish Button
- After configuring the publishing profile, click "Publish" to start the deployment process.
- Visual Studio will package your web application files and upload them to the hosting server using the provided FTP credentials.
- Wait for the process to complete, and ensure there are no errors reported.

Congratulations! Your web application is now deployed to your hosting server. You can access it using the domain/subdomain you set up earlier. Make sure to test thoroughly to ensure all functionalities work as expected in the live environment.
