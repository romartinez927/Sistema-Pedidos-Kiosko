export function formatearFechaHora(fechaOriginal) {
    const fecha = new Date(fechaOriginal);

    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses están indexados desde 0
    const dia = fecha.getDate();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    const fechaFormateada = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${año}`;
    const horaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

    return {
        fecha: fechaFormateada,
        hora: horaFormateada
    };
}


