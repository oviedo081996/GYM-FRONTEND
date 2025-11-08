const form = document.getElementById('contactForm'); // 1. Obtiene el formulario de contacto

// 2. Escucha el evento 'submit' (envío) del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();  //3. Evita que el formulario se envíe de la forma tradicional (recargar la página)

  // 4. Obtiene las referencias a los campos de entrada del formulario
  const nombreInput = document.getElementById('nombre_unico');
  const emailInput = document.getElementById('correo');
  const mensajeInput = document.getElementById('mensaje');

  // 5. Obtiene los valores de los campos y les quita espacios en blanco al inicio/final
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  // 6. Resetear estilos de error de los campos (quita el borde rojo si lo tenían)
  nombreInput.classList.remove('input-error');
  emailInput.classList.remove('input-error');
  mensajeInput.classList.remove('input-error');

  // Validar campos vacíos
  let error = false;

  // 8. Validar campos vacíos y añade la clase 'input-error' si están vacíos
  if (!nombre) {
    nombreInput.classList.add('input-error');
    error = true;
  }
  if (!email) {
    emailInput.classList.add('input-error');
    error = true;
  }
  if (!mensaje) {
    mensajeInput.classList.add('input-error');
    error = true;
  }

   // 9. Si hay algún error, muestra el mensaje de error y detiene la función
  if (error) {
    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.classList.remove('d-none');

    setTimeout(() => { //10. Oculta el mensaje de error después de 6 segundos
      mensajeError.classList.add('d-none');
    }, 6000);

    return;
  }

  // 11. Si no hay errores, intenta enviar los datos al servidor
  try {
    const res = await fetch('https://gym2-aknz.onrender.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, mensaje }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = 'gracias.html';
    } else {
      alert(data.msg || 'Error al enviar el mensaje.');
    }
  } catch (error) {
    alert('No se pudo conectar con el servidor.');
  }
});

// Formulario de Reservas ********************************************************************

const reservaForm = document.getElementById('reservaForm'); // 1. Obtiene el formulario de reservas
const errorMensaje = document.getElementById('reserva-error'); // 2. Obtiene el elemento del mensaje de error para reservas

// 3. Escucha el evento 'submit' (envío) del formulario de reserva
reservaForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

   // 5. Obtiene las referencias a los campos de entrada del formulario de reservas
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const fechaInput = document.getElementById('fecha');
  const horaInput = document.getElementById('hora');
  const zonaInput = document.getElementById('zona');
  const primeraVezInput = document.getElementById('primeraVez');

  // Quitar errores previos
  [nombreInput, emailInput, fechaInput, horaInput, zonaInput, primeraVezInput].forEach(input => {
    input.classList.remove('input-error');
  });

  let error = false;

  // Validar campos vacíos para nombre e email
  if (!nombreInput.value.trim()) {
    nombreInput.classList.add('input-error');
    error = true;
  }

  if (!emailInput.value.trim()) {
    emailInput.classList.add('input-error');
    error = true;
  }

  //9 Validar fecha futura y no pasada
  const fechaSeleccionada = new Date(fechaInput.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // eliminar hora para comparar solo fechas

  if (!fechaInput.value || fechaSeleccionada < hoy) {
    fechaInput.classList.add('input-error');
    error = true;
  }

  // Validar hora dentro del rango de 6 a 9
  const horaSeleccionada = horaInput.value;
  if (!horaSeleccionada || horaSeleccionada < "06:00" || horaSeleccionada > "21:00") {
    horaInput.classList.add('input-error');
    error = true;
  }

  // 11. Validar que la zona y la opción de primera vez no estén vacías
  if (!zonaInput.value) {
    zonaInput.classList.add('input-error');
    error = true;
  }

  if (!primeraVezInput.value) {
    primeraVezInput.classList.add('input-error');
    error = true;
  }

  // Mostrar mensaje si hay error
  if (error) {
    errorMensaje.classList.remove('d-none');
    setTimeout(() => {
      errorMensaje.classList.add('d-none');
    }, 5000);
    return;
  }

  // 13. Si no hay errores, prepara los datos para enviar al servidor
  const reservaData = {
    nombre: nombreInput.value.trim(),
    email: emailInput.value.trim(),
    fecha: fechaInput.value,
    hora: horaInput.value,
    zona: zonaInput.value,
    primeraVez: primeraVezInput.value
  };

  // 14. Intenta enviar los datos de la reserva al servidor
  try {
    const res = await fetch('https://gym2-aknz.onrender.com/reserva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservaData),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = 'gracias-reserva.html';
    } else {
      alert(data.msg || 'Error al enviar la reserva.');
    }
  } catch (error) {
    alert('No se pudo conectar con el servidor.');
  }
});
