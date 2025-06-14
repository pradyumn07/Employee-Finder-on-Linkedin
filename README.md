# 🚀 Employee Finder

A React + Node.js web application to search for employees of any company using their official domain. Uses SerpAPI to get the official domain and Hunter.io to fetch public employee data.

---

## 🛠️ Features

* Search employees by company name
* Fetches domain using SerpAPI
* Pulls employee data (name, email, position, LinkedIn) from Hunter.io
* Paginated table with dark/light theme toggle

---

## 📦 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/employee-finder.git
cd employee-finder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add:

```env
SERPAPI_KEY=your_serpapi_key
HUNTER_KEY=your_hunter_api_key
```

You can get your API keys from:

* [🔗 SerpAPI](https://serpapi.com/manage-api-key)
* [🔗 Hunter.io](https://hunter.io/api_keys)

### 4. Start the Backend Server

```bash
node server.js
```

### 5. Start the Frontend (React)

If using **Vite**:

```bash
npm run dev
```
