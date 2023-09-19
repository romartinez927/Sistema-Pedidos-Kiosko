export const adaptarProductoParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    adicionalesPredeterminados: apiData.adicionalesPredeterminados,
    aderezosPredeterminados: apiData.aderezosPredeterminados,
    estado: apiData.estado,
});

export const adaptarProductoParaApi = (appData) => ({
    id: appData.id,
    nombre: appData.nombre,
    adicionalesPredeterminados: appData.adicionalesPredeterminados,
    aderezosPredeterminados: appData.aderezosPredeterminados,
    estado: appData.estado,
});