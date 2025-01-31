# Contribution Guidelines for 100XGROW

We are excited to have you contribute to the 100XGROW project! Please follow the guidelines below to ensure a smooth contribution process.

## Steps to Contribute

1. **Fork the Repository**  
   Start by forking the repository to your own GitHub account.

2. **Create a New Branch**  
   Always create a new branch for your work instead of working directly on the `main` branch. This will help in managing changes efficiently.  
   Example:
   ```bash
   git checkout -b your-feature-branch
   ```

3. **Backend Development**  
   If you're contributing to the backend, follow these steps:
   - Create a virtual environment in the repo directory:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       .\venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```bash
       source venv/bin/activate
       ```
   - Install the necessary dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Change the directory to the `backend` folder:
     ```bash
     cd backend
     ```
   - If you're working on a new feature or app part, **create a new folder** within the `backend` directory for that functionality.

4. **Frontend Development**  
   For frontend contributions, follow these steps:
   - Change the directory to `frontend`:
     ```bash
     cd Frontend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start contributing to the frontend.

5. **Testing**  
   Ensure your changes do not break existing functionality.

6. **Create a Pull Request (PR)**  
   Once you're done with your work, push your changes to your forked repository and create a PR from your feature branch to the `main` branch of this repository.  
   Example:
   ```bash
   git push origin your-feature-branch
   ```

   When creating the PR:
   - Provide a clear description of the changes you've made.
   - Ensure your PR is targeting the `main` branch.
   - Follow the code style and best practices.

## Additional Notes
- Please do not work directly on the `main` branch.
- If you're contributing to a specific feature, it's best to create a new folder for your feature under the appropriate directory (either `backend` or `frontend`).
- For backend, ensure to keep the `requirements.txt` file updated with any new dependencies.
  
We appreciate your contribution to 100XGROW and look forward to your pull requests!

Happy coding! 🚀
