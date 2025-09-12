import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const tarifasPath = path.join(_dirname, "..", "data", "tarifas.json");

export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "POST") {
        return res.status(405).json({error: "Metodo no permitido"});
    }

    const { personas } = req.body || {};

    if ( !Array.isArray(personas)) {
        res.status(400).json({error: "Deberías enviar un array de personas."});
    }
    return res.status(200).json({ok: true, debug:{personas}});

}                      