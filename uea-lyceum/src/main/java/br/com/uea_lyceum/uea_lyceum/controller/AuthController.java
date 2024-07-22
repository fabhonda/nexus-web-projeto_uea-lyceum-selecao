package br.com.uea_lyceum.uea_lyceum.controller;

import br.com.uea_lyceum.uea_lyceum.model.Estudante;
import br.com.uea_lyceum.uea_lyceum.repository.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private EstudanteRepository estudanteRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Estudante loginRequest) {
        Estudante estudante = estudanteRepository.findByEmail(loginRequest.getEmail());
        if (estudante == null || !estudante.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
        return ResponseEntity.ok("Login successful");
    }
}