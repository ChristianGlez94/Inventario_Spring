package com.millenium.inventario.controller;

import com.millenium.inventario.model.Producto;
import com.millenium.inventario.service.ProductoService;
import com.millenium.inventario.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private ReporteService reporteService;

    @GetMapping
    public List<Producto> obtenerTodosLosProductos() {
        return productoService.obtenerTodosLosProductos();
    }

    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoService.guardarProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return productoService.actualizarProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
    }

    @PostMapping("/reporte")
    public ResponseEntity<byte[]> generarReporte(@RequestBody List<Long> ids) {
        List<Producto> productos = productoService.obtenerProductosPorIds(ids);
        byte[] pdf = reporteService.generarReportePDF(productos);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "reporte_productos.pdf");

        return ResponseEntity.ok().headers(headers).body(pdf);
    }
}
