export const adaptarProductoParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    estado: apiData.estado,
    adicionalesPredeterminados: apiData.adicionalesPredeterminados,
    aderezosPredeterminados: apiData.aderezosPredeterminados,
});

export const adaptarProductoParaApi = (appData) => ({
    id: appData.id,
    nombre: appData.nombre,
    aderezosPredeterminados: appData.aderezosPredeterminados,
    adicionalesPredeterminados: appData.adicionalesPredeterminados,
});