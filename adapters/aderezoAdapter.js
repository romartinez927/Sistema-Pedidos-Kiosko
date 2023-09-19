export const adaptarAderezoParaWeb = (apiData) => ({
    id: apiData._id,
    nombre: apiData.nombre,
    estado: apiData.estado,
});

export const adaptarAderezoParaApi = (appData) => ({
    _id: appData.id,
    nombre: appData.nombre,
    estado: appData.estado,
});