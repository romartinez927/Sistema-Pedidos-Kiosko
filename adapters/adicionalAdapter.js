export const adaptarAdicionalParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    precio: apiData.precio,
    estado: apiData.estado,
});

export const adaptarAdicionalParaApi = (appData) => ({
    _id: appData.id,
    nombre: appData.nombre,
    precio: appData.precio,
    estado: appData.estado,
});