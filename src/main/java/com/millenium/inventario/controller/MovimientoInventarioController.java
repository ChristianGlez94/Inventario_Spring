package com.millenium.inventario.controller;

import com.millenium.inventario.model.MovimientoInventario;
import com.millenium.inventario.service.MovimientoInventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimientos")
public class MovimientoInventarioController {

    @Autowired
    private MovimientoInventarioService movimientoInventarioService;

    @GetMapping
    public List<MovimientoInventario> listarMovimientos() {
        return movimientoInventarioService.listarTodos();
    }

    @PostMapping
    public MovimientoInventario registrarMovimiento(@RequestBody MovimientoInventario movimientoInventario) {
        return movimientoInventarioService.guardar(movimientoInventario);
    }

    @GetMapping("/{id}")
    public MovimientoInventario obtenerMovimiento(@PathVariable Long id) {
        return movimientoInventarioService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarMovimiento(@PathVariable Long id) {
        movimientoInventarioService.eliminar(id);
    }
}
