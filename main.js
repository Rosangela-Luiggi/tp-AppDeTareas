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
  const copiaDeTareas = [...tareas];

  //formulario
  const $form = $(".form-create");
  const $errorForm = $("#messageError");
  // input y error titulo
  const $inputTask = $("#task");
  const $errorTask = $("#taskError");
  const $icon = $(".validation");
  // select y error estado
  const $selectCreate = $("#select-create");
  const $errorstate = $("#selectError");
  // validación
  const regEx = /^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{5,20}$/;
  let validar = false;

  /* Funciones */
  // lista de tareas existentes
  const showList = () => {
    divListTask.innerHTML = "";
    tareas.forEach((elem) => {
      divListTask.innerHTML += `<p>Tarea: ${elem.titulo}  Estado: ${elem.estado} </p>`;
    });
  };
  showList();

  // lista de tareas para editar o eliminar
  const editList = () => {
    divEdit.innerHTML = "";
    tareas.forEach((elem) => {
      divEdit.innerHTML += `<div><span>Tarea: ${elem.titulo}  Estado: ${elem.estado} </span><button><i class="fa-solid fa-pen"></i> Editar</button><button><i class="fa-solid fa-trash"></i> Eliminar</button></div>
      `;
    });
  };
  editList();

  // funcion filtar
  let mostrarListaTarea = (estado, contenedor) => {
    contenedor.innerHTML = "";
    copiaDeTareas.forEach((tarea) => {
      if (tarea.estado === estado) {
        copiaDeTareas.filter((tarea) => tarea.estado === estado);
        return (contenedor.innerHTML += `<p>Tarea: ${tarea.titulo}  Estado: ${tarea.estado} </p>`);
      }
    });
  };

  /* eventos */
  // vistas para el filtrado

  $btnPending.addEventListener("click", () => {
    divListTask.classList.add("hidden");
    divProgress.classList.add("hidden");
    divFinished.classList.add("hidden");
    divPending.classList.remove("hidden");
    mostrarListaTarea("Pendiente", divPending);
  });
  $btnProgress.addEventListener("click", () => {
    divListTask.classList.add("hidden");
    divPending.classList.add("hidden");
    divFinished.classList.add("hidden");
    divProgress.classList.remove("hidden");
    mostrarListaTarea("En progreso", divProgress);
  });
  $btnFinished.addEventListener("click", () => {
    divListTask.classList.add("hidden");
    divPending.classList.add("hidden");
    divProgress.classList.add("hidden");
    divFinished.classList.remove("hidden");
    mostrarListaTarea("Terminado", divFinished);
  });
  $btnAll.addEventListener("click", () => {
    divPending.classList.add("hidden");
    divProgress.classList.add("hidden");
    divFinished.classList.add("hidden");
    divListTask.classList.remove("hidden");
  });

  //Modal
  /*  xCloseModal.addEventListener("click", () => {
    containerModal.classList.remove("hidden");
  }); */
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

  //formulario-crear-tarea
  //input para agregar tarea
  $inputTask.addEventListener("blur", (e) => {
    if (!$inputTask.value.trim()) {
      $errorTask.innerText = "Este campo esta vacio";
      $errorTask.classList.remove("valid");
      $errorTask.classList.add("error");
      $icon.classList.remove("right");
      $icon.classList.add("incorrect");
      validar = true;
    } else if (!regEx.test($inputTask.value)) {
      $errorTask.innerText = "Titulo incorrecto, faltan caracteres";
      $icon.classList.remove("right");
      $icon.classList.add("incorrect");
      validar = true;
    } else {
      $errorTask.innerText = "Titulo valido";
      validar = false;
      $errorTask.classList.remove("error");
      $errorTask.classList.add("valid");
      $icon.classList.add("right");
    }
  });

  //Select para escoger estado
  $selectCreate.addEventListener("blur", (e) => {
    if (!$selectCreate.value.trim()) {
      $errorstate.innerText = "Este campo esta vacio";
      validar = true;
    } else {
      $errorstate.innerText = "Titulo valido";
      $errorstate.classList.remove("error");
      $errorstate.classList.add("valid");
      validar = false;
    }
  });

  //evento de formulario

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    let errorSend = false;
    let allElementsForm = $form.elements;
    for (let i = 0; i < allElementsForm.length - 1; i++) {
      if (allElementsForm[i].value === "") {
        allElementsForm[i].style.backgroundColor = "#f9d8d8";
        allElementsForm[i].style.border = "1.5px solid #ff0000";
        $errorForm.innerText = "Todos los campos son OBLIGATORIOS";
        errorSend = true;
      } else {
        allElementsForm[i].style.backgroundColor = "none";
        allElementsForm[i].style.border = "none";
        errorSend = false;
      }
    }
    if (!errorSend && !validar) {
      tareas.push({titulo: $inputTask.value, estado: $selectCreate.value});
      console.log($inputTask.value)
      showList();
      editList();
      /* mostrarListaTarea("Pendiente", divPending);
      mostrarListaTarea("En progreso", divProgress);
      mostrarListaTarea("Terminado", divFinished); */
    }
  });
});
