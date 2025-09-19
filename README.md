# WiseHealth API
[![Leer en Español](https://img.shields.io/badge/🌐-Leer%20en%20Español-green)](README.es.md)

A **serverless** API built with **Node.js** and deployed on **Vercel** as part of the **[WiseHealth](https://github.com/Rodrigo-Palacios/WiseHealth)** project.  
The goal is to learn and practice back-end fundamentals, especially around serverless APIs.

---

## 🚀 Available Endpoint  

### 1. `/api/tarifas`

Returns rates filtered by age and gender.

### 2. `/api/cotizar`

Accepts a list of people and returns total cost per plan.

### 3. `/api/planes`

Exposes static information for each plan (sum insured, deductible, coinsurance, etc.).

## 📂 Structure

wisehealth-api/  
├─ api/  
│ ├─ tarifas.js  
│ ├─ cotizar.js  
│ └─ planes.js  
├─ data/  
│ ├─ tarifas.json  
│ ├─ planes.json  
│ └─ raw/ (archivos CSV originales)  
├─ scripts/  
│ ├─ csvToJsonTarifas.js  
│ └─ csvToJsonPlanes.js  
├─ package.json  
└─ README.md  

## 🛠️ Technologies used

- Node.js
- Vercel Serverless Functions
- Fs/promises (to read JSON files)
- CSV Parser (to transform raw data into JSON)

##  📦 Local setup

1. Clone the repository:
```bash
git clone Rodrigo-Palacios/WiseHealth
cd wisehealth-api
```

2. Install dependencies:
```bash
pnpm install
```

3. Run locally with vercel:
```bash
vercel dev
```
## 🧑‍💻 Author
Build by [Rodrigo Palacios](https://github.com/Rodrigo-Palacios) as learning project.
Questions? [Send me an email](mailto:rodrigo.palacios@rodrigocod.ing?subject=Consulta%20sobre%20WiseHealth&body=Hola%20Rodrigo,)


> ⚠️ **Note**: This API is an educational/portfolio project only.  
> It does not represent real products and should not be used as one.
