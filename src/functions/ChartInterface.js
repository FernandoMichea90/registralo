
export const adaptarDatosParaChart=(registros)=> {
    // Crear un objeto vacío para almacenar los datos adaptados
    const datosAdaptados = {
      categories: [],
      series: [
        {
          year: '2023',
          data: [
            { name: 'Registros', data: [] },
  
          ],
        },
      ],
    };
  
    // Mapear los registros y adaptar los datos
    registros.forEach(registro => {
      // Obtener la fecha en el formato dd/mm/yyyy
      const fecha = new Date(registro.fecha.seconds * 1000);
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;
  
      // Agregar la fecha al array de categorías
      datosAdaptados.categories.push(fechaFormateada);
  
      // Actualizar los datos de 
      datosAdaptados.series[0].data[0].data.push(parseInt(registro.cantidad));
    });
  
    return datosAdaptados;
  }
  