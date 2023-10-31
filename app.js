const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function mostrarTareas() {
  console.log('Lista de tareas:');
  tasks.forEach((task, index) => {
    const status = task.completada ? 'Completada' : 'No completada';
    console.log(`${index + 1}. [${status}] - ${task.descripcion}`);
  });
}

function agregarTarea(indicador, descripcion) {
  tasks.push({ indicador, descripcion, completada: false });
  guardarTareas();
  console.log('Tarea agregada con éxito.');
}

function eliminarTarea(indice) {
  if (indice >= 0 && indice < tasks.length) {
    tasks.splice(indice, 1);
    guardarTareas();
    console.log('Tarea eliminada con éxito.');
  } else {
    console.log('Índice de tarea no válido.');
  }
}

function completarTarea(indice) {
  if (indice >= 0 && indice < tasks.length) {
    tasks[indice].completada = true;
    guardarTareas();
    console.log('Tarea marcada como completada.');
  } else {
    console.log('Índice de tarea no válido.');
  }
}

function guardarTareas() {
  fs.writeFileSync('tareas.json', JSON.stringify(tasks, null, 2));
}

function cargarTareas() {
  if (fs.existsSync('tareas.json')) {
    const data = fs.readFileSync('tareas.json');
    tasks.push(...JSON.parse(data));
  }
}

cargarTareas();
mostrarTareas();

rl.question('¿Qué acción deseas realizar? (agregar/eliminar/completar/salir): ', (accion) => {
  if (accion === 'agregar') {
    rl.question('Indicador de la tarea: ', (indicador) => {
      rl.question('Descripción de la tarea: ', (descripcion) => {
        agregarTarea(indicador, descripcion);
        mostrarTareas();
        rl.close();
      });
    });
  } else if (accion === 'eliminar') {
    rl.question('Índice de la tarea a eliminar: ', (indice) => {
      eliminarTarea(parseInt(indice) - 1);
      mostrarTareas();
      rl.close();
    });
  } else if (accion === 'completar') {
    rl.question('Índice de la tarea a marcar como completada: ', (indice) => {
      completarTarea(parseInt(indice) - 1);
      mostrarTareas();
      rl.close();
    });
  } else if (accion === 'salir') {
    rl.close();
  } else {
    console.log('Acción no válida. Saliendo.');
    rl.close();
  }
});
