package com.millenium.inventario.service;

import com.millenium.inventario.model.Producto;
import com.millenium.inventario.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    public Producto guardarProducto(Producto producto) {
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
                    return productoRepository.save(prod);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id);
    }

    public List<Producto> obtenerProductosPorIds(List<Long> ids) {
        return productoRepository.findAllById(ids);
    }
}
