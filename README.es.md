# WiseHealth API
[![Read in English](https://img.shields.io/badge/🌐-Read%20in%20English-blue)](README.md)

Es una API **serverlees** construida con **Node.js** y desplegada en **vercel** como parte del proyecto **[WiseHealt](https://github.com/Rodrigo-Palacios/WiseHealth)**, el objetivo del proyecto es aprender y poner en practica los fundamentos de back-end especialmente en el terreno de las APIs serverless.

---

## 🚀 Endpoints disponibles    

### 1. `/api/tarifas`

Devuelve las tarifas filtradas por edad y género.

### 2. `/api/cotizar`

Recibe una lista de personas y devuelve los totales por plan.

### 3. `/api/planes`

Expone la información estática de cada plan ( suma asegurada, deducible, coaseguro etc.).

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
