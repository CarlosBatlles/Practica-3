const { acquireAndProcessData } = require('../services/dataProcessor');

// GET /health
exports.getHealth = (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "acquire"
    });
};

// POST /data
exports.postData = async (req, res) => {
    try {
        // Llama al servicio que contiene la lógica
        const savedData = await acquireAndProcessData();

        // Respuesta 201 Created según contrato
        res.status(201).json({
            dataId: savedData._id,
            features: savedData.features,
            featureCount: savedData.featureCount,
            scalerVersion: savedData.scalerVersion,
            createdAt: savedData.createdAt
        });
    } catch (error) {
        console.error("Error en Acquire:", error);
        
        // Manejo básico de errores (502 si falla la externa, 500 interno)
        if (error.message.includes('KUNNA') || error.message.includes('fetch')) {
            return res.status(502).json({ error: "Bad Gateway: Error al comunicar con Kunna" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};