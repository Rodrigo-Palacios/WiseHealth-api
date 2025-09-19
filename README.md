# WiseHealth API
[![Leer en Español](https://img.shields.io/badge/🌐-Leer%20en%20Español-green)](README.es.md)

A **serverless** API built with **Node.js** and deployed on **Vercel** as part of the **[WiseHealth](https://github.com/Rodrigo-Palacios/WiseHealth)** project.  
The goal is to learn and practice back-end fundamentals, especially around serverless APIs.

---

## 🚀 Available Endpoints

### 1. `GET /api/tarifas`

Returns rates filtered by age and gender.

Query params:

    - edad (number) → Edad
    - genero (string) → "M", "F", "hombre", "mujer", etc.

Query:
```bash
curl "https://wisehealth-api.vercel.app/api/tarifas?edad=10&genero=mujer"
```

Response:
```json
{
  "ok": true,
  "item": [
    {
      "plan": "esencial",
      "total": 11725.533
    },
    {
      "plan": "optimo",
      "total": 11461.90909
    },
    {
      "plan": "premium",
      "total": 12401.78564
    }
  ]
}
```

### 2. `/api/cotizar`

Accepts a list of people and returns total cost per plan.
Body (JSON):
```json
{
  "personas": [
    { "edad": 10, "genero": "mujer" },
    { "edad": 1, "genero": "mujer" }
  ]
}
```
Example:
```bash
curl -X POST "https://wisehealth-api.vercel.app/api/cotizar" ` -H "Content-Type: application/json" ` --data '{ "personas": [ { "edad": 10, "genero": "mujer" }, {"edad": 1, "genero": "mujer" } ]}'
```

Response:
```json
{
    "ok":true,
    "items":[
        {"plan":"esencial","total":23741.68054},
        {"plan":"optimo","total":23207.89886},
        {"plan":"premium","total":25110.94658}
    ]
}
```

### 3. `/api/planes`

Exposes static information for each plan (sum insured, deductible, coinsurance, etc.).

Example:
```bash
curl "https://wisehealth-api.vercel.app/api/planes"
```

Response:
```json
{
  "ok": true,
  "item": [
    {
      "plan": "esencial",
      "moneda": "MXN",
      "suma_asegurada": 2000000,
      "deducible": 3,
      "coaseguro": 0.2,
      "tope_coaseguro": 86000,
      "renovación": "anual",
      "id": "esencial"
    },
    {
      "plan": "optimo",
      "moneda": "MXN",
      "suma_asegurada": 4000000,
      "deducible": 3,
      "coaseguro": 0.15,
      "tope_coaseguro": 86000,
      "renovación": "anual",
      "id": "optimo"
    },
    {
      "plan": "premium",
      "moneda": "MXN",
      "suma_asegurada": 8000000,
      "deducible": 3,
      "coaseguro": 0.1,
      "tope_coaseguro": 86000,
      "renovación": "anual",
      "id": "premium"
    }
  ]
}
```

## 📂 Structure

wisehealth-api/  
├─ api/  
│ ├─ tarifas.js  
│ ├─ cotizar.js  
│ └─ planes.js  
├─ data/  
│ ├─ tarifas.json  
│ ├─ planes.json  
│ └─ raw/ ( CSV original files)  
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
