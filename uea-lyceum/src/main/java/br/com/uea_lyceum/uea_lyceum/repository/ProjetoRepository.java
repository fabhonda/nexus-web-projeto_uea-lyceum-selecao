package br.com.uea_lyceum.uea_lyceum.repository;

import br.com.uea_lyceum.uea_lyceum.model.Projeto;
import br.com.uea_lyceum.uea_lyceum.model.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    List<Projeto> findByEstudante(Estudante estudante);
}