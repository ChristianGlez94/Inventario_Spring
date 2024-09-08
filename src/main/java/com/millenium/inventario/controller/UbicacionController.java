package com.millenium.inventario.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.millenium.inventario.model.Ubicacion;
import com.millenium.inventario.service.UbicacionService;

import java.util.List;

@RestController
@RequestMapping("/ubicaciones")
public class UbicacionController {

    @Autowired
    private UbicacionService ubicacionService;

    @GetMapping
    public List<Ubicacion> obtenerTodasLasUbicaciones() {
        return ubicacionService.obtenerTodasLasUbicaciones();
    }

    @PostMapping
    public Ubicacion crearUbicacion(@RequestBody Ubicacion ubicacion) {
        return ubicacionService.guardarUbicacion(ubicacion);
    }

    @PutMapping("/{id}")
    public Ubicacion actualizarUbicacion(@PathVariable Long id, @RequestBody Ubicacion ubicacion) {
        return ubicacionService.actualizarUbicacion(id, ubicacion);
    }

    @DeleteMapping("/{id}")
    public void eliminarUbicacion(@PathVariable Long id) {
        ubicacionService.eliminarUbicacion(id);
    }
}
