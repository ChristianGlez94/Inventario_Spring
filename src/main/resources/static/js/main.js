document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
        nombre: document.getElementById('nombre').value,
        codigo: document.getElementById('codigo').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        cantidad: parseInt(document.getElementById('cantidad').value),
        ubicacion: {
            sector: document.getElementById('sector').value,
            seccion: document.getElementById('seccion').value,
            codigo_barras: document.getElementById('codigo_barras').value
        },
        movimiento: {
            tipo_movimiento: document.getElementById('tipo_movimiento').value,
            cantidad: parseInt(document.getElementById('movimiento_cantidad').value)
        }
    };

    fetch('/api/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto agregado exitosamente!');
        document.getElementById('productForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
