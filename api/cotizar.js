import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tarifasPath = path.join(__dirname, "..", "data", "tarifas.json");

let tarifasCache = null;

async function loadTarifas() {
    if(tarifasCache) return tarifasCache;
    const raw = await fs.readFile(tarifasPath, "utf8");
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error("tarifas no es un Array ")
    tarifasCache = data;
    return data;
}

function normGen(xOy) {
    const entrada = String(xOy || "").trim().toUpperCase();
    
    const fem = ["F", "FEMENINO", "MUJER"];
    const mas = ["M", "MASCULINO", "HOMBRE"];
    if(fem.includes(entrada)) return "F";
    if(mas.includes(entrada)) return "M";
    
    return entrada.length === 1 ? entrada : null
    
}
export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "POST") {
        return res.status(405).json({error: "Metodo no permitido, Usar POST."});
    }

    try {
        const { personas } = req.body || {};
    
        if ( !Array.isArray(personas)) {
            return res.status(400).json({error: "Debes enviar { personas: [...] } con al menos 1 item."});
        }
        
        const parsed = personas.map((person, idx) => {
            const edadNorm = Number(person?.edad);
            const genNorm = normGen(person?.genero);
            
            if (!Number.isFinite(edadNorm) || !genNorm || !["F", "M"].includes(genNorm)) {
                throw new Error(`Persona inválida en indice ${idx}: edad=${person?.edad} genero=${person?.genero}`);
            }
        
            return {edad: edadNorm, genero: genNorm};
            
        });

        const tarifas = await loadTarifas();
        const totales = new Map();

        for (const persona of parsed) {
            const matches = tarifas.filter(tarifa =>
                Number(tarifa.edad) === persona.edad &&
                normGen(tarifa.genero) === persona.genero
            )
            
            if (matches.length === 0) {
                return res.status(404).json({ error: "No hay tarifas para una de las personas", persona})
            }
            
            const porPlan = new Map();
            for (const tab of matches) {
                const planId = String(tab.plan || "").trim().toLowerCase();
                const price = Number(tab.tarifa);
                if (!Number.isFinite(price)) continue;
                if (!porPlan.has(planId))porPlan.set(planId, price);
            }
    
            for (const [planId, price] of porPlan.entries()) {
                totales.set(planId, (totales.get(planId) || 0) + price);
            }

        }

        const order = ["esencial", "optimo", "premium"];

        const items = order.filter(item => totales.has(item)).map(item =>({ plan: item, total:totales.get(item)}));

        return res.status(200).json({ok:true, items});
        
    } catch (e) {
        const msg = String(e?.message ?? "");
        if ( msg.startsWith("Persona inválida")) {
            res.status(400).json({error:e.message});
        }
        console.error("[cotizar:error]", e);
        return res.status(500).json({error: "Error interno del servidor"});
    }

}