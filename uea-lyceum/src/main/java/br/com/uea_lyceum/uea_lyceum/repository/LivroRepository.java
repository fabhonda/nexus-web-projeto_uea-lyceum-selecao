package br.com.uea_lyceum.uea_lyceum.repository;

import br.com.uea_lyceum.uea_lyceum.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}