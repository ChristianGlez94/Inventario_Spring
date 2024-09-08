package com.millenium.inventario.service;

import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import com.millenium.inventario.model.Producto;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ReporteService {

    public byte[] generarReportePDF(List<Producto> productos) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            Document document = new Document(new com.itextpdf.kernel.pdf.PdfDocument(writer));

            document.add(new Paragraph("Reporte de Productos Seleccionados"));

            // Crear una tabla con las columnas necesarias
            float[] columnWidths = {2, 4, 2, 2, 2}; // Anchos de las columnas
            Table table = new Table(columnWidths);
            table.addHeaderCell(new Cell().add(new Paragraph("ID")));
            table.addHeaderCell(new Cell().add(new Paragraph("Nombre")));
            table.addHeaderCell(new Cell().add(new Paragraph("Código")));
            table.addHeaderCell(new Cell().add(new Paragraph("Precio")));
            table.addHeaderCell(new Cell().add(new Paragraph("Cantidad")));

            // Agregar filas a la tabla
            for (Producto producto : productos) {
                table.addCell(new Cell().add(new Paragraph(String.valueOf(producto.getId()))));
                table.addCell(new Cell().add(new Paragraph(producto.getNombre())));
                table.addCell(new Cell().add(new Paragraph(producto.getCodigo())));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(producto.getPrecio()))));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(producto.getCantidad()))));
            }

            document.add(table);
            document.close();

            return baos.toByteArray(); // Retornar el PDF como array de bytes
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF", e);
        }
    }
}
