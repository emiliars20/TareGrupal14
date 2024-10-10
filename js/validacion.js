 document.addEventListener('DOMContentLoaded', function () {
    'use strict';
  
    const form = document.getElementById('miFormulario');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const checkboxTerminos = document.getElementById('terminos');
    const botonTerminos = document.getElementById('botonTerminos'); // El botón que despliega el modal
    const feedbackModalTerminos = document.getElementById('feedbackModalTerminos'); // Feedback dentro del modal
    const feedbackTerminos = document.getElementById('feedbackTerminos'); // Texto de feedback al lado del botón
  
    // Validación al enviar el formulario
    form.addEventListener('submit', function (event) {
      // Evita que el formulario se envíe si es inválido
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      // Aplicar clases de validación de Bootstrap
      form.classList.add('was-validated');
  
      // Validación personalizada: Contraseñas y términos aceptados
      if (!validatePasswords() || !validateTerminos()) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  
    // Validación en tiempo real para el campo "Contraseña"
    password1.addEventListener('input', function () {
      if (this.checkValidity()) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        validateRepeatPassword(); // También validar "Repetir contraseña" cuando "Contraseña" cambia
      } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
        password2.classList.remove('is-valid');
        password2.classList.add('is-invalid'); // Marcamos "Repetir contraseña" como inválido si "Contraseña" no es válido
      }
    });
  
    // Validación en tiempo real para el campo "Repetir contraseña"
    password2.addEventListener('input', validateRepeatPassword);
  
    // Validación en tiempo real del checkbox de los términos y condiciones
    checkboxTerminos.addEventListener('change', function () {
      validateTerminos();
    });
  
    // Función para validar si las contraseñas coinciden y si la primera es válida
    function validateRepeatPassword() {
      if (password1.classList.contains('is-valid') && password1.value === password2.value) {
        password2.classList.remove('is-invalid');
        password2.classList.add('is-valid');
      } else {
        password2.classList.remove('is-valid');
        password2.classList.add('is-invalid');
      }
    }
  
    // Función para la validación final de contraseñas en el submit
    function validatePasswords() {
      if (password1.value !== password2.value || !password1.classList.contains('is-valid')) {
        password2.classList.remove('is-valid');
        password2.classList.add('is-invalid');
        alert('Las contraseñas no coinciden o el campo "Contraseña" no es válido');
        return false;
      }
      return true;
    }
  
    // Función para validar los términos y condiciones
    function validateTerminos() {
      if (!checkboxTerminos.checked) {
        mostrarFeedbackTerminos(false);
        return false;
      } else {
        mostrarFeedbackTerminos(true);
        return true;
      }
    }
  
    // Función para mostrar feedback en los tres lugares: checkbox, botón, y texto
    function mostrarFeedbackTerminos(aceptado) {
      if (aceptado) {
        feedbackModalTerminos.classList.add('d-none'); // Ocultar feedback en el modal
        checkboxTerminos.classList.remove('is-invalid'); // Eliminar la clase de error del checkbox
        botonTerminos.classList.remove('text-danger'); // Eliminar el color rojo del botón
        feedbackTerminos.classList.add('d-none'); // Ocultar el texto de advertencia
      } else {
        feedbackModalTerminos.classList.remove('d-none'); // Mostrar feedback en el modal
        checkboxTerminos.classList.add('is-invalid'); // Agregar la clase de error al checkbox
        botonTerminos.classList.add('text-danger'); // Cambiar el color del botón a rojo
        feedbackTerminos.classList.remove('d-none'); // Mostrar el texto de advertencia al lado del botón
      }
    }
  });
  