package com.millenium.inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.millenium.inventario.model.Producto;
import com.millenium.inventario.model.Ubicacion;
import com.millenium.inventario.repository.ProductoRepository;
import com.millenium.inventario.repository.UbicacionRepository;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UbicacionRepository ubicacionRepository;

    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    public Producto guardarProducto(Producto producto) {
        // Asegurémonos de que la ubicación exista y sea válida
        Ubicacion ubicacion = ubicacionRepository.findById(producto.getUbicacion().getId())
                .orElseThrow(() -> new RuntimeException("Ubicación no encontrada"));
        
        producto.setUbicacion(ubicacion);
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Long id, Producto producto) {
        return productoRepository.findById(id)
                .map(prod -> {
                    prod.setNombre(producto.getNombre());
                    prod.setCodigo(producto.getCodigo());
                    prod.setDescripcion(producto.getDescripcion());
                    prod.setPrecio(producto.getPrecio());
                    prod.setCantidad(producto.getCantidad());

                    Ubicacion ubicacion = ubicacionRepository.findById(producto.getUbicacion().getId())
                            .orElseThrow(() -> new RuntimeException("Ubicación no encontrada"));
                    prod.setUbicacion(ubicacion);

                    return productoRepository.save(prod);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }
}
