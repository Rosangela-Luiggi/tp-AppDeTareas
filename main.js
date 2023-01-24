const $ = (elemento) => document.querySelector(elemento);

let tareas = [
  {
    titulo: "Estudiar html",
    estado: "Terminado",
  },
  {
    titulo: "Estudiar css",
    estado: "En progreso",
  },
  {
    titulo: "Estudiar js",
    estado: "Pendiente",
  },
  {
    titulo: "Practicar js",
    estado: "En progreso",
  },
];

window.addEventListener("load", function () {
  /* variables */
  /* Modal */
  const xCloseModal = $("#close-modal");
  const containerModal = $("#container-modal");

  /* vistas */
  const containerTask = $("#task-list");
  const containerCreate = $("#create-task");
  const containerEdit = $("#edit-task");

  /* Botones vistas */
  const $btnTask = $("#btn-task");
  const $btnCreate = $("#btn-create");
  const $btnEdit = $("#btn-edit");

  /*Modo Oscuro */
  const $btnDarkMode = $("#btnMode");
  let body = document.body;

  /* vistas de tareas */
  const divListTask = $("#list");
  const divEdit = $("#edit-deleted");

  //Botones para filtar
  const $btnPending = $("#btn-pending");
  const $btnProgress = $("#btn-in-progress");
  const $btnFinished = $("#btn-finished");
  const $btnAll = $("#btn-all");
  const divPending = $(".task-pending");
  const divProgress = $(".task-in-process");
  const divFinished = $(".task-finished");

  /* Funciones */
  // lista de tareas existentes
  const monstrarLista = () => {
    divListTask.innerHTML = "";
    tareas.forEach((elem) => {
      divListTask.innerHTML += `
            <ul>
            <li><p>Tarea: ${elem.titulo}  Estado: ${elem.estado} </p></li>
            </ul>
        `;
    });
  };
  monstrarLista();

  // lista de tareas para editar o eliminar
  const editarLista = () => {
    divEdit.innerHTML = "";
    tareas.forEach((elem) => {
      divEdit.innerHTML += `
          <div><span>Tarea: ${elem.titulo}  Estado: ${elem.estado} </span><button><i class="fa-solid fa-pen"></i> Editar</button><button><i class="fa-solid fa-trash"></i> Eliminar</button></div>
      `;
    });
  };

  editarLista();
  // funcion filtar
  let mostrarListaTarea = (estado) => {
    for (let tarea of tareas) {
      if (tarea.estado === estado) {
        return tareas.filter((tarea) => tarea.estado === estado);
      }
    }
    return tareas;
  };

  /* eventos */
  // vistas para el filtrado

  $btnPending.addEventListener("click", () => {
    divListTask.classList.add("hidden");
    divProgress.classList.add("hidden");
    divFinished.classList.add("hidden");
    divPending.classList.remove("hidden");
  });
  $btnProgress.addEventListener("click", () => {
    divListTask.classList.add("hidden");
    divPending.classList.add("hidden");
    divFinished.classList.add("hidden");
    divProgress.classList.remove("hidden");
  });
  $btnFinished.addEventListener("click", () => {
    divListTask.classList.add("hidden");
    divPending.classList.add("hidden");
    divProgress.classList.add("hidden");
    divFinished.classList.remove("hidden");
  });
  $btnAll.addEventListener("click", () => {
    divPending.classList.add("hidden");
    divProgress.classList.add("hidden");
    divFinished.classList.add("hidden");
    divListTask.classList.remove("hidden");
  });

  //Modal
  xCloseModal.addEventListener("click", () => {
    containerModal.classList.remove("hidden");
  });
  //Cambiar sección
  $btnTask.addEventListener("click", () => {
    containerCreate.classList.add("hidden");
    containerEdit.classList.add("hidden");
    containerTask.classList.remove("hidden");
  });

  $btnCreate.addEventListener("click", () => {
    containerTask.classList.add("hidden");
    containerCreate.classList.remove("hidden");
    containerEdit.classList.add("hidden");
  });

  $btnEdit.addEventListener("click", () => {
    containerTask.classList.add("hidden");
    containerCreate.classList.add("hidden");
    containerEdit.classList.remove("hidden");
  });

  /* Modo Oscuro */
  $btnDarkMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      $btnDarkMode.innerHTML = '<i class="fa-regular fa-sun"></i>';
    } else {
      $btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
});
