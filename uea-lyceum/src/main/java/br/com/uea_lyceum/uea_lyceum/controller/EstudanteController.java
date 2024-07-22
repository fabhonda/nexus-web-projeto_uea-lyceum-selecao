package br.com.uea_lyceum.uea_lyceum.controller;

import br.com.uea_lyceum.uea_lyceum.model.Estudante;
import br.com.uea_lyceum.uea_lyceum.repository.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/estudantes")
public class EstudanteController {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @GetMapping("/{email}")
    public Estudante getEstudanteByEmail(@PathVariable String email) {
        return estudanteRepository.findByEmail(email);
    }
}