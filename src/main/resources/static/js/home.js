document.addEventListener('DOMContentLoaded', function() {
    const productosTable = document.getElementById('productosTable').getElementsByTagName('tbody')[0];

    // Cargar productos existentes
    fetch('http://localhost:8081/productos')
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
                const row = productosTable.insertRow();
                row.dataset.productId = producto.id;

                // Checkbox para seleccionar producto
                const selectCell = row.insertCell(0);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = producto.id;
                selectCell.appendChild(checkbox);

                row.insertCell(1).textContent = producto.nombre;
                row.insertCell(2).textContent = producto.codigo;
                row.insertCell(3).textContent = producto.descripcion;
                row.insertCell(4).textContent = producto.precio.toFixed(2);
                row.insertCell(5).textContent = producto.cantidad;
                row.insertCell(6).textContent = `${producto.ubicacion.sector} - ${producto.ubicacion.seccion} - ${producto.ubicacion.codigoBarras}`;
                
                const actionsCell = row.insertCell(7);

                // Botón para actualizar el producto
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Actualizar';
                updateButton.addEventListener('click', () => habilitarEdicion(row, producto));
                actionsCell.appendChild(updateButton);

                // Botón para eliminar el producto
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => eliminarProducto(producto.id));
                actionsCell.appendChild(deleteButton);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function habilitarEdicion(row, producto) {
        // Convertir las celdas en campos de entrada
        row.cells[1].innerHTML = `<input type="text" value="${producto.nombre}">`;
        row.cells[2].innerHTML = `<input type="text" value="${producto.codigo}">`;
        row.cells[3].innerHTML = `<input type="text" value="${producto.descripcion}">`;
        row.cells[4].innerHTML = `<input type="number" value="${producto.precio}">`;
        row.cells[5].innerHTML = `<input type="number" value="${producto.cantidad}">`;

        // Convertir la celda de ubicación en un <select> que cargue las ubicaciones disponibles
        const ubicacionSelect = document.createElement('select');
        fetch('http://localhost:8081/ubicaciones')
            .then(response => response.json())
            .then(data => {
                data.forEach(ubicacion => {
                    const option = document.createElement('option');
                    option.value = ubicacion.id;
                    option.textContent = `${ubicacion.sector} - ${ubicacion.seccion} - ${ubicacion.codigoBarras}`;
                    if (ubicacion.id === producto.ubicacion.id) {
                        option.selected = true;
                    }
                    ubicacionSelect.appendChild(option);
                });
            });
        row.cells[6].innerHTML = '';
        row.cells[6].appendChild(ubicacionSelect);

        // Cambiar el botón de actualizar a un botón de guardar
        const actionsCell = row.cells[7];
        actionsCell.innerHTML = '';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar';
        saveButton.addEventListener('click', () => guardarCambios(row, producto.id, ubicacionSelect));
        actionsCell.appendChild(saveButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.addEventListener('click', () => cancelarEdicion(row, producto));
        actionsCell.appendChild(cancelButton);
    }

    function guardarCambios(row, id, ubicacionSelect) {
        const nombre = row.cells[1].querySelector('input').value;
        const codigo = row.cells[2].querySelector('input').value;
        const descripcion = row.cells[3].querySelector('input').value;
        const precio = parseFloat(row.cells[4].querySelector('input').value);
        const cantidad = parseInt(row.cells[5].querySelector('input').value);
        const ubicacionId = ubicacionSelect.value;

        const productoActualizado = {
            nombre: nombre,
            codigo: codigo,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
            ubicacion: { id: parseInt(ubicacionId) }
        };

        // Enviar los datos actualizados al backend
        fetch(`http://localhost:8081/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        })
        .then(response => {
            if (response.ok) {
                row.cells[1].textContent = nombre;
                row.cells[2].textContent = codigo;
                row.cells[3].textContent = descripcion;
                row.cells[4].textContent = precio.toFixed(2);
                row.cells[5].textContent = cantidad;
                row.cells[6].textContent = ubicacionSelect.options[ubicacionSelect.selectedIndex].text;

                const actionsCell = row.cells[7];
                actionsCell.innerHTML = '';

                const updateButton = document.createElement('button');
                updateButton.textContent = 'Actualizar';
                updateButton.addEventListener('click', () => habilitarEdicion(row, productoActualizado));
                actionsCell.appendChild(updateButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.addEventListener('click', () => eliminarProducto(id));
                actionsCell.appendChild(deleteButton);

                alert('Producto actualizado exitosamente!');
            } else {
                throw new Error('Error al actualizar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el producto.');
        });
    }

    function cancelarEdicion(row, producto) {
        row.cells[1].textContent = producto.nombre;
        row.cells[2].textContent = producto.codigo;
        row.cells[3].textContent = producto.descripcion;
        row.cells[4].textContent = producto.precio.toFixed(2);
        row.cells[5].textContent = producto.cantidad;
        row.cells[6].textContent = `${producto.ubicacion.sector} - ${producto.ubicacion.seccion} - ${producto.ubicacion.codigoBarras}`;

        const actionsCell = row.cells[7];
        actionsCell.innerHTML = '';

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        updateButton.addEventListener('click', () => habilitarEdicion(row, producto));
        actionsCell.appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => eliminarProducto(producto.id));
        actionsCell.appendChild(deleteButton);
    }

    function eliminarProducto(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            fetch(`http://localhost:8081/productos/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert('Producto eliminado exitosamente!');
                    location.reload();  // Recargar la página para ver los cambios
                } else {
                    throw new Error('Error al eliminar el producto');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar el producto.');
            });
        }
    }

    // Generar reporte
    document.getElementById('generarReporteBtn').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const ids = Array.from(checkboxes).map(checkbox => checkbox.value);

        fetch('http://localhost:8081/productos/reporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte_productos.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
