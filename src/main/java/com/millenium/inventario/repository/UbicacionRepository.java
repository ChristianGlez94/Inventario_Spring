package com.millenium.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.millenium.inventario.model.Ubicacion;

public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
}
