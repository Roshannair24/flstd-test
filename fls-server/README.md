# Directions to start the server.js

### Steps to Generate a Personal Access Token
1. **Navigate to GitHub Settings:**
   - Log in and go to **Settings** (click your profile photo > **Settings**).

2. **Access Developer Settings:**
   - In the left sidebar, click **Developer settings**>>**Personal Access Token**>>**Tokens(classic)**.

3. **Generate New Token:**
   - Click **Personal access tokens** > **Generate new token**.

4. **Configure Token:**
   - Enter a token description.
   - Select required scopes. Select majority of them to avoid authentication issues.

5. **Generate Token:**
   - Click **Generate token**.

6. **Copy Your Token:**
   - **Important:** Copy the token displayed immediately. It won’t be visible again.


## Your token is ready for use.


7. **Paste the token in the .env file in PAT variable:**


8. **Install Dependencies :**
   - If your project has dependencies listed in a `package.json` file, install them:
     ```bash
     npm install
     ```

9. **Start the Server:**
   - Run the following command to start your Node.js server:
     ```bash
     node server.js
     ```



