package com.millenium.inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.millenium.inventario.model.MovimientoInventario;
import com.millenium.inventario.service.MovimientoInventarioService;

import java.util.List;

@RestController
@RequestMapping("/movimientos")
public class MovimientoInventarioController {

    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @GetMapping
    public List<MovimientoInventario> obtenerTodosLosMovimientos() {
        return movimientoInventarioService.obtenerTodosLosMovimientos();
    }

    @PostMapping
    public MovimientoInventario registrarMovimiento(@RequestBody MovimientoInventario movimientoInventario) {
        return movimientoInventarioService.guardarMovimiento(movimientoInventario);
    }

    @DeleteMapping("/{id}")
    public void eliminarMovimiento(@PathVariable Long id) {
        movimientoInventarioService.eliminarMovimiento(id);
    }
}
