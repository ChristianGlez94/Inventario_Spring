document.addEventListener('DOMContentLoaded', function() {
    const ubicacionesTable = document.getElementById('ubicacionesTable').getElementsByTagName('tbody')[0];
    const ubicacionForm = document.getElementById('ubicacionForm');
    const messageDiv = document.getElementById('message');

    // Cargar ubicaciones existentes
    fetch('http://localhost:8081/ubicaciones')
        .then(response => response.json())
        .then(data => {
            data.forEach(ubicacion => {
                const row = ubicacionesTable.insertRow();
                row.insertCell(0).textContent = ubicacion.sector;
                row.insertCell(1).textContent = ubicacion.seccion;
                row.insertCell(2).textContent = ubicacion.codigoBarras;
                const actionsCell = row.insertCell(3);

                const editButton = document.createElement('button');
                editButton.textContent = 'Actualizar';
                editButton.addEventListener('click', () => cargarUbicacionParaActualizar(ubicacion));
                actionsCell.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => eliminarUbicacion(ubicacion.id));
                actionsCell.appendChild(deleteButton);
            });
        });

    // Manejar envío de formulario
    ubicacionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('ubicacionId').value;
        const sector = document.getElementById('sector').value;
        const seccion = document.getElementById('seccion').value;
        const codigoBarras = document.getElementById('codigo_barras').value;

        const ubicacion = {
            sector: sector,
            seccion: seccion,
            codigoBarras: codigoBarras
        };

        if (id) {
            // Actualizar ubicación existente
            fetch(`http://localhost:8081/ubicaciones/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ubicacion)
            })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Ubicación actualizada exitosamente!';
                    location.reload();  // Recargar la página para ver los cambios
                } else {
                    throw new Error('Error al actualizar la ubicación');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Error al actualizar la ubicación.';
            });
        } else {
            // Crear nueva ubicación
            fetch('http://localhost:8081/ubicaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ubicacion)
            })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Ubicación creada exitosamente!';
                    location.reload();  // Recargar la página para ver los cambios
                } else {
                    throw new Error('Error al crear la ubicación');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Error al crear la ubicación.';
            });
        }
    });

    // Función para cargar ubicación en el formulario para actualizar
    function cargarUbicacionParaActualizar(ubicacion) {
        document.getElementById('ubicacionId').value = ubicacion.id;
        document.getElementById('sector').value = ubicacion.sector;
        document.getElementById('seccion').value = ubicacion.seccion;
        document.getElementById('codigo_barras').value = ubicacion.codigoBarras;
    }

    // Función para eliminar ubicación
    function eliminarUbicacion(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
            fetch(`http://localhost:8081/ubicaciones/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Ubicación eliminada exitosamente!';
                    location.reload();  // Recargar la página para ver los cambios
                } else {
                    throw new Error('Error al eliminar la ubicación');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Error al eliminar la ubicación.';
            });
        }
    }
});
