const $ = (elemento) => document.querySelector(elemento);

let tareas = [
  {
    id: 1,
    titulo: "Estudiar html",
    estado: "Terminado",
  },
  {
    id: 2,
    titulo: "Estudiar css",
    estado: "En progreso",
  },
  {
    id: 3,
    titulo: "Estudiar js",
    estado: "Pendiente",
  },
  {
    id: 4,
    titulo: "Practicar js",
    estado: "En progreso",
  },
];
let idTareaEliminar = 0;

window.addEventListener("load", function () {
  /* variables */
  /* Modal */
  const xCloseModal = $("#close-modal");
  const containerModal = $(".container-modal");
  const infoDeleteModal = $("#info-delete");
  const infoEditModal = $(".edit-container");

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
 /*  const copiaDeTareas = [...tareas]; */

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

  // contenedor de tarea existe
  const containerError = $(".new-task");

  //botones de eliminar de tareas
  const buttonYes = $("#btn-yes");
  const buttonNot = $("#btn-not");

  /* Funciones */
  // lista de tareas existentes
  const showList = () => {
    divListTask.innerHTML = "";
    tareas.forEach((elem) => {
      divListTask.innerHTML += `<div class ="div-list"><span>Tarea: ${elem.titulo}</span>
      <apan>Estado: ${elem.estado} </apan><div>`;
    });
  };
  showList();


  // lista de tareas para editar o eliminar
  const editList = (container, array) => {
    container.innerHTML = "";
    array.forEach((elem) => {
      container.innerHTML += `<div class="div-edit"><span>Tarea: ${elem.titulo}</span>  <span>Estado: ${elem.estado} </span>
      <button class="btn-edit" id=${elem.id}><i class="fa-solid fa-pen" ></i> Editar</button>
      <button class="btn-delete"  id=${elem.id} ><i class="fa-solid fa-trash" ></i> Eliminar</button></div>
      `;
    });
    $btnDelete = document.querySelectorAll(".btn-delete");
    $btnDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        idTareaEliminar = e.target.id;
        containerModal.classList.remove("hidden"); 
        infoDeleteModal.classList.remove("hidden");
      });
    });

   
 /* $btnEdit = document.querySelectorAll(".btn-edit");
  $btnEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        containerModal.classList.remove("hidden");
        infoEditModal.classList.remove("hidden");
        infoDeleteModal.classList.add("hidden");
          const tareaAEditar = tareas.find(tarea => tarea.id === Number(e.target.id));
          $selectCreate.value = tareaAEditar.estado;
          $inputTask.value = tareaAEditar.titulo;
      });
  });  */
  };
  editList(divEdit, tareas);

  // funcion filtar
  let mostrarListaTarea = (estado, contenedor) => {
    contenedor.innerHTML = "";
    tareas.forEach((tarea) => {
      if (tarea.estado === estado) {
        tareas.filter((tarea) => tarea.estado === estado);
        return (contenedor.innerHTML += `<div class="div-filt"><span>Tarea: ${tarea.titulo}</span>  
        <span>Estado: ${tarea.estado} </span></div>`);
      }
    });
    

  };

  //verifica si la tarea ya existe
  let agregarVerificacion = (tituloTarea, estadoTarea) => {
    for (let tarea of tareas) {
      if (
        tarea.titulo.toLocaleLowerCase() === tituloTarea.toLocaleLowerCase()
      ) {
        let tareaElegida = tarea.titulo.toLocaleLowerCase();
        return (containerError.innerHTML += `<p>Tarea: ${tareaElegida}  ya existe`);
      } else {
        tareas.push({ titulo: tituloTarea, estado: estadoTarea });
        return showList();
      }
    }
  };

  //eliminar
  let deleteTask = (id) => {
    tareas = tareas.filter((tarea) => tarea.id !== Number(id));
    editList(divEdit, tareas);
  }; 

 //ordena las tareas en la seccion todas
 let ordenar =()=>{
  tareas.sort((x, y) => x.titulo.localeCompare(y.titulo));
   return showList();
 }


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
    ordenar();
  });

  //Modal
  xCloseModal.addEventListener("click", () => {
    containerModal.classList.add("hidden");
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
  $selectCreate.addEventListener("change", (e) => {
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
      agregarVerificacion($inputTask.value, $selectCreate.value);
      editList(divEdit, tareas);
      $selectCreate.value = "";
      $inputTask.value = "";
      $errorstate.innerText = "";
      $errorTask.innerText = "";
      
    }
  });

  //eliminar
  buttonYes.addEventListener("click", (e) => {
    deleteTask(idTareaEliminar);
    containerModal.classList.add("hidden");
  });
  buttonNot.addEventListener("click", () => {
    containerModal.classList.add("hidden");
  });

  //editar




});
