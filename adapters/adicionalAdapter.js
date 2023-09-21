export const adaptarAdicionalParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    estado: apiData.estado,
});

export const adaptarAdicionalParaApi = (appData) => ({
    _id: appData.id,
    nombre: appData.nombre,
    estado: appData.estado,
});