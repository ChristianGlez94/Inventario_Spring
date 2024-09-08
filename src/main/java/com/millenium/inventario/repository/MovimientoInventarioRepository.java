package com.millenium.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.millenium.inventario.model.MovimientoInventario;

public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Long> {
}
