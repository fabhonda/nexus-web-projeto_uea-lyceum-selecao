package br.com.uea_lyceum.uea_lyceum.repository;

import br.com.uea_lyceum.uea_lyceum.model.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudanteRepository extends JpaRepository<Estudante, Long> {
    Estudante findByEmail(String email);
}