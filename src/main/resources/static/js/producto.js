document.addEventListener('DOMContentLoaded', function() {
    const ubicacionSelect = document.getElementById('ubicacion');
    const productoForm = document.getElementById('productoForm');
    const messageDiv = document.getElementById('message');
    const productoId = new URLSearchParams(window.location.search).get('productoId');

    // Cargar ubicaciones existentes
    fetch('http://localhost:8081/ubicaciones')
        .then(response => response.json())
        .then(data => {
            data.forEach(ubicacion => {
                const option = document.createElement('option');
                option.value = ubicacion.id;
                option.textContent = `${ubicacion.sector} - ${ubicacion.seccion} - ${ubicacion.codigoBarras}`;
                ubicacionSelect.appendChild(option);
            });

            // Si estamos actualizando un producto, cargar los datos
            if (productoId) {
                cargarDatosProducto(productoId);
            }
        });

    // Manejar envío de formulario
    productoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('productoId').value;
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;
        const cantidad = document.getElementById('cantidad').value;
        const codigo = document.getElementById('codigo').value;
        const ubicacionId = document.getElementById('ubicacion').value;

        const producto = {
            nombre: nombre,
            precio: parseFloat(precio),
            descripcion: descripcion,
            cantidad: parseInt(cantidad),
            codigo: codigo,
            ubicacion: { id: parseInt(ubicacionId) }
        };

        if (id) {
            // Actualizar producto existente
            fetch(`http://localhost:8081/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Producto actualizado exitosamente!';
                    setTimeout(() => window.location.href = 'index.html', 2000); // Redirigir a Home después de 2 segundos
                } else {
                    throw new Error('Error al actualizar el producto');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Error al actualizar el producto.';
            });
        } else {
            // Crear nuevo producto
            fetch('http://localhost:8081/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            .then(response => {
                if (response.ok) {
                    messageDiv.textContent = 'Producto creado exitosamente!';
                    productoForm.reset();
                    setTimeout(() => window.location.href = 'index.html', 2000); // Redirigir a Home después de 2 segundos
                } else {
                    throw new Error('Error al crear el producto');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Error al crear el producto.';
            });
        }
    });

    // Cargar datos del producto para actualizar
    function cargarDatosProducto(id) {
        fetch(`http://localhost:8081/productos/${id}`)
            .then(response => response.json())
            .then(producto => {
                document.getElementById('productoId').value = producto.id;
                document.getElementById('nombre').value = producto.nombre;
                document.getElementById('precio').value = producto.precio;
                document.getElementById('descripcion').value = producto.descripcion;
                document.getElementById('cantidad').value = producto.cantidad;
                document.getElementById('codigo').value = producto.codigo;
                document.getElementById('ubicacion').value = producto.ubicacion.id;
            })
            .catch(error => {
                console.error('Error:', error);
                messageDiv.textContent = 'Error al cargar los datos del producto.';
            });
    }
});
