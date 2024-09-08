package com.millenium.inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.millenium.inventario.model.MovimientoInventario;
import com.millenium.inventario.repository.MovimientoInventarioRepository;

import java.util.List;

@Service
public class MovimientoInventarioService {

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    public List<MovimientoInventario> obtenerTodosLosMovimientos() {
        return movimientoInventarioRepository.findAll();
    }

    public MovimientoInventario guardarMovimiento(MovimientoInventario movimientoInventario) {
        return movimientoInventarioRepository.save(movimientoInventario);
    }

    public void eliminarMovimiento(Long id) {
        movimientoInventarioRepository.deleteById(id);
    }
}
