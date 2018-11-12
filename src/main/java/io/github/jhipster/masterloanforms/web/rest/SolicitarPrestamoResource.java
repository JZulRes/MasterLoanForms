package io.github.jhipster.masterloanforms.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * SolicitarPrestamoResource controller
 */
@RestController
@RequestMapping("/api/solicitar-prestamo")
public class SolicitarPrestamoResource {

    private final Logger log = LoggerFactory.getLogger(SolicitarPrestamoResource.class);

    /**
    * GET solicitarPrestamo
    */
    @GetMapping("/solicitar-prestamo")
    public String solicitarPrestamo() {
        return "solicitarPrestamo";
    }

    /**
    * GET consultarPrestamosActuales
    */
    @GetMapping("/consultar-prestamos-actuales")
    public String consultarPrestamosActuales() {
        return "consultarPrestamosActuales";
    }

}
