package com.millenium.inventario.service;

import com.millenium.inventario.model.MovimientoInventario;
import com.millenium.inventario.repository.MovimientoInventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovimientoInventarioService {

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    public List<MovimientoInventario> listarTodos() {
        return movimientoInventarioRepository.findAll();
    }

    public MovimientoInventario guardar(MovimientoInventario movimientoInventario) {
        return movimientoInventarioRepository.save(movimientoInventario);
    }

    public MovimientoInventario obtenerPorId(Long id) {
        return movimientoInventarioRepository.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        movimientoInventarioRepository.deleteById(id);
    }
}
