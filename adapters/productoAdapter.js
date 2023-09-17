export const adaptarProductoParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    estado: apiData.estado,
});

export const adaptarProductoParaApi = (appData) => ({
    id: appData.id,
    nombre: appData.nombre,
});