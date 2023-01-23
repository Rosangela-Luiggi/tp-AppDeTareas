const $ = (elemento) => document.querySelector(elemento);

let tareas = [
  {
  titulo: "Estudiar html",
  estado: "Terminado"
  },
  {
  titulo: "Estudiar css",
  estado: "En progreso"
  },
  {
  titulo: "Estudiar js",
  estado: "Pendiente"
  },
  {
  titulo: "Practicar js",
  estado: "En progreso"
  },
  
  ]

window.addEventListener("load", function () {
  /* Modal */
  const xCloseModal = $("#close-modal");

  /* vistas */
  const $containerTask = $("#task-list");
  const $containerCreate = $("#create-task");
  const $containerEdit = $("#edit-task");

  /* Botones vistas */
  const $btnTask = $("#btn-task");
  const $btnCreate = $("#btn-create");
  const $btnEdit = $("#btn-edit");

  /*Modo Oscuro */
  const $btnDarkMode = $("#btnMode");
  let body = document.body;

  /* Funciones */

  /* eventos */
  //Cambiar sección
  $btnTask.addEventListener("click", () => {
    $containerCreate.classList.add("hidden");
    $containerEdit.classList.add("hidden");
    $containerTask.classList.remove("hidden");
  });

  $btnCreate.addEventListener("click", () => {
    $containerTask.classList.add("hidden");
    $containerCreate.classList.remove("hidden");
    $containerEdit.classList.add("hidden");
  });

  $btnEdit.addEventListener("click", () => {
    $containerTask.classList.add("hidden");
    $containerCreate.classList.add("hidden");
    $containerEdit.classList.remove("hidden");
  });


  /* Modo Oscuro */
  $btnDarkMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      $btnDarkMode.innerHTML =
        '<i class="fa-regular fa-sun"></i>';
    } else {
      $btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
});
