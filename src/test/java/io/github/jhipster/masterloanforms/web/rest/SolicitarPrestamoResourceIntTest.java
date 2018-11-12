package io.github.jhipster.masterloanforms.web.rest;

import io.github.jhipster.masterloanforms.MasterLoanFormsApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the SolicitarPrestamoResource REST controller.
 *
 * @see SolicitarPrestamoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MasterLoanFormsApp.class)
public class SolicitarPrestamoResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        SolicitarPrestamoResource solicitarPrestamoResource = new SolicitarPrestamoResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(solicitarPrestamoResource)
            .build();
    }

    /**
    * Test solicitarPrestamo
    */
    @Test
    public void testSolicitarPrestamo() throws Exception {
        restMockMvc.perform(get("/api/solicitar-prestamo/solicitar-prestamo"))
            .andExpect(status().isOk());
    }
    /**
    * Test consultarPrestamosActuales
    */
    @Test
    public void testConsultarPrestamosActuales() throws Exception {
        restMockMvc.perform(get("/api/solicitar-prestamo/consultar-prestamos-actuales"))
            .andExpect(status().isOk());
    }

}
