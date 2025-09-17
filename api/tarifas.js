import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const tarifasPath = path.join(_dirname, "..", "data", "tarifas.json");


export default async function handler (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "GET")return res.status(405).json({ error: "Usar GET"});

    try{
        const raw = await fs.readFile(tarifasPath, "utf8");
        const tarifas = JSON.parse(raw);

        const nomPlan = plan => String(plan || "").trim().toLowerCase();
        const normGen = gen => {
            const xOy = String(gen || "").trim().toUpperCase();
            if ("MUJER".includes(xOy)) return "F";
            if ("HOMBRE".includes(xOy)) return "M"
            return xOy.length === 1 ? xOy : null;
        };
        
        const planes = [... new Set(tarifas.map(t => nomPlan(t.plan)))].sort();
        const edades = tarifas.map(t => Number(t.edad)).filter(Number.isFinite);
        const minEdad = Math.min(... edades);
        const maxEdad = Math.max(... edades);

        if (!Array.isArray(tarifas)) {
            return res.status(500).json({ error: "tarifas.json no es un array"});
        }

        const { edad, genero} = req.query;//recupera la url
        const edadN = Number(edad);
        const genN = normGen(genero);

        
        const filtered = tarifas.filter(t =>
            Number(t.edad) === edadN &&
            normGen(t.genero) === genN
        )
        
        const porPlan = new Map();
        
        for(const r of filtered) {
            const planId = nomPlan(r.plan);
            const precio = Number(r.tarifa);
            
            if (!Number.isFinite(precio)) continue;
            if (!porPlan.has(planId)) {
                porPlan.set(planId, {plan: planId, total: precio})
            }
        }
        
        let item = Array.from(porPlan.values());
        
        const order = [ "esencial", "optimo", "premium"];
        item.sort((a, b) => order.indexOf(a.plan) - order.indexOf(b.plan));
        
        console.log({edad, genero, edadN, genN, item})
        return res.status(200).json({
            ok: true,
            item
        });
        
    } catch (e) {
        console.error("Error leyendo tarifas.json", e);
        return res.status(500).json({ error:"No se pudo leer tarifas.json"});
    }
}