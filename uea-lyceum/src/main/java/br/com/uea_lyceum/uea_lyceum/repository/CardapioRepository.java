package br.com.uea_lyceum.uea_lyceum.repository;

import br.com.uea_lyceum.uea_lyceum.model.Cardapio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface CardapioRepository extends JpaRepository<Cardapio, LocalDate> {
}