document.addEventListener('DOMContentLoaded', function() {
    const ubicacionSelect = document.getElementById('ubicacion');
    const productoForm = document.getElementById('productoForm');
    const messageDiv = document.getElementById('message');

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
        });

    // Manejar envío de formulario
    productoForm.addEventListener('submit', function(event) {
        event.preventDefault();

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

        // Enviar la solicitud POST al backend
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
            } else {
                throw new Error('Error al crear el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Error al crear el producto.';
        });
    });
});
