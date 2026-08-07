# Secure Healthcare Data Management

Final-year college demo: **Secure Healthcare Data Management Using Dynamic Key-Based Encryption, QKD Simulation and Blockchain Storage**.

React + Vite + Tailwind CSS frontend with simulated auth and local storage for records.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Pages

| Route       | Description                          |
|------------|--------------------------------------|
| `/`        | Home with hero, Login / Register     |
| `/login`   | Email, password, Doctor/Patient role |
| `/register`| Registration form                    |
| `/doctor`  | Doctor dashboard (protected)         |
| `/patient` | Patient dashboard (protected)        |
| `/security`| Security simulation cards            |

## Notes

- Authentication uses **localStorage** only (not secure for production).
- Medical records persist in **localStorage** with seed dummy data.
- Security (encryption, QKD, blockchain) is **UI simulation only**.

## Folder structure

```
src/
├── components/
├── pages/
├── layouts/
├── assets/
├── services/
├── App.jsx
└── main.jsx
```
