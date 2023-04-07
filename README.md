  <h1>Chat App</h1>
    <p>This is a chat application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.io for real-time messaging and JWT Token for authentication.</p>
    <h2>Getting Started</h2>
<p>To get started with this project, you'll need to clone the repository and install the necessary dependencies.</p>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js</li>
  <li>MongoDB</li>
</ul>

<h3>Installation</h3>
<ol>
  <li>Clone the repository.</li>
  <code>git clone https://github.com/&lt;your-username&gt;/chat-app.git</code>
  
  <li>Navigate to the root directory of the project and install the dependencies for the server.</li>
  <code>cd chat-app/server</code>
  <code>npm install</code>
  
  <li>Install the dependencies for the client.</li>
  <code>cd ../client</code>
  <code>npm install</code>
  
  <li>Create a .env file in the server directory with the following variables:</li>
  <pre>MONGO_URI=&lt;your-mongodb-uri&gt;
   <li>Start the server.</li>
  <code>cd ../server</code>
  <code>npm start</code>
  
  <li>Start the client.</li>
  <code>cd ../client</code>
  <code>npm start</code>
</ol>

<h2>Pages</h2>

<h3>Login</h3>
<p>The login page allows users to log in to the chat application. Users are required to provide their username and password. If the user does not have an account, they can click on the "Register" button to create a new account.</p>
<img src="https://user-images.githubusercontent.com/113131666/230650484-227599a1-0d74-4d69-a0fc-0ff03b2d61c9.png" />

<h3>Register</h3>
<p>The register page allows users to create a new account. Users are required to provide their email, username, password, and insure password .</p>
<img src="https://user-images.githubusercontent.com/113131666/230650704-e60c5c7c-43e5-4d91-8fe2-77b1e782632a.png"/>

<h3>Set Avatar</h3>
<p>The set avatar page allows users to select their avatar image. Users are required to choose avatr.</p>
<p>while the avatars loading cool robot dance </p>
<img src="https://user-images.githubusercontent.com/113131666/230651005-a173acbb-b48b-4748-ad57-186c4d5d3e9b.png"/>
<img src="https://user-images.githubusercontent.com/113131666/230651052-9cf90c1f-e541-49fe-8201-6b27ac6dccbd.png"/>

<h3>Chat</h3>
<p>The chat page allows users to chat with other users in real-time. Users can send text messages and emojis. Each message also includes the user's avatar image.</p>
<img src="https://user-images.githubusercontent.com/113131666/230651103-4fbc6e1a-1ea3-4ad8-8b70-b6a35584e02a.png"/>
<img src="https://user-images.githubusercontent.com/113131666/230651156-5472209c-6da4-44c0-8663-fc22e04901f8.png"/>
<h2>Technologies Used</h2>
<ul>
  <li>MERN Stack (MongoDB, Express, React, Node.js)</li>
  <li>Socket.io</li>
  <li>JWT Token</li>
</ul>

