export const adaptarProductoParaWeb = (apiData) => ({
    id: apiData.id,
    nombre: apiData.nombre,
});

export const adaptarProductoParaApi = (appData) => ({
    id: appData.id,
    nombre: appData.nombre,
});