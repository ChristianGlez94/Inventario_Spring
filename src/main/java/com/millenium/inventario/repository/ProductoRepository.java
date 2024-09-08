package com.millenium.inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.millenium.inventario.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
