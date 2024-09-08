package com.millenium.inventario.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.millenium.inventario.model.Ubicacion;
import com.millenium.inventario.repository.UbicacionRepository;

import java.util.List;

@Service
public class UbicacionService {

    @Autowired
    private UbicacionRepository ubicacionRepository;

    public List<Ubicacion> obtenerTodasLasUbicaciones() {
        return ubicacionRepository.findAll();
    }

    public Ubicacion guardarUbicacion(Ubicacion ubicacion) {
        return ubicacionRepository.save(ubicacion);
    }

    public Ubicacion actualizarUbicacion(Long id, Ubicacion ubicacion) {
        return ubicacionRepository.findById(id)
                .map(ubic -> {
                    ubic.setSector(ubicacion.getSector());
                    ubic.setSeccion(ubicacion.getSeccion());
                    ubic.setCodigoBarras(ubicacion.getCodigoBarras());
                    return ubicacionRepository.save(ubic);
                })
                .orElseThrow(() -> new RuntimeException("Ubicación no encontrada"));
    }

    public void eliminarUbicacion(Long id) {
        ubicacionRepository.deleteById(id);
    }
}
