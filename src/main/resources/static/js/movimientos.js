document.addEventListener('DOMContentLoaded', function () {
    const movimientosTable = document.getElementById('movimientosTable').getElementsByTagName('tbody')[0];
    const ubicacionSelect = document.getElementById('ubicacion');
    const movimientoForm = document.getElementById('movimientoForm');

    // Cargar ubicaciones
    fetch('http://localhost:8081/ubicaciones')
        .then(response => response.json())
        .then(data => {
            data.forEach(ubicacion => {
                const option = document.createElement('option');
                option.value = ubicacion.id;
                option.textContent = `${ubicacion.sector} - ${ubicacion.seccion} - ${ubicacion.codigoBarras}`;
                ubicacionSelect.appendChild(option);
            });
        });

    // Registrar un nuevo movimiento
    movimientoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const tipoMovimiento = document.getElementById('tipoMovimiento').value;
        const cantidad = document.getElementById('cantidad').value;
        const ubicacionId = ubicacionSelect.value;

        const movimiento = {
            tipoMovimiento: tipoMovimiento,
            cantidad: parseInt(cantidad),
            ubicacion: { id: parseInt(ubicacionId) },
            fecha: new Date().toISOString()
        };

        fetch('http://localhost:8081/movimientos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movimiento)
        })
            .then(response => response.json())
            .then(data => {
                const row = movimientosTable.insertRow();
                row.insertCell(0).textContent = new Date(data.fecha).toLocaleString();
                row.insertCell(1).textContent = data.tipoMovimiento;
                row.insertCell(2).textContent = data.cantidad;
                row.insertCell(3).textContent = `${data.ubicacion.sector} - ${data.ubicacion.seccion} - ${data.ubicacion.codigoBarras}`;
                
                const actionsCell = row.insertCell(4);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => eliminarMovimiento(data.id, row));
                actionsCell.appendChild(deleteButton);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Cargar movimientos registrados
    fetch('http://localhost:8081/movimientos')
        .then(response => response.json())
        .then(data => {
            data.forEach(movimiento => {
                const row = movimientosTable.insertRow();
                row.insertCell(0).textContent = new Date(movimiento.fecha).toLocaleString();
                row.insertCell(1).textContent = movimiento.tipoMovimiento;
                row.insertCell(2).textContent = movimiento.cantidad;
                row.insertCell(3).textContent = `${movimiento.ubicacion.sector} - ${movimiento.ubicacion.seccion} - ${movimiento.ubicacion.codigoBarras}`;
                
                const actionsCell = row.insertCell(4);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => eliminarMovimiento(movimiento.id, row));
                actionsCell.appendChild(deleteButton);
            });
        });

    // Eliminar movimiento
    function eliminarMovimiento(id, row) {
        if (confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
            fetch(`http://localhost:8081/movimientos/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        movimientosTable.deleteRow(row.rowIndex - 1);
                        alert('Movimiento eliminado exitosamente!');
                    } else {
                        throw new Error('Error al eliminar el movimiento');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al eliminar el movimiento.');
                });
        }
    }
});
