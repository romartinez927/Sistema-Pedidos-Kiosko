export const adaptarProductoParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    adicionalesPredeterminados: apiData.adicionalesPredeterminados,
    aderezosPredeterminados: apiData.aderezosPredeterminados,
    estado: apiData.estado,
    adicionalesPredeterminados: apiData.adicionalesPredeterminados,
    aderezosPredeterminados: apiData.aderezosPredeterminados,
    precio: apiData.precio,
});

export const adaptarProductoParaApi = (appData) => ({
    id: appData.id,
    nombre: appData.nombre,
    aderezosPredeterminados: appData.aderezosPredeterminados,
    adicionalesPredeterminados: appData.adicionalesPredeterminados,
    estado: appData.estado,
    precio: appData.precio,
});