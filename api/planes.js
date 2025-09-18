import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const planesPath = path.join(__dirname, "..", "data", "planes.json");

let planesCache = null

//Carga los datos desde planes.csv
async function loader() {
    if (planesCache) return planesCache;
    const raw = await fs.readFile(planesPath, "utf8");
    const data = JSON.parse(raw);
    if(!Array.isArray(data)) throw new Error('planes.json no es un arreglo');
    planesCache = data;
    return planesCache;
}

//Normaliza los planes
const normPlanId = (planId) => String(planId || "").trim().toLowerCase();

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Methods", "GET", "OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(req.method === "OPTIONS") res.status(204).end();
    if(req.method !== "GET") res.status(405).json('Método no permitido, usa GET.');

    // return res.status(200).json({ ok: true}) //Temporal

    try {
        //Almacena los datos en json
        const planes = await loader();

        //Recibe la peticion de la url
        const { id } = req.query || {};


        if (!id){
            const order = ["esencial", "optimo", "premium"];
            const item = planes.map(plan => ({...plan, id: normPlanId(plan.id ?? plan.plan)})).sort((a,b) => order.indexOf(a.id) - order.indexOf(b.id));

            return res.status(200).json({ok: true, item})

        }
        
        //Detalla un plan elegido
        const wanted = normPlanId(id);
        const found = planes.find(plan => normPlanId(plan.id ?? plan.plan) === wanted) || null;
        if (!found) return res.status(404).json({error:`Plan ${wanted} no encontrado`});

        res.status(200).json({ok: true, item: {...found, id:normPlanId(found.id ?? found.plan)}});

    } catch(e) {
        console.error("[planes: error", e);
        return res.status(500).json({error: "Error interno del servidor"});
    }


}