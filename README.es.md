# WiseHealth API
[![Read in English](https://img.shields.io/badge/🌐-Read%20in%20English-blue)](README.md)

Es una API **serverlees** construida con **Node.js** y desplegada en **vercel** como parte del proyecto **[WiseHealt](https://github.com/Rodrigo-Palacios/WiseHealth)**, el objetivo del proyecto es aprender y poner en practica los fundamentos de back-end especialmente en el terreno de las APIs serverless.

---

## 🚀 Endpoints disponibles    

### 1. `GET /api/tarifas`

Devuelve las tarifas filtradas por edad y género.

Query params:

    - edad (number) → Edad
    - genero (string) → "M", "F", "hombre", "mujer", etc.
Query:
```bash
curl "https://wisehealth-api.vercel.app/api/tarifas?edad=10&genero=mujer"
```
Respuesta:
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

### 2. `POST /api/cotizar`

Recibe una lista de personas y devuelve los totales por plan.
Body (JSON):
```json
{
  "personas": [
    { "edad": 10, "genero": "mujer" },
    { "edad": 1, "genero": "mujer" }
  ]
}
```
Ejemplo:
```bash
curl -X POST "https://wisehealth-api.vercel.app/api/cotizar" ` -H "Content-Type: application/json" ` --data '{ "personas": [ { "edad": 10, "genero": "mujer" }, {"edad": 1, "genero": "mujer" } ]}'
```

Respuesta:
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

### 3. `GET /api/planes`

Expone la información estática de cada plan ( suma asegurada, deducible, coaseguro etc.).

Ejemplo:
```bash
curl "https://wisehealth-api.vercel.app/api/planes"
```

Respuesta:
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

## 📂 Estructura
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

## 🛠️ Tecnologías usadas

- Node.js
- Vercel Serverless Functions
- Fs/promises (para leer archivos JSON)
- CSV Parser (transforma datos a JSON)

##  📦 Instalación local

1. Clona el repositorio:
```bash
git clone Rodrigo-Palacios/WiseHealth
cd wisehealth-api
```

2. Instala dependencias:
```bash
pnpm install
```

3. Corre en modo local con vercel:
```bash
vercel dev
```
## 🧑‍💻 Autor
Desarrollado por [Rodrigo Palacios](https://github.com/Rodrigo-Palacios) como proyecto de aprendizaje.
Tienes dudas, [Envíame un correo](mailto:rodrigo.palacios@rodrigocod.ing?subject=Consulta%20sobre%20WiseHealth&body=Hola%20Rodrigo,)


> ⚠️ **Nota**: Esta API es solo un proyecto educativo y de portafolio.  
> No representa productos reales ni debe usarse como un producto.
