package br.com.uea_lyceum.uea_lyceum.repository;

import br.com.uea_lyceum.uea_lyceum.model.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
}